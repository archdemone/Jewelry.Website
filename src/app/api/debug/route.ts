import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const products = await db.product.findMany({
      take: 10,
      include: { category: true }
    });

    const categories = await db.category.findMany({
      take: 10
    });

    return NextResponse.json({
      message: 'Debug endpoint working',
      products: products.length,
      categories: categories.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json({
      error: 'Database connection failed',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
