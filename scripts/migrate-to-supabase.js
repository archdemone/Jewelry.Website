#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@supabase/supabase-js');

async function migrateToSupabase() {
  console.log('🚀 Starting migration to Supabase...');

  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set');
    console.log('Please add your Supabase PostgreSQL URL to your .env.local file');
    process.exit(1);
  }

  try {
    // Initialize Prisma client
    const prisma = new PrismaClient();

    console.log('📊 Generating Prisma client...');
    await prisma.$connect();

    console.log('🗄️ Pushing schema to Supabase...');
    // Push the schema to create tables
    const { execSync } = require('child_process');
    execSync('npx prisma db push', { stdio: 'inherit' });

    console.log('✅ Schema pushed successfully!');

    // Generate Prisma client
    console.log('🔧 Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });

    console.log('✅ Migration completed successfully!');
    console.log('');
    console.log('🎉 Your database is now connected to Supabase!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Run: npm run db:seed (to seed initial data)');
    console.log('2. Test your application: npm run dev');
    console.log('3. Check your Supabase dashboard to see the tables');

    await prisma.$disconnect();

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateToSupabase();
