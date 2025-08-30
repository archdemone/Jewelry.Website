import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || 'home';

    // Get images from database that belong to the specified category
    const images = await db.media.findMany({
      where: {
        path: {
          startsWith: `${category}/`
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Return the images
    return NextResponse.json({
      images: images,
      success: true,
      category: category
    });
  } catch (error) {
    console.error('Error fetching header images:', error);
    return NextResponse.json({
      images: [],
      success: false,
      error: 'Failed to fetch header images'
    }, { status: 500 });
  }
}
