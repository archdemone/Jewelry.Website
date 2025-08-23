#!/usr/bin/env node

/**
 * GitHub Actions Local Testing Setup Script
 * 
 * This script helps set up the GitHub Actions local testing environment
 * using the `act` CLI tool for 100% accurate workflow testing.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up GitHub Actions Local Testing...\n');

// Check if Docker is running
function checkDocker() {
  try {
    execSync('docker --version', { stdio: 'pipe' });
    console.log('✅ Docker is installed');
    
    try {
      execSync('docker ps', { stdio: 'pipe' });
      console.log('✅ Docker is running');
      return true;
    } catch (error) {
      console.log('❌ Docker is not running');
      console.log('   Please start Docker Desktop and try again');
      return false;
    }
  } catch (error) {
    console.log('❌ Docker is not installed');
    console.log('   Please install Docker Desktop from: https://www.docker.com/products/docker-desktop/');
    return false;
  }
}

// Check if act is installed
function checkAct() {
  try {
    const version = execSync('act --version', { encoding: 'utf8' });
    console.log(`✅ act is installed: ${version.trim()}`);
    return true;
  } catch (error) {
    console.log('❌ act is not installed');
    return false;
  }
}

// Install act using Chocolatey (Windows)
function installActWindows() {
  try {
    console.log('📦 Installing act using Chocolatey...');
    execSync('choco install act-cli -y', { stdio: 'inherit' });
    console.log('✅ act installed successfully');
    return true;
  } catch (error) {
    console.log('❌ Failed to install act with Chocolatey');
    return false;
  }
}

// Create .actrc configuration file
function createActConfig() {
  const actrcContent = `# GitHub Actions Local Testing Configuration
-P ubuntu-latest=node:20
--env-file .env.local
--reuse
`;

  try {
    fs.writeFileSync('.actrc', actrcContent);
    console.log('✅ Created .actrc configuration file');
    return true;
  } catch (error) {
    console.log('❌ Failed to create .actrc file');
    return false;
  }
}

// Test workflow listing
function testWorkflowList() {
  try {
    console.log('\n📋 Testing workflow listing...');
    const output = execSync('act -l', { encoding: 'utf8' });
    console.log('✅ Workflows found:');
    console.log(output);
    return true;
  } catch (error) {
    console.log('❌ Failed to list workflows');
    console.log('   This might be normal if act is not fully configured yet');
    return false;
  }
}

// Main setup function
function main() {
  console.log('🔍 Checking prerequisites...\n');
  
  const dockerOk = checkDocker();
  const actOk = checkAct();
  
  console.log('\n📋 Setup Status:');
  console.log(`   Docker: ${dockerOk ? '✅ Ready' : '❌ Needs setup'}`);
  console.log(`   act CLI: ${actOk ? '✅ Ready' : '❌ Needs installation'}`);
  
  if (!dockerOk) {
    console.log('\n🚨 Docker is required for GitHub Actions local testing');
    console.log('   Please install and start Docker Desktop first');
    console.log('   Download: https://www.docker.com/products/docker-desktop/');
    process.exit(1);
  }
  
  if (!actOk) {
    console.log('\n📦 Installing act CLI...');
    
    // Try Windows installation first
    if (process.platform === 'win32') {
      const installed = installActWindows();
      if (!installed) {
        console.log('\n📥 Manual installation required:');
        console.log('   1. Go to: https://github.com/nektos/act/releases');
        console.log('   2. Download the latest Windows release');
        console.log('   3. Extract to a folder in your PATH');
        console.log('   4. Or add the folder to your system PATH');
        process.exit(1);
      }
    } else {
      console.log('\n📥 Manual installation required:');
      console.log('   1. Go to: https://github.com/nektos/act/releases');
      console.log('   2. Download the latest release for your OS');
      console.log('   3. Install according to the documentation');
      process.exit(1);
    }
  }
  
  // Create configuration
  createActConfig();
  
  // Test workflow listing
  testWorkflowList();
  
  console.log('\n🎉 Setup complete!');
  console.log('\n📚 Available commands:');
  console.log('   npm run test:ci              # Test CI workflow');
  console.log('   npm run test:performance     # Test performance workflow');
  console.log('   npm run test:ui             # Test UI workflow');
  console.log('   npm run test:all            # Test all workflows');
  console.log('   npm run workflow:debug      # Debug with verbose output');
  console.log('   npm run workflow:list       # List available workflows');
  
  console.log('\n💡 Remember: Always test with act before pushing workflow changes!');
}

// Run setup
if (require.main === module) {
  main();
}

module.exports = { main, checkDocker, checkAct, createActConfig };
