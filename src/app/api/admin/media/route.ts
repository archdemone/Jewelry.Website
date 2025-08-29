export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/admin/admin-auth';
import { db } from '@/lib/db';

// POST /api/admin/media (create)
export async function POST(req: NextRequest) {
  try {
    // Auth check
    const auth = await requireAdminApi();
    if (auth instanceof Response) return auth;

    const { url, alt } = await req.json();

    if (!url) {
      return NextResponse.json({ ok: false, error: 'URL is required' }, { status: 400 });
    }

    // Insert into Media (unique on url). Ignore conflict with 409.
    try {
      const media = await db.media.create({
        data: {
          name: alt || 'Untitled',
          url,
          path: url, // Using URL as path for now
          size: 0, // Size not available from URL
          type: 'image/jpeg', // Default type
        },
      });

      return NextResponse.json({ ok: true, media });
    } catch (error: any) {
      if (error.code === 'P2002') {
        // Unique constraint violation
        return NextResponse.json({ ok: false, error: 'Media already exists' }, { status: 409 });
      }
      throw error;
    }
  } catch (error: any) {
    console.error('Media creation error:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/admin/media (list)
export async function GET(req: NextRequest) {
  try {
    // Auth check
    const auth = await requireAdminApi();
    if (auth instanceof Response) return auth;

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '24');
    const offset = (page - 1) * pageSize;

    // Build where clause for filtering
    const where = query ? {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { url: { contains: query, mode: 'insensitive' } },
      ],
    } : {};

    // Get total count
    const total = await db.media.count({ where });

    // Get items with pagination
    const items = await db.media.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: pageSize,
    });

    const response = NextResponse.json({ items, total });
    response.headers.set('Cache-Control', 'no-store');

    return response;
  } catch (error: any) {
    console.error('Media list error:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/admin/media?id=...
export async function DELETE(req: NextRequest) {
  try {
    // Auth check
    const auth = await requireAdminApi();
    if (auth instanceof Response) return auth;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ ok: false, error: 'ID is required' }, { status: 400 });
    }

    // Delete DB row (do NOT delete Blob yet)
    await db.media.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('Media deletion error:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
