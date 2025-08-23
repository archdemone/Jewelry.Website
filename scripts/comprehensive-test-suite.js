#!/usr/bin/env node

/**
 * Comprehensive Test Suite
 * Runs all validation checks automatically in ~2 seconds
 */

const { execSync } = require('child_process');
const fs = require('fs');

const TESTS = [
  {
    name: 'TypeScript Check',
    command: 'npm run type-check:strict',
    critical: true
  },
  {
    name: 'ESLint Check',
    command: 'npm run lint',
    critical: true
  },
  {
    name: 'Fast Validation',
    command: 'npm run validate:fast',
    critical: true
  },
  {
    name: 'Build Check',
    command: 'npm run build',
    critical: true
  },
  {
    name: 'Console Error Check',
    command: 'npm run console:check:sandbox',
    critical: false
  },
  {
    name: 'Health Check',
    command: 'npm run health:check:sandbox',
    critical: false
  }
];

function runTest(test) {
  console.log(`\n🔍 Running ${test.name}...`);

  try {
    const startTime = Date.now();
    execSync(test.command, { stdio: 'inherit' });
    const duration = Date.now() - startTime;
    console.log(`✅ ${test.name} passed (${duration}ms)`);
    return { success: true, duration };
  } catch (error) {
    console.log(`❌ ${test.name} failed`);
    return { success: false, error: error.message };
  }
}

function main() {
  console.log('🚀 Comprehensive Test Suite Starting...\n');

  const startTime = Date.now();
  const results = [];
  let criticalFailures = 0;

  // Run all tests
  TESTS.forEach(test => {
    const result = runTest(test);
    results.push({ ...test, ...result });

    if (!result.success && test.critical) {
      criticalFailures++;
    }
  });

  const totalTime = Date.now() - startTime;

  // Summary
  console.log('\n📊 Test Suite Results:');
  console.log(`   Total Time: ${totalTime}ms`);
  console.log(`   Tests Run: ${results.length}`);
  console.log(`   Passed: ${results.filter(r => r.success).length}`);
  console.log(`   Failed: ${results.filter(r => !r.success).length}`);
  console.log(`   Critical Failures: ${criticalFailures}`);

  // Show failed tests
  const failedTests = results.filter(r => !r.success);
  if (failedTests.length > 0) {
    console.log('\n❌ Failed Tests:');
    failedTests.forEach(test => {
      console.log(`   - ${test.name}`);
    });
  }

  // Exit with error if critical failures
  if (criticalFailures > 0) {
    console.log('\n💥 Critical tests failed! Please fix these issues.');
    process.exit(1);
  }

  console.log('\n🎉 All critical tests passed!');
  process.exit(0);
}

if (require.main === module) {
  main();
}
