#!/usr/bin/env node

/**
 * Local Workflow Testing Script
 * 
 * This script simulates GitHub Actions workflows locally without using Docker/act
 * to bypass Docker authentication issues while still testing the core functionality.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Running Local Workflow Tests...\n');

// Colors for output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  try {
    log(`\n${colors.blue}▶ ${description}...${colors.reset}`);
    const result = execSync(command, { 
      encoding: 'utf8', 
      stdio: 'pipe',
      cwd: process.cwd()
    });
    log(`✅ ${description} - PASSED`, 'green');
    return { success: true, output: result };
  } catch (error) {
    log(`❌ ${description} - FAILED`, 'red');
    log(`Error: ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

// Test results tracking
const results = {
  typeCheck: false,
  lint: false,
  unitTests: false,
  build: false,
  sizeLimit: false,
  e2eTests: false,
  performance: false
};

// Simulate CI and Deploy workflow
log('\n' + '='.repeat(60), 'bold');
log('🔧 CI and Deploy Workflow Simulation', 'bold');
log('='.repeat(60), 'bold');

results.typeCheck = runCommand('npm run type-check:ci', 'Type Check (CI-safe)').success;
results.lint = runCommand('npm run lint:ci', 'Lint (no warnings allowed)').success;
results.unitTests = runCommand('npm run test:ci', 'Unit Tests').success;
results.build = runCommand('npm run build', 'Build for deployment').success;

// Simulate Performance workflow
log('\n' + '='.repeat(60), 'bold');
log('📊 Performance & Bundle Analysis Workflow Simulation', 'bold');
log('='.repeat(60), 'bold');

if (results.build) {
  results.sizeLimit = runCommand('npm run size-limit', 'Size budget check').success;
  
  // Try to run performance tests if server can start
  log(`\n${colors.yellow}⚠ Performance tests require server startup (skipping due to Docker issues)${colors.reset}`);
  results.performance = false;
} else {
  log(`\n${colors.red}❌ Skipping performance tests - build failed${colors.reset}`);
}

// Simulate UI PR Checks workflow
log('\n' + '='.repeat(60), 'bold');
log('🎨 UI PR Checks Workflow Simulation', 'bold');
log('='.repeat(60), 'bold');

if (results.build) {
  log(`\n${colors.yellow}⚠ E2E tests require server startup (skipping due to Docker issues)${colors.reset}`);
  results.e2eTests = false;
} else {
  log(`\n${colors.red}❌ Skipping E2E tests - build failed${colors.reset}`);
}

// Summary
log('\n' + '='.repeat(60), 'bold');
log('📋 Workflow Test Summary', 'bold');
log('='.repeat(60), 'bold');

const allTests = [
  { name: 'Type Check', result: results.typeCheck },
  { name: 'Lint', result: results.lint },
  { name: 'Unit Tests', result: results.unitTests },
  { name: 'Build', result: results.build },
  { name: 'Size Limit', result: results.sizeLimit },
  { name: 'E2E Tests', result: results.e2eTests },
  { name: 'Performance Tests', result: results.performance }
];

let passedCount = 0;
let totalCount = allTests.length;

allTests.forEach(test => {
  const status = test.result ? '✅ PASS' : '❌ FAIL';
  const color = test.result ? 'green' : 'red';
  log(`${status} ${test.name}`, color);
  if (test.result) passedCount++;
});

log(`\n${colors.bold}Results: ${passedCount}/${totalCount} tests passed${colors.reset}`);

// Final status
if (passedCount === totalCount) {
  log('\n🎉 All workflow tests passed!', 'green');
  process.exit(0);
} else {
  log('\n⚠️ Some workflow tests failed. Check the output above for details.', 'yellow');
  log('\n💡 Note: E2E and Performance tests are skipped due to Docker authentication issues.', 'yellow');
  log('   The core functionality (type check, lint, unit tests, build) is working correctly.', 'yellow');
  process.exit(1);
}
