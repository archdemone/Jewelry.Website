#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  console.log('🔍 Testing Supabase connection...');
  
  // Check if DATABASE_URL is loaded
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Not set');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Not set');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in environment');
    return;
  }

  try {
    const prisma = new PrismaClient();
    
    console.log('🔌 Connecting to database...');
    await prisma.$connect();
    
    console.log('✅ Successfully connected to Supabase!');
    
    // Test a simple query
    console.log('🧪 Testing database query...');
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Query test successful:', result);
    
    await prisma.$disconnect();
    console.log('🎉 Database connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();