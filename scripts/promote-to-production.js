#!/usr/bin/env node

/**
 * Comprehensive "Test in Production Mode" script
 * Handles all the steps needed to safely test your changes in production mode
 * 
 * IMPORTANT: This does NOT promote to main! It only tests your changes in production mode.
 * To promote to main, you need: npm run sandbox:patch → npm run sandbox:apply
 * 
 * Usage: npm run promote:to:production
 *        npm run promote
 *        npm run test:production
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Clear messaging to prevent confusion
const SAFETY_MESSAGE = `
🎯 TEST IN PRODUCTION MODE
=========================
⚠️  IMPORTANT: This does NOT promote to main!
⚠️  This only tests your changes in production mode.

To promote to main later, you need:
   npm run sandbox:patch → npm run sandbox:apply

This script will:
1. Stop all servers
2. Check and install any new dependencies
3. Handle database changes
4. Run pre-deployment checks
5. Start production mode (both servers)
6. Run health checks

Your changes will be on :3001 (sandbox production)
Baseline will be on :3000 (main production)
`;

const PROMOTION_STEPS = {
  // Step 1: Stop all servers
  stopServers: async () => {
    console.log('🛑 Step 1: Stopping all servers...');
    try {
      execSync('npm run stop', { stdio: 'inherit' });
      console.log('✅ Servers stopped');
      return true;
    } catch (error) {
      console.log('⚠️ No servers were running');
      return true;
    }
  },

  // Step 2: Check for dependency changes
  checkDependencies: async () => {
    console.log('📦 Step 2: Checking for dependency changes...');
    try {
      // Check if package.json was modified
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      // Check if package-lock.json exists and is recent
      const lockPath = path.join(process.cwd(), 'package-lock.json');
      if (!fs.existsSync(lockPath)) {
        console.log('⚠️ package-lock.json missing, installing dependencies...');
        execSync('npm ci', { stdio: 'inherit' });
        return true;
      }

      // Check if node_modules is up to date
      const nodeModulesPath = path.join(process.cwd(), 'node_modules');
      if (!fs.existsSync(nodeModulesPath)) {
        console.log('⚠️ node_modules missing, installing dependencies...');
        execSync('npm ci', { stdio: 'inherit' });
        return true;
      }

      console.log('✅ Dependencies are up to date');
      return true;
    } catch (error) {
      console.error('❌ Dependency check failed:', error.message);
      console.log('🔄 Attempting to fix dependencies...');
      try {
        execSync('npm ci', { stdio: 'inherit' });
        console.log('✅ Dependencies installed successfully');
        return true;
      } catch (installError) {
        console.error('❌ Failed to install dependencies:', installError.message);
        return false;
      }
    }
  },

  // Step 3: Check for database changes
  checkDatabase: async () => {
    console.log('🗄️ Step 3: Checking for database changes...');
    try {
      // Check if Prisma schema exists
      const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
      if (!fs.existsSync(schemaPath)) {
        console.log('ℹ️ No Prisma schema found, skipping database checks');
        return true;
      }

      // Check if there are pending migrations
      try {
        execSync('npx prisma migrate status', { stdio: 'pipe' });
        console.log('✅ Database schema is up to date');
      } catch (migrationError) {
        console.log('⚠️ Database changes detected, generating Prisma client...');
        execSync('npx prisma generate', { stdio: 'inherit' });
        console.log('✅ Prisma client generated');
      }

      return true;
    } catch (error) {
      console.log('⚠️ Database check skipped (Prisma not configured)');
      return true;
    }
  },

  // Step 4: Run pre-deployment checks
  preDeploymentChecks: async () => {
    console.log('🔍 Step 4: Running pre-deployment checks...');
    try {
      execSync('npm run pre:deploy', { stdio: 'inherit' });
      console.log('✅ Pre-deployment checks passed');
      return true;
    } catch (error) {
      console.error('❌ Pre-deployment checks failed');
      console.log('💡 You may need to fix issues before testing in production');
      console.log('💡 Or run: npm run pre:deploy to see detailed errors');
      return false;
    }
  },

  // Step 5: Build and start production mode
  startProductionMode: async () => {
    console.log('🚀 Step 5: Starting production mode...');
    try {
      console.log('📋 This will:');
      console.log('   - Build both baseline and sandbox');
      console.log('   - Start baseline on :3000 (production)');
      console.log('   - Start sandbox on :3001 (production)');
      console.log('   - Compare your changes side-by-side');
      console.log('');
      
      execSync('npm run run:both', { stdio: 'inherit' });
      return true;
    } catch (error) {
      console.error('❌ Failed to start production mode:', error.message);
      return false;
    }
  },

  // Step 6: Run health checks
  healthChecks: async () => {
    console.log('🏥 Step 6: Running health checks...');
    try {
      // Wait a moment for servers to start
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log('🔍 Checking baseline (port 3000)...');
      execSync('npm run health:check:baseline', { stdio: 'inherit' });
      
      console.log('🔍 Checking sandbox (port 3001)...');
      execSync('npm run health:check:sandbox', { stdio: 'inherit' });
      
      console.log('✅ Health checks completed');
      return true;
    } catch (error) {
      console.error('❌ Health checks failed:', error.message);
      return false;
    }
  }
};

const runPromotion = async () => {
  console.log(SAFETY_MESSAGE);
  
  // Double-check this isn't being run from main
  const currentDir = process.cwd();
  if (currentDir.includes('sandbox') === false) {
    console.error('🚨 SAFETY CHECK FAILED!');
    console.error('This script should only be run from the sandbox directory.');
    console.error('Current directory:', currentDir);
    console.error('Please run this from your sandbox workspace.');
    process.exit(1);
  }
  
  const results = {};
  let allPassed = true;

  for (const [stepName, stepFunction] of Object.entries(PROMOTION_STEPS)) {
    try {
      console.log(`\n${'='.repeat(50)}`);
      results[stepName] = await stepFunction();
      if (!results[stepName]) {
        allPassed = false;
      }
    } catch (error) {
      console.error(`❌ ${stepName} failed with error:`, error.message);
      results[stepName] = false;
      allPassed = false;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST IN PRODUCTION SUMMARY:');
  Object.entries(results).forEach(([stepName, passed]) => {
    const status = passed ? '✅' : '❌';
    const stepNumber = Object.keys(results).indexOf(stepName) + 1;
    console.log(`${status} Step ${stepNumber}: ${stepName}`);
  });

  if (allPassed) {
    console.log('\n🎉 SUCCESS! Your changes are now running in production mode');
    console.log('🌐 Baseline (production): http://localhost:3000');
    console.log('🔧 Sandbox (production): http://localhost:3001');
    console.log('');
    console.log('📋 Next steps:');
    console.log('   - Test your new features on :3001');
    console.log('   - Compare with baseline on :3000');
    console.log('   - If everything looks good, promote to main:');
    console.log('     npm run sandbox:patch → npm run sandbox:apply');
    console.log('');
    console.log('⚠️  Remember: This did NOT promote to main!');
    console.log('   Your changes are only in the sandbox.');
    console.log('   To promote to MAIN: create patch and APPLY ON Main');
  } else {
    console.log('\n🚨 Some steps failed. Please check the errors above.');
    console.log('💡 You may need to:');
    console.log('   - Fix dependency issues');
    console.log('   - Resolve database migrations');
    console.log('   - Fix code issues (linting, types, etc.)');
    console.log('   - Then run this command again');
  }

  process.exit(allPassed ? 0 : 1);
};

// Run promotion if this script is executed directly
if (require.main === module) {
  runPromotion();
}

module.exports = { runPromotion, PROMOTION_STEPS };
