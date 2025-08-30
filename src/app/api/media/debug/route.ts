import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const mediaFiles = await db.media.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      count: mediaFiles.length,
      files: mediaFiles,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Media debug error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
