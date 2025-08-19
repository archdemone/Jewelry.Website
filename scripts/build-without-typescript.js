#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting build without TypeScript checking...');

try {
  // Set environment variables to skip TypeScript checking
  process.env.SKIP_TYPE_CHECK = 'true';
  process.env.NEXT_SKIP_TYPE_CHECK = 'true';
  
  // Run the build command
  console.log('📦 Running Next.js build...');
  execSync('npx next build', { 
    stdio: 'inherit',
    env: { ...process.env, SKIP_TYPE_CHECK: 'true', NEXT_SKIP_TYPE_CHECK: 'true' }
  });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
