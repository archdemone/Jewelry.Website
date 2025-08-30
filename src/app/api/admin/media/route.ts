export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/admin/admin-auth';
import { db } from '@/lib/db';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

// Helper function to recursively scan directory for images
async function scanImagesDirectory(dirPath: string, basePath: string = ''): Promise<Array<{ name: string; url: string; path: string; size: number; type: string; createdAt: Date }>> {
  const images: Array<{ name: string; url: string; path: string; size: number; type: string; createdAt: Date }> = [];
  
  try {
    const items = await readdir(dirPath);
    
    for (const item of items) {
      const fullPath = join(dirPath, item);
      const relativePath = basePath ? join(basePath, item) : item;
      const stats = await stat(fullPath);
      
      if (stats.isDirectory()) {
        // Recursively scan subdirectories
        const subImages = await scanImagesDirectory(fullPath, relativePath);
        images.push(...subImages);
      } else if (stats.isFile()) {
        // Check if it's an image file
        const ext = item.toLowerCase().split('.').pop();
        if (ext && ['webp', 'png', 'jpg', 'jpeg'].includes(ext)) {
          const url = `/images/${relativePath}`;
          const name = item.replace(/\.[^/.]+$/, ''); // Remove extension for display name
          
          images.push({
            name,
            url,
            path: relativePath,
            size: stats.size,
            type: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
            createdAt: stats.birthtime,
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
  }
  
  return images;
}

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

    // Get database items
    const where = query ? {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { url: { contains: query, mode: 'insensitive' } },
      ],
    } : {};

    const dbItems = await db.media.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Get public images
    const publicImagesPath = join(process.cwd(), 'public', 'images');
    const publicImages = await scanImagesDirectory(publicImagesPath);

    // Filter public images by query if provided
    const filteredPublicImages = query 
      ? publicImages.filter(img => 
          img.name.toLowerCase().includes(query.toLowerCase()) ||
          img.url.toLowerCase().includes(query.toLowerCase())
        )
      : publicImages;

    // Combine and sort all items (database items first, then public images)
    const allItems = [
      ...dbItems.map(item => ({
        ...item,
        source: 'database' as const,
      })),
      ...filteredPublicImages.map(item => ({
        id: `public-${item.path.replace(/[^a-zA-Z0-9]/g, '-')}`,
        name: item.name,
        url: item.url,
        path: item.path,
        size: item.size,
        type: item.type,
        createdAt: item.createdAt,
        updatedAt: item.createdAt,
        uploadedBy: null,
        source: 'public' as const,
      }))
    ];

    // Sort by creation date (newest first)
    allItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Apply pagination
    const total = allItems.length;
    const items = allItems.slice(offset, offset + pageSize);

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

    // Only delete from database if it's a database item (not a public image)
    if (!id.startsWith('public-')) {
      await db.media.delete({
        where: { id },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('Media deletion error:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
