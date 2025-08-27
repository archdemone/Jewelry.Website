import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.$connect();
    
    const productCount = await prisma.product.count();
    const categoryCount = await prisma.category.count();
    
    await prisma.$disconnect();
    
    return NextResponse.json({
      success: true,
      productCount,
      categoryCount,
      message: 'Database connection successful'
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
