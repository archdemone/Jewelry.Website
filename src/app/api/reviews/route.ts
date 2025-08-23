import { NextRequest, NextResponse } from 'next/server';
import { MockDatabase } from '@/lib/database/schema';

const db = new MockDatabase();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const reviews = await db.getProductReviews(productId, page, limit);
    
    return NextResponse.json({
      reviews,
      pagination: {
        page,
        limit,
        total: reviews.length, // In a real app, you'd get total count from DB
      },
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, userId, rating, title, comment, images } = body;

    // Validation
    if (!productId || !userId || !rating || !title || !comment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Check if user has already reviewed this product
    const existingReviews = await db.getProductReviews(productId);
    const hasReviewed = existingReviews.some(review => review.userId === userId);
    
    if (hasReviewed) {
      return NextResponse.json(
        { error: 'You have already reviewed this product' },
        { status: 400 }
      );
    }

    const review = await db.createReview({
      productId,
      userId,
      rating,
      title,
      comment,
      images: images || [],
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
