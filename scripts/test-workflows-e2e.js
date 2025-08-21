#!/usr/bin/env node

const { spawn, execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Running E2E Tests with Local Server...\n');

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

async function main() {
  let serverProcess = null;
  
  try {
    // Start the server
    serverProcess = await startServer(3000);
    
    // Wait for server to be ready
    const serverReady = await waitForServer(3000);
    if (!serverReady) {
      throw new Error('Server failed to become ready');
    }

    log(`\n============================================================`, 'blue');
    log(`🎨 Running E2E Tests`, 'blue');
    log(`============================================================`, 'blue');

    // Run E2E tests
    const result = await runCommand(
      'npm run test:e2e',
      'E2E Tests',
      { 
        env: { 
          ...process.env, 
          BASE_URL: 'http://localhost:3000',
          CI: 'true'
        },
        verbose: true 
      }
    );

    // Summary
    log(`\n============================================================`, 'blue');
    log(`📋 E2E Test Summary`, 'blue');
    log(`============================================================`, 'blue');

    if (result.success) {
      log(`✅ E2E Tests - PASSED`, 'green');
      log(`\n🎉 All E2E tests passed! Your application is working correctly.`, 'green');
    } else {
      log(`❌ E2E Tests - FAILED`, 'red');
      log(`\n⚠️ E2E tests failed. Check the output above for specific issues.`, 'yellow');
      log(`💡 Common issues:`, 'yellow');
      log(`   - Missing UI elements (check for "Collections" text, buttons, etc.)`, 'yellow');
      log(`   - Console errors in browser`, 'yellow');
      log(`   - Network connectivity issues`, 'yellow');
      process.exit(1);
    }

  } catch (error) {
    log(`❌ E2E Tests - ERROR: ${error.message}`, 'red');
    process.exit(1);
  } finally {
    if (serverProcess) {
      serverProcess.kill();
      log(`🛑 Test server stopped`, 'yellow');
    }
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
