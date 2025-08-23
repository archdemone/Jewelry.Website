#!/usr/bin/env node

const { spawn, execSync } = require('child_process');

console.log('🚀 Running Core CI Tests...\n');

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

function runCommand(command, description, options = {}) {
  return new Promise((resolve, reject) => {
    log(`▶ ${description}...`, 'blue');
    
    const child = spawn(command, [], {
      shell: true,
      stdio: 'pipe',
      ...options
    });

    let output = '';
    let errorOutput = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
      if (options.verbose) {
        process.stdout.write(data);
      }
    });

    child.stderr.on('data', (data) => {
      errorOutput += data.toString();
      if (options.verbose) {
        process.stderr.write(data);
      }
    });

    child.on('close', (code) => {
      if (code === 0) {
        log(`✅ ${description} - PASSED`, 'green');
        resolve({ success: true, output, errorOutput });
      } else {
        log(`❌ ${description} - FAILED (exit code: ${code})`, 'red');
        if (errorOutput && !options.verbose) {
          log(`Error: ${errorOutput.trim()}`, 'red');
        }
        resolve({ success: false, output, errorOutput, code });
      }
    });

    child.on('error', (error) => {
      log(`❌ ${description} - ERROR: ${error.message}`, 'red');
      reject(error);
    });
  });
}

async function main() {
  log(`\n============================================================`, 'blue');
  log(`🔧 Core CI Tests (No Server Required)`, 'blue');
  log(`============================================================`, 'blue');

  const results = {
    typeCheck: false,
    lint: false,
    unitTests: false,
    build: false,
    sizeLimit: false
  };

  // Run core tests
  results.typeCheck = (await runCommand('npm run type-check:ci', 'Type Check (CI-safe)')).success;
  results.lint = (await runCommand('npm run lint:ci', 'Lint (no warnings allowed)')).success;
  results.unitTests = (await runCommand('npm run test:ci', 'Unit Tests')).success;
  results.build = (await runCommand('npm run build', 'Build for deployment')).success;
  
  if (results.build) {
    results.sizeLimit = (await runCommand('npm run size-limit', 'Size budget check')).success;
  }

  // Summary
  log(`\n============================================================`, 'blue');
  log(`📋 Core Test Summary`, 'blue');
  log(`============================================================`, 'blue');

  const testResults = [
    { name: 'Type Check', result: results.typeCheck },
    { name: 'Lint', result: results.lint },
    { name: 'Unit Tests', result: results.unitTests },
    { name: 'Build', result: results.build },
    { name: 'Size Limit', result: results.sizeLimit }
  ];

  testResults.forEach(({ name, result }) => {
    const status = result ? '✅ PASS' : '❌ FAIL';
    const color = result ? 'green' : 'red';
    log(`${status} ${name}`, color);
  });

  const passedCount = testResults.filter(t => t.result).length;
  const totalCount = testResults.length;

  log(`\nResults: ${passedCount}/${totalCount} tests passed`, passedCount === totalCount ? 'green' : 'yellow');

  if (passedCount < totalCount) {
    log(`\n⚠️ Some core tests failed. Fix these before running E2E/Performance tests.`, 'yellow');
    process.exit(1);
  } else {
    log(`\n🎉 All core tests passed! Ready for E2E and Performance testing.`, 'green');
  }
}

main().catch((error) => {
  log(`\n💥 Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
