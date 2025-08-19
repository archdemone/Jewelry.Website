#!/usr/bin/env node

/**
 * Environment Consistency Test Script
 * 
 * This script tests that the application works correctly in both local and CI environments.
 * Run this before committing workflow changes to ensure consistency.
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔍 Testing Environment Consistency...\n');

const tests = [
  {
    name: 'Lint (Production Environment)',
    command: 'npm run lint:ci',
    env: { NODE_ENV: 'production' }
  },
  {
    name: 'Type Check',
    command: 'npm run type-check',
    env: { NODE_ENV: 'production' }
  },
  {
    name: 'Unit Tests (Test Environment)',
    command: 'npm run test:ci',
    env: { NODE_ENV: 'test' }
  },
  {
    name: 'Build (Production Environment)',
    command: 'npm run build:ci',
    env: { NODE_ENV: 'production' }
  },
  {
    name: 'Accessibility Tests',
    command: 'npm run test:a11y',
    env: { NODE_ENV: 'test' }
  }
];

let passed = 0;
let failed = 0;

for (const test of tests) {
  console.log(`🧪 Running: ${test.name}`);
  
  try {
    // Set environment variables
    Object.assign(process.env, test.env);
    
    // Run the command
    execSync(test.command, { 
      stdio: 'inherit',
      env: process.env
    });
    
    console.log(`✅ ${test.name} - PASSED\n`);
    passed++;
  } catch (error) {
    console.log(`❌ ${test.name} - FAILED\n`);
    failed++;
  }
}

console.log('📊 Test Summary:');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);

if (failed > 0) {
  console.log('\n🚨 Environment consistency issues detected!');
  console.log('Please fix the failing tests before committing workflow changes.');
  process.exit(1);
} else {
  console.log('\n🎉 All environment tests passed!');
  console.log('✅ Your local environment is consistent with CI.');
  console.log('✅ Safe to commit workflow changes.');
}
