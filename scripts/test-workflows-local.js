#!/usr/bin/env node

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Running Enhanced Local Workflow Tests...\n');

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

function runCommandSync(command, description) {
  try {
    log(`▶ ${description}...`, 'blue');
    const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    log(`✅ ${description} - PASSED`, 'green');
    return { success: true, output };
  } catch (error) {
    log(`❌ ${description} - FAILED`, 'red');
    log(`Error: ${error.message}`, 'red');
    return { success: false, output: error.stdout || '', errorOutput: error.stderr || '' };
  }
}

async function startServer(port = 3000) {
  log(`\n============================================================`, 'blue');
  log(`🌐 Starting Test Server on port ${port}`, 'blue');
  log(`============================================================`, 'blue');

  // Kill any existing process on the port
  try {
    execSync(`npx kill-port ${port}`, { stdio: 'ignore' });
  } catch (error) {
    // Ignore errors if no process was running
  }

  // Start the server
  const serverProcess = spawn('node', ['.next/standalone/server.js', '-p', port.toString(), '-H', '127.0.0.1'], {
    stdio: 'pipe',
    env: {
      ...process.env,
      NODE_ENV: 'test',
      NEXTAUTH_URL: `http://localhost:${port}`,
      NEXTAUTH_SECRET: 'test-secret',
      DATABASE_URL: 'file:./test.db',
      NEXT_PUBLIC_SITE_URL: `http://localhost:${port}`
    }
  });

  let serverReady = false;
  let serverOutput = '';

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      if (!serverReady) {
        serverProcess.kill();
        reject(new Error('Server startup timeout'));
      }
    }, 30000); // 30 second timeout

    serverProcess.stdout.on('data', (data) => {
      const output = data.toString();
      serverOutput += output;
      
      // Check if server is ready
      if (output.includes('Ready') || output.includes('started') || output.includes('listening')) {
        serverReady = true;
        clearTimeout(timeout);
        
        // Wait a bit more for server to be fully ready
        setTimeout(() => {
          log(`✅ Test server started on http://localhost:${port}`, 'green');
          resolve(serverProcess);
        }, 2000);
      }
    });

    serverProcess.stderr.on('data', (data) => {
      serverOutput += data.toString();
    });

    serverProcess.on('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });

    serverProcess.on('close', (code) => {
      clearTimeout(timeout);
      if (!serverReady) {
        reject(new Error(`Server process exited with code ${code}\nOutput: ${serverOutput}`));
      }
    });
  });
}

async function waitForServer(port = 3000, maxAttempts = 30) {
  const { default: fetch } = await import('node-fetch');
  
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(`http://localhost:${port}/api/healthz`, { 
        timeout: 2000 
      });
      if (response.ok) {
        return true;
      }
    } catch (error) {
      // Ignore errors and retry
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return false;
}

async function runE2ETests() {
  log(`\n============================================================`, 'blue');
  log(`🎨 E2E Tests (Local Server)`, 'blue');
  log(`============================================================`, 'blue');

  let serverProcess = null;
  
  try {
    // Start the server
    serverProcess = await startServer(3000);
    
    // Wait for server to be ready
    const serverReady = await waitForServer(3000);
    if (!serverReady) {
      throw new Error('Server failed to become ready');
    }

    // Run E2E tests (baseline only)
    const result = await runCommand(
      'npx playwright test --project=baseline',
      'E2E Tests (Baseline)',
      { 
        env: { 
          ...process.env, 
          BASE_URL: 'http://localhost:3000',
          CI: 'true'
        },
        verbose: true 
      }
    );

    return result.success;
  } catch (error) {
    log(`❌ E2E Tests - ERROR: ${error.message}`, 'red');
    return false;
  } finally {
    if (serverProcess) {
      serverProcess.kill();
      log(`🛑 Test server stopped`, 'yellow');
    }
  }
}

async function runPerformanceTests() {
  log(`\n============================================================`, 'blue');
  log(`📊 Performance Tests (Local Server)`, 'blue');
  log(`============================================================`, 'blue');

  let serverProcess = null;
  
  try {
    // Start the server
    serverProcess = await startServer(3000);
    
    // Wait for server to be ready
    const serverReady = await waitForServer(3000);
    if (!serverReady) {
      throw new Error('Server failed to become ready');
    }

    // Run Lighthouse performance test
    const result = await runCommand(
      'npx lighthouse http://localhost:3000/ --only-categories=performance --output json --output html --output-path ./lighthouse-report --chrome-flags="--headless --no-sandbox --disable-gpu"',
      'Lighthouse Performance Test',
      { verbose: true }
    );

    if (result.success) {
      // Check if performance scores are acceptable
      try {
        const reportPath = './lighthouse-report.report.json';
        if (fs.existsSync(reportPath)) {
          const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
          const performance = report.categories?.performance?.score;
          if (performance) {
            const score = Math.round(performance * 100);
            log(`📊 Performance Score: ${score}/100`, score >= 90 ? 'green' : score >= 70 ? 'yellow' : 'red');
          }
        }
      } catch (error) {
        log(`⚠️ Could not parse performance report: ${error.message}`, 'yellow');
      }
    }

    return result.success;
  } catch (error) {
    log(`❌ Performance Tests - ERROR: ${error.message}`, 'red');
    return false;
  } finally {
    if (serverProcess) {
      serverProcess.kill();
      log(`🛑 Test server stopped`, 'yellow');
    }
  }
}

async function main() {
  const results = {
    typeCheck: false,
    lint: false,
    unitTests: false,
    build: false,
    sizeLimit: false,
    e2eTests: false,
    performanceTests: false
  };

  // Core CI tests
  log(`\n============================================================`, 'blue');
  log(`🔧 CI and Deploy Workflow Simulation`, 'blue');
  log(`============================================================`, 'blue');

  results.typeCheck = (await runCommand('npm run type-check:ci', 'Type Check (CI-safe)')).success;
  results.lint = (await runCommand('npm run lint:ci', 'Lint (no warnings allowed)')).success;
  results.unitTests = (await runCommand('npm run test:ci', 'Unit Tests')).success;
  results.build = (await runCommand('npm run build', 'Build for deployment')).success;

  // Performance & Bundle Analysis
  log(`\n============================================================`, 'blue');
  log(`📊 Performance & Bundle Analysis Workflow Simulation`, 'blue');
  log(`============================================================`, 'blue');

  results.sizeLimit = (await runCommand('npm run size-limit', 'Size budget check')).success;

  // E2E Tests (with local server)
  results.e2eTests = await runE2ETests();

  // Performance Tests (with local server)
  results.performanceTests = await runPerformanceTests();

  // Summary
  log(`\n============================================================`, 'blue');
  log(`📋 Enhanced Workflow Test Summary`, 'blue');
  log(`============================================================`, 'blue');

  const testResults = [
    { name: 'Type Check', result: results.typeCheck },
    { name: 'Lint', result: results.lint },
    { name: 'Unit Tests', result: results.unitTests },
    { name: 'Build', result: results.build },
    { name: 'Size Limit', result: results.sizeLimit },
    { name: 'E2E Tests', result: results.e2eTests },
    { name: 'Performance Tests', result: results.performanceTests }
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
    log(`\n⚠️ Some workflow tests failed. Check the output above for details.`, 'yellow');
    process.exit(1);
  } else {
    log(`\n🎉 All workflow tests passed! Your CI/CD pipeline should work correctly.`, 'green');
  }
}

// Handle cleanup on exit
process.on('SIGINT', () => {
  log(`\n🛑 Test interrupted by user`, 'yellow');
  process.exit(1);
});

process.on('SIGTERM', () => {
  log(`\n🛑 Test terminated`, 'yellow');
  process.exit(1);
});

main().catch((error) => {
  log(`\n💥 Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
