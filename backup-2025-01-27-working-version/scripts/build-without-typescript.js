#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting build without TypeScript checking...');

try {
  // Set environment variables to skip TypeScript checking
  process.env.SKIP_TYPE_CHECK = 'true';
  process.env.NEXT_SKIP_TYPE_CHECK = 'true';
  process.env.NODE_ENV = 'production';
  
  // Ensure required environment variables are set
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = 'file:./build.db';
  }
  if (!process.env.NEXTAUTH_URL) {
    process.env.NEXTAUTH_URL = 'http://localhost:3000';
  }
  if (!process.env.NEXTAUTH_SECRET) {
    process.env.NEXTAUTH_SECRET = 'build-secret-key';
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';
  }
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY = 'pk_test_123';
  }
  
  console.log('📦 Environment variables set:');
  console.log('   - SKIP_TYPE_CHECK:', process.env.SKIP_TYPE_CHECK);
  console.log('   - NEXT_SKIP_TYPE_CHECK:', process.env.NEXT_SKIP_TYPE_CHECK);
  console.log('   - NODE_ENV:', process.env.NODE_ENV);
  console.log('   - DATABASE_URL:', process.env.DATABASE_URL);
  
  // Run the build command
  console.log('📦 Running Next.js build...');
  execSync('npx next build', { 
    stdio: 'inherit',
    env: { ...process.env }
  });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.error('❌ Error details:', error);
  process.exit(1);
}
