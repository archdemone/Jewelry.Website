#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Debugging Prisma client generation...');

// Check if node_modules exists
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('❌ node_modules directory not found');
  console.log('💡 Run: npm install');
  process.exit(1);
}

// Check if @prisma/client is installed
const prismaClientPath = path.join(nodeModulesPath, '@prisma/client');
if (!fs.existsSync(prismaClientPath)) {
  console.log('❌ @prisma/client not found in node_modules');
  console.log('💡 Run: npm install @prisma/client');
  process.exit(1);
}

// Check if .prisma directory exists
const prismaPath = path.join(nodeModulesPath, '.prisma');
if (!fs.existsSync(prismaPath)) {
  console.log('❌ .prisma directory not found');
  console.log('💡 Run: npx prisma generate');
  process.exit(1);
}

// Check if client files exist
const clientPath = path.join(prismaPath, 'client');
if (!fs.existsSync(clientPath)) {
  console.log('❌ Prisma client files not found');
  console.log('💡 Run: npx prisma generate');
  process.exit(1);
}

// Check for index-browser.js
const indexBrowserPath = path.join(clientPath, 'index-browser.js');
if (!fs.existsSync(indexBrowserPath)) {
  console.log('❌ index-browser.js not found');
  console.log('💡 This might be a Prisma version issue');
  process.exit(1);
}

console.log('✅ Prisma client appears to be properly generated');
console.log('📁 Prisma client location:', clientPath);

// List some files in the client directory
try {
  const files = fs.readdirSync(clientPath);
  console.log('📄 Client files found:', files.slice(0, 10).join(', '));
  if (files.length > 10) {
    console.log(`   ... and ${files.length - 10} more files`);
  }
} catch (error) {
  console.log('⚠️  Could not list client files:', error.message);
}

console.log('🎉 Prisma client generation check completed successfully');