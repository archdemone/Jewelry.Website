import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Get basic counts
    const totalProducts = await prisma.product.count();
    const totalCategories = await prisma.category.count();
    
    // Get categories with product counts
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { order: 'asc' }
    });
    
    // Get sample products
    const sampleProducts = await prisma.product.findMany({
      take: 5,
      include: { category: true }
    });
    
    return NextResponse.json({
      success: true,
      database: {
        connected: true,
        totalProducts,
        totalCategories,
        categories: categories.map(cat => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          productCount: cat._count.products
        })),
        sampleProducts: sampleProducts.map(prod => ({
          id: prod.id,
          name: prod.name,
          slug: prod.slug,
          category: prod.category?.name,
          categorySlug: prod.category?.slug
        }))
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
        vercel: process.env.VERCEL ? 'Yes' : 'No'
      }
    });
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      environment: {
        nodeEnv: process.env.NODE_ENV,
        databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
        vercel: process.env.VERCEL ? 'Yes' : 'No'
      }
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
