#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

const { PrismaClient } = require('@prisma/client');

async function createTables() {
  console.log('🏗️ Creating database tables...');
  
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();
    
    // Create tables using raw SQL
    console.log('📊 Creating User table...');
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "name" TEXT,
        "password" TEXT,
        "role" TEXT NOT NULL DEFAULT 'CUSTOMER',
        "image" TEXT,
        "emailVerified" TIMESTAMP(3),
        "mfaEnabled" BOOLEAN NOT NULL DEFAULT false,
        "mfaSecret" TEXT,
        "mfaBackupCodes" TEXT,
        "tokenVersion" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "User_pkey" PRIMARY KEY ("id")
      );
    `;
    
    console.log('📊 Creating Category table...');
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Category" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "description" TEXT,
        "image" TEXT,
        "active" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
      );
    `;
    
    console.log('📊 Creating Product table...');
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Product" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "price" DOUBLE PRECISION NOT NULL,
        "comparePrice" DOUBLE PRECISION,
        "cost" DOUBLE PRECISION,
        "sku" TEXT NOT NULL,
        "barcode" TEXT,
        "trackQuantity" BOOLEAN NOT NULL DEFAULT true,
        "quantity" INTEGER NOT NULL DEFAULT 0,
        "weight" DOUBLE PRECISION,
        "material" TEXT,
        "gemstones" TEXT,
        "size" TEXT,
        "images" TEXT NOT NULL,
        "featured" BOOLEAN NOT NULL DEFAULT false,
        "active" BOOLEAN NOT NULL DEFAULT true,
        "categoryId" TEXT NOT NULL,
        "tags" TEXT,
        "metadata" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
      );
    `;
    
    console.log('✅ Tables created successfully!');
    
    // Test the connection
    const userCount = await prisma.user.count();
    console.log(`📊 Current user count: ${userCount}`);
    
    await prisma.$disconnect();
    console.log('🎉 Database setup completed!');
    
  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
    process.exit(1);
  }
}

createTables();