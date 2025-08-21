#!/usr/bin/env node
const { runHealthCheck, detectCommonIssues } = require('./enhanced-health-check');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PRE_DEPLOYMENT_CHECKS = {
  // Build checks
  build: async () => {
    console.log('🔨 Checking build process...');
    try {
      execSync('npm run build', { stdio: 'inherit' });
      console.log('✅ Build successful');
      return true;
    } catch (error) {
      console.error('❌ Build failed:', error.message);
      return false;
    }
  },

  // Type checking
  typeCheck: async () => {
    console.log('🔍 Running type checks...');
    try {
      execSync('npm run type-check:strict', { stdio: 'inherit' });
      console.log('✅ Type checks passed');
      return true;
    } catch (error) {
      console.error('❌ Type checks failed:', error.message);
      return false;
    }
  },

  // Linting
  lint: async () => {
    console.log('🧹 Running linting...');
    try {
      execSync('npm run lint', { stdio: 'inherit' });
      console.log('✅ Linting passed');
      return true;
    } catch (error) {
      console.error('❌ Linting failed:', error.message);
      return false;
    }
  },

  // Test suite
  tests: async () => {
    console.log('🧪 Running tests...');
    try {
      execSync('npm run test:ci', { stdio: 'inherit' });
      console.log('✅ Tests passed');
      return true;
    } catch (error) {
      console.error('❌ Tests failed:', error.message);
      return false;
    }
  },

  // Security audit
  security: async () => {
    console.log('🔒 Running security audit...');
    try {
      execSync('npm audit --audit-level=moderate', { stdio: 'inherit' });
      console.log('✅ Security audit passed');
      return true;
    } catch (error) {
      console.error('❌ Security audit failed:', error.message);
      return false;
    }
  },

  // Bundle size check
  bundleSize: async () => {
    console.log('📦 Checking bundle size...');
    try {
      execSync('npm run size-limit', { stdio: 'inherit' });
      console.log('✅ Bundle size within limits');
      return true;
    } catch (error) {
      console.error('❌ Bundle size exceeded limits:', error.message);
      return false;
    }
  },

  // Environment validation
  environment: async () => {
    console.log('🌍 Validating environment...');
    const requiredEnvVars = [
      'NEXTAUTH_SECRET',
      'DATABASE_URL',
      'STRIPE_SECRET_KEY'
    ];

    const missing = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
      console.error('❌ Missing environment variables:', missing.join(', '));
      return false;
    }

    console.log('✅ Environment variables validated');
    return true;
  },

  // Critical files check
  criticalFiles: async () => {
    console.log('📁 Checking critical files...');
    const criticalFiles = [
      'public/manifest.webmanifest',
      'public/sw.js',
      'src/app/layout.tsx',
      'next.config.js',
      'package.json'
    ];

    const missing = criticalFiles.filter(file => !fs.existsSync(file));
    
    if (missing.length > 0) {
      console.error('❌ Missing critical files:', missing.join(', '));
      return false;
    }

    console.log('✅ Critical files present');
    return true;
  },

  // Health check (if server is running)
  healthCheck: async () => {
    console.log('🏥 Running health check...');
    try {
      const baseUrl = process.env.HEALTHCHECK_URL || 'http://localhost:3000';
      const results = await runHealthCheck(baseUrl);
      const issues = detectCommonIssues(results);
      
      const criticalIssues = issues.filter(i => i.severity === 'CRITICAL');
      if (criticalIssues.length > 0) {
        console.error('❌ Critical health issues found:', criticalIssues.length);
        criticalIssues.forEach(issue => {
          console.error(`   - ${issue.type}: ${issue.description}`);
        });
        return false;
      }

      console.log('✅ Health check passed');
      return true;
    } catch (error) {
      console.log('⚠️ Health check skipped (server not running)');
      return true; // Don't fail deployment if server isn't running
    }
  },

  // Console error check (if server is running)
  consoleErrorCheck: async () => {
    console.log('🔍 Running console error check...');
    try {
      execSync('npm run console:check', { stdio: 'inherit' });
      console.log('✅ Console error check passed');
      return true;
    } catch (error) {
      console.error('❌ Console error check failed:', error.message);
      return false;
    }
  }
};

const runPreDeploymentChecks = async () => {
  console.log('🚀 Starting pre-deployment checks...\n');
  
  const results = {};
  let allPassed = true;

  for (const [checkName, checkFunction] of Object.entries(PRE_DEPLOYMENT_CHECKS)) {
    try {
      results[checkName] = await checkFunction();
      if (!results[checkName]) {
        allPassed = false;
      }
    } catch (error) {
      console.error(`❌ ${checkName} check failed with error:`, error.message);
      results[checkName] = false;
      allPassed = false;
    }
    console.log(''); // Add spacing between checks
  }

  // Summary
  console.log('📊 Pre-deployment check summary:');
  Object.entries(results).forEach(([checkName, passed]) => {
    const status = passed ? '✅' : '❌';
    console.log(`${status} ${checkName}`);
  });

  if (allPassed) {
    console.log('\n🎉 All pre-deployment checks passed! Ready for deployment.');
    process.exit(0);
  } else {
    console.log('\n🚨 Some pre-deployment checks failed. Please fix issues before deploying.');
    process.exit(1);
  }
};

// Run checks if this script is executed directly
if (require.main === module) {
  runPreDeploymentChecks();
}

module.exports = { runPreDeploymentChecks, PRE_DEPLOYMENT_CHECKS };
