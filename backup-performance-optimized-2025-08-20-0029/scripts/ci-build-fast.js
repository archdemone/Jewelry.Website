/*
 Fast CI build: optimized for speed with minimal database setup
*/
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');

try {
  console.log('🚀 Starting fast CI build...');

  // Skip Prisma generate if client already exists (faster)
  const prismaClientPath = path.join(projectRoot, 'node_modules', '.prisma', 'client', 'index.js');
  if (!fs.existsSync(prismaClientPath)) {
    console.log('📦 Generating Prisma client...');
    const prismaGen = spawnSync('npx --no-install prisma generate', {
      stdio: 'inherit',
      cwd: projectRoot,
      env: process.env,
      shell: true,
    });
    if (prismaGen.status !== 0) {
      console.warn(`[ci-build] prisma generate returned code ${prismaGen.status}`);
    }
  } else {
    console.log('✅ Prisma client already exists, skipping generation');
  }

  // Skip database operations for faster builds (database will be set up in test environment)
  console.log('⏭️  Skipping database setup for faster build');

  // Build with optimized settings
  console.log('🔨 Building Next.js application...');
  const env = {
    ...process.env,
    NODE_ENV: 'production',
    NEXT_TELEMETRY_DISABLED: '1',
    CI: 'true',
  };

  const result = spawnSync('npx --no-install next build', {
    stdio: 'inherit',
    cwd: projectRoot,
    env,
    shell: true,
  });

  if (result.status !== 0) {
    throw new Error(`next build failed with exit code ${result.status}`);
  }

  console.log('✅ Fast CI build completed successfully!');
} catch (err) {
  console.error('[ci-build] Fatal error:', err && err.message ? err.message : err);
  process.exit(1);
}
