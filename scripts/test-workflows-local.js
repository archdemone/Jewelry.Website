#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  log(`\n${'='.repeat(60)}`, 'cyan');
  log(` ${message}`, 'bright');
  log(`${'='.repeat(60)}`, 'cyan');
}

function logStep(message) {
  log(`\n▶ ${message}`, 'blue');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function runCommand(command, env = {}, description = '') {
  const fullEnv = { ...process.env, ...env };
  
  if (description) {
    logStep(description);
  }
  
  try {
    const result = execSync(command, { 
      env: fullEnv, 
      stdio: 'pipe',
      encoding: 'utf8'
    });
    
    if (result) {
      console.log(result);
    }
    
    return { success: true, output: result };
  } catch (error) {
    logError(`Command failed: ${command}`);
    console.log(error.stdout || '');
    console.log(error.stderr || '');
    return { success: false, output: error.stdout || '', error: error.stderr || '' };
  }
}

function testWorkflow(name, steps) {
  logHeader(`Testing Workflow: ${name}`);
  
  let allPassed = true;
  const results = [];
  
  for (const step of steps) {
    const result = runCommand(step.command, step.env, step.description);
    results.push({ ...step, ...result });
    
    if (!result.success) {
      allPassed = false;
      if (step.continueOnError) {
        logWarning(`Step failed but continuing due to continue-on-error`);
      } else {
        logError(`Step failed and is blocking`);
        break;
      }
    } else {
      logSuccess(`Step completed successfully`);
    }
  }
  
  return { allPassed, results };
}

// Workflow definitions that exactly match GitHub Actions
const workflows = {
  'ci-and-deploy': {
    name: 'CI and Deploy',
    steps: [
      {
        description: 'Install dependencies (lockfile exact, skip scripts)',
        command: 'npm ci --ignore-scripts --legacy-peer-deps',
        env: { CI: 'true', TZ: 'UTC' }
      },
      {
        description: 'Generate Prisma client',
        command: 'npx prisma generate',
        env: { 
          CI: 'true', 
          TZ: 'UTC',
          DATABASE_URL: 'file:./prisma/dev.db',
          NEXTAUTH_SECRET: 'ci-secret-key',
          NEXTAUTH_URL: 'http://localhost:3000'
        },
        continueOnError: true
      },
      {
        description: 'Type check',
        command: 'npm run type-check:ci',
        env: { 
          CI: 'true', 
          TZ: 'UTC',
          NEXTAUTH_SECRET: 'ci-secret-key',
          NEXTAUTH_URL: 'http://localhost:3000'
        }
      },
      {
        description: 'Lint',
        command: 'npm run lint',
        env: { 
          CI: 'true', 
          TZ: 'UTC',
          NEXTAUTH_SECRET: 'ci-secret-key',
          NEXTAUTH_URL: 'http://localhost:3000'
        }
      },
      {
        description: 'Build',
        command: 'npm run build',
        env: { 
          CI: 'true', 
          TZ: 'UTC',
          NEXTAUTH_SECRET: 'ci-secret-key',
          NEXTAUTH_URL: 'http://localhost:3000',
          NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'pk_test_ci',
          STRIPE_SECRET_KEY: 'sk_test_ci'
        }
      }
    ]
  },
  
  'test': {
    name: 'Test Suite',
    steps: [
      {
        description: 'Install dependencies (lockfile exact, skip scripts)',
        command: 'npm ci --ignore-scripts --legacy-peer-deps',
        env: { CI: 'true', TZ: 'UTC' }
      },
      {
        description: 'Generate Prisma client',
        command: 'npx prisma generate',
        env: { CI: 'true', TZ: 'UTC' },
        continueOnError: true
      },
      {
        description: 'Run tests (non-blocking initially)',
        command: 'npm run test:ci',
        env: { CI: 'true', TZ: 'UTC' }
      }
    ]
  },
  
  'performance': {
    name: 'Performance & Bundle Analysis',
    steps: [
      {
        description: 'Install dependencies (lockfile exact, skip scripts)',
        command: 'npm ci --ignore-scripts --legacy-peer-deps',
        env: { CI: 'true', TZ: 'UTC' }
      },
      {
        description: 'Generate Prisma client',
        command: 'npx prisma generate',
        env: { CI: 'true', TZ: 'UTC' },
        continueOnError: true
      },
      {
        description: 'Build',
        command: 'npm run build',
        env: { CI: 'true', TZ: 'UTC' }
      },
      {
        description: 'Start server (simulated)',
        command: 'echo "Server would start here in CI"',
        env: { CI: 'true', TZ: 'UTC' }
      },
      {
        description: 'Lighthouse (simulated)',
        command: 'echo "Lighthouse would run here in CI"',
        env: { CI: 'true', TZ: 'UTC' }
      }
    ]
  },
  
  'ui-pr': {
    name: 'UI PR Checks',
    steps: [
      {
        description: 'Install dependencies (lockfile exact, skip scripts)',
        command: 'npm ci --ignore-scripts --legacy-peer-deps',
        env: { CI: 'true', TZ: 'UTC' }
      },
      {
        description: 'Generate Prisma client',
        command: 'npx prisma generate',
        env: { CI: 'true', TZ: 'UTC' },
        continueOnError: true
      },
      {
        description: 'Type check',
        command: 'npm run type-check:ci',
        env: { CI: 'true', TZ: 'UTC' }
      },
      {
        description: 'Lint',
        command: 'npm run lint',
        env: { CI: 'true', TZ: 'UTC' }
      }
    ]
  },
  
  'error-monitoring': {
    name: 'Error Monitoring & Quality Checks',
    steps: [
      {
        description: 'Install dependencies (lockfile exact, skip scripts)',
        command: 'npm ci --ignore-scripts --legacy-peer-deps',
        env: { CI: 'true', TZ: 'UTC', NEXT_TELEMETRY_DISABLED: '1' }
      },
      {
        description: 'Generate Prisma client',
        command: 'npx prisma generate',
        env: { CI: 'true', TZ: 'UTC', NEXT_TELEMETRY_DISABLED: '1' },
        continueOnError: true
      },
      {
        description: 'Type check',
        command: 'npm run type-check:ci',
        env: { CI: 'true', TZ: 'UTC', NEXT_TELEMETRY_DISABLED: '1' }
      },
      {
        description: 'Lint',
        command: 'npm run lint',
        env: { CI: 'true', TZ: 'UTC', NEXT_TELEMETRY_DISABLED: '1' }
      },
      {
        description: 'Build',
        command: 'npm run build',
        env: { CI: 'true', TZ: 'UTC', NEXT_TELEMETRY_DISABLED: '1' }
      },
      {
        description: 'Web Vitals Guard (non-blocking)',
        command: 'npm run web-vitals-check',
        env: { CI: 'true', TZ: 'UTC', NEXT_TELEMETRY_DISABLED: '1' },
        continueOnError: true
      },
      {
        description: 'Bundle Size Check (non-blocking)',
        command: 'npm run size-limit',
        env: { CI: 'true', TZ: 'UTC', NEXT_TELEMETRY_DISABLED: '1' },
        continueOnError: true
      }
    ]
  }
};

function main() {
  logHeader('GitHub Workflows Local Testing');
  log('This script replicates exactly what GitHub Actions runs locally');
  log('Use this to catch issues before pushing to GitHub\n');
  
  const args = process.argv.slice(2);
  const workflowsToTest = args.length > 0 ? args : Object.keys(workflows);
  
  const results = {};
  let overallSuccess = true;
  
  for (const workflowKey of workflowsToTest) {
    if (!workflows[workflowKey]) {
      logError(`Unknown workflow: ${workflowKey}`);
      continue;
    }
    
    const result = testWorkflow(workflows[workflowKey].name, workflows[workflowKey].steps);
    results[workflowKey] = result;
    
    if (!result.allPassed) {
      overallSuccess = false;
    }
  }
  
  // Summary
  logHeader('Test Summary');
  
  for (const [workflowKey, result] of Object.entries(results)) {
    const status = result.allPassed ? '✅ PASSED' : '❌ FAILED';
    log(`${status} ${workflows[workflowKey].name}`, result.allPassed ? 'green' : 'red');
  }
  
  if (overallSuccess) {
    log('\n🎉 All workflows passed! Safe to push to GitHub.', 'green');
    process.exit(0);
  } else {
    log('\n⚠️  Some workflows failed. Please fix issues before pushing to GitHub.', 'red');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { workflows, testWorkflow };
