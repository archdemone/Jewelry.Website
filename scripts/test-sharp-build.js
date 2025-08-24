#!/usr/bin/env node

/**
 * Test script to verify sharp build fix
 * This script simulates the build process and checks if sharp can be loaded properly
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🧪 Testing Sharp Build Fix...\n');

async function testSharpBuild() {
  try {
    // Test 1: Check if sharp is properly installed
    console.log('1️⃣ Checking sharp installation...');
    try {
      const sharp = require('sharp');
      console.log('   ✅ Sharp is available');
      console.log(`   📦 Version: ${sharp.versions.sharp}`);
      console.log(`   🔧 libvips: ${sharp.versions.libvips}`);
    } catch (error) {
      console.log('   ❌ Sharp is not available:', error.message);
      return false;
    }

    // Test 2: Test dynamic import pattern
    console.log('\n2️⃣ Testing dynamic import pattern...');
    try {
      const sharpModule = await import('sharp');
      const sharp = sharpModule.default;
      console.log('   ✅ Dynamic import works');
      console.log(`   📦 Version: ${sharp.versions.sharp}`);
    } catch (error) {
      console.log('   ❌ Dynamic import failed:', error.message);
      return false;
    }

    // Test 3: Test build process
    console.log('\n3️⃣ Testing build process...');
    try {
      console.log('   🔨 Running next build...');
      execSync('npm run build', { 
        stdio: 'inherit',
        cwd: process.cwd(),
        env: { ...process.env, CI: 'true', NEXT_TELEMETRY_DISABLED: '1' }
      });
      console.log('   ✅ Build completed successfully');
    } catch (error) {
      console.log('   ❌ Build failed:', error.message);
      return false;
    }

    // Test 4: Test API route compilation
    console.log('\n4️⃣ Testing API route compilation...');
    try {
      const uploadRoute = path.join(process.cwd(), 'src/app/api/upload/route.ts');
      const fs = require('fs');
      const content = fs.readFileSync(uploadRoute, 'utf8');
      
      if (content.includes('await import(\'sharp\')')) {
        console.log('   ✅ Dynamic import pattern found in upload route');
      } else {
        console.log('   ❌ Dynamic import pattern not found in upload route');
        return false;
      }
    } catch (error) {
      console.log('   ❌ Could not read upload route:', error.message);
      return false;
    }

    console.log('\n🎉 All tests passed! Sharp build fix is working correctly.');
    return true;

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    return false;
  }
}

// Run the test
testSharpBuild().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Test script error:', error);
  process.exit(1);
});