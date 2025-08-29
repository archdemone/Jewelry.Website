// app/api/healthz/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  let prisma;
  try {
    prisma = db;
    await prisma.$connect();

    // Test database connection
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected'
      }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'disconnected'
      },
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 503 });
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
}
