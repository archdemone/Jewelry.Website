const fs = require('fs');
const path = require('path');

// Bundle size limits (in bytes) - Realistic limits for e-commerce app
const LIMITS = {
  'First Load JS': 2000 * 1024, // 2MB (realistic for e-commerce with auth, cart, etc.)
  'Vendor Bundle': 1500 * 1024, // 1.5MB
  'React Bundle': 500 * 1024, // 500KB (includes React DOM)
  'Common Bundle': 300 * 1024, // 300KB
};

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function checkBundleSizes() {
  const chunksDir = path.join(process.cwd(), '.next', 'static', 'chunks');

  if (!fs.existsSync(chunksDir)) {
    console.error('❌ .next/static/chunks directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  const files = fs.readdirSync(chunksDir);
  let totalSize = 0;
  let hasErrors = false;

  console.log('📦 Bundle Size Analysis\n');

  // Check specific bundle files
  const bundleChecks = [
    { pattern: /vendors-.*\.js$/, name: 'Vendor Bundle' },
    { pattern: /react-.*\.js$/, name: 'React Bundle' },
    { pattern: /common-.*\.js$/, name: 'Common Bundle' },
  ];

  bundleChecks.forEach((check) => {
    const matchingFiles = files.filter((file) => check.pattern.test(file));
    matchingFiles.forEach((file) => {
      const filePath = path.join(chunksDir, file);
      const size = getFileSize(filePath);
      const limit = LIMITS[check.name];
      const isOverLimit = size > limit;

      console.log(`${check.name}:`);
      console.log(`  File: ${file}`);
      console.log(`  Size: ${formatBytes(size)}`);
      console.log(`  Limit: ${formatBytes(limit)}`);
      console.log(`  Status: ${isOverLimit ? '❌ OVER LIMIT' : '✅ OK'}\n`);

      if (isOverLimit) {
        hasErrors = true;
      }
      totalSize += size;
    });
  });

  // Check total First Load JS
  console.log('First Load JS (Total):');
  console.log(`  Size: ${formatBytes(totalSize)}`);
  console.log(`  Limit: ${formatBytes(LIMITS['First Load JS'])}`);
  const isTotalOverLimit = totalSize > LIMITS['First Load JS'];
  console.log(`  Status: ${isTotalOverLimit ? '❌ OVER LIMIT' : '✅ OK'}\n`);

  if (isTotalOverLimit) {
    hasErrors = true;
  }

  // Summary
  if (hasErrors) {
    console.log('❌ Bundle size check failed! Some bundles exceed limits.');
    console.log('💡 Consider:');
    console.log('  - Code splitting with dynamic imports');
    console.log('  - Removing unused dependencies');
    console.log('  - Optimizing images and assets');
    console.log('  - Using tree shaking');
    process.exit(1);
  } else {
    console.log('✅ All bundle sizes are within limits!');
  }
}

checkBundleSizes();
