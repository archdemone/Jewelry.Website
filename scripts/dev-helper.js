#!/usr/bin/env node

/**
 * Development helper script to ensure proper hot reloading
 * This script runs before the development server starts
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up development environment...');

// Create development environment file
const devEnvContent = `# Development Environment Settings
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
NEXT_DISABLE_CACHE=true
NEXT_FORCE_HMR=true
NEXT_DEV_SERVER_PORT=3000
NEXT_DEV_SERVER_HOSTNAME=localhost
NEXT_DISABLE_OPTIMIZATIONS=true
NEXT_FORCE_RELOAD=true
`;

const envPath = path.join(process.cwd(), '.env.development');
fs.writeFileSync(envPath, devEnvContent);

console.log('✅ Development environment configured');
console.log('🚀 Starting development server with hot reloading...');

// Start the development server with specific flags
const { spawn } = require('child_process');
const child = spawn('npx', ['next', 'dev', '--turbo'], { 
  stdio: 'inherit',
  env: { 
    ...process.env, 
    NODE_ENV: 'development',
    NEXT_DISABLE_CACHE: 'true',
    NEXT_FORCE_HMR: 'true'
  }
});

child.on('close', (code) => {
  console.log(`Development server exited with code ${code}`);
  process.exit(code);
});
