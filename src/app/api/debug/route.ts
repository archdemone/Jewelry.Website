import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Test database connection
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    const products = await prisma.product.findMany({
      take: 5,
      include: {
        category: true
      }
    });

    const totalProducts = await prisma.product.count();
    const totalCategories = await prisma.category.count();

    return NextResponse.json({
      success: true,
      database: {
        totalProducts,
        totalCategories,
        categories: categories.map(cat => ({
          name: cat.name,
          slug: cat.slug,
          productCount: cat._count.products
        })),
        sampleProducts: products.map(prod => ({
          id: prod.id,
          name: prod.name,
          category: prod.category?.name,
          price: prod.price,
          active: prod.active
        }))
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set'
      }
    });
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: {
        nodeEnv: process.env.NODE_ENV,
        databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set'
      }
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
