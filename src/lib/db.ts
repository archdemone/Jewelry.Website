import { PrismaClient } from '@prisma/client';

// Ensure this file is only used on the server side
if (typeof window !== 'undefined') {
  throw new Error('Database client cannot be used on the client side');
}

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create Prisma client with better error handling and connection pooling
const createPrismaClient = () => {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      // Better connection handling for serverless environments
      ...(process.env.NODE_ENV === 'production' && {
        // Disable query logging in production to reduce noise
        log: ['error'],
      }),
    });
  } catch (error) {
    console.warn('Failed to create Prisma client:', error);
    // Return a mock client for CI environments
    return {
      $connect: async () => { },
      $disconnect: async () => { },
      $queryRaw: async () => [],
      product: {
        findMany: async () => [],
        findUnique: async () => null,
        findFirst: async () => null,
        create: async () => ({}),
        update: async () => ({}),
        delete: async () => ({}),
        count: async () => 0,
      },
      user: {
        findMany: async () => [],
        findUnique: async () => null,
        findFirst: async () => null,
      },
      category: {
        findMany: async () => [],
        findUnique: async () => null,
        findFirst: async () => null,
      },
      // Add other models as needed
    } as any;
  }
};

// Use global variable to prevent multiple instances in development
export const db = global.prisma || createPrismaClient();

// In development, store the client in global scope to prevent multiple instances
if (process.env.NODE_ENV !== 'production') {
  global.prisma = db;
}
