#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const LIMITS = {
  'First Load JS': 2000 * 1024, // 2MB
  'Vendor Bundle': 1500 * 1024, // 1.5MB
  'React Bundle':  500 * 1024,  // 500KB
  'Common Bundle': 300 * 1024,  // 300KB
};
const AS_JSON = process.argv.includes('--json');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024; const sizes = ['Bytes','KB','MB','GB'];
  const i = Math.floor(Math.log(bytes)/Math.log(k));
  return parseFloat((bytes/Math.pow(k,i)).toFixed(2))+' '+sizes[i];
}

function main(){
  const chunksDir = path.join(process.cwd(), '.next','static','chunks');
  if (!fs.existsSync(chunksDir)) {
    console.error('❌ .next/static/chunks not found. Run "npm run build" first.');
    process.exit(1);
  }
  const files = fs.readdirSync(chunksDir).filter(f => f.endsWith('.js'));
  let totalSize = 0; let hasErrors = false;
  const bundleChecks = [
    { pattern: /vendors-.*\.js$/, name: 'Vendor Bundle' },
    { pattern: /react-.*\.js$/,   name: 'React Bundle' },
    { pattern: /common-.*\.js$/,  name: 'Common Bundle' },
  ];
  const report = { totals: {}, bundles: [] };

  for (const file of files) {
    const sz = fs.statSync(path.join(chunksDir, file)).size;
    totalSize += sz;
  }
  const totalOver = totalSize > LIMITS['First Load JS'];
  report.totals = { totalBytes: totalSize, limitBytes: LIMITS['First Load JS'], over: totalOver };

  for (const check of bundleChecks) {
    const matches = files.filter(f => check.pattern.test(f));
    for (const m of matches) {
      const size = fs.statSync(path.join(chunksDir, m)).size;
      const over = size > LIMITS[check.name];
      report.bundles.push({ name: check.name, file: m, bytes: size, limitBytes: LIMITS[check.name], over });
      if (over) hasErrors = true;
    }
  }
  if (totalOver) hasErrors = true;

  if (AS_JSON) {
    console.log(JSON.stringify({ ok: !hasErrors, ...report }, null, 2));
  } else {
    console.log('📦 Bundle Size Analysis\n');
    for (const b of report.bundles) {
      console.log(`${b.name}:\n  File: ${b.file}\n  Size: ${formatBytes(b.bytes)}\n  Limit: ${formatBytes(b.limitBytes)}\n  Status: ${b.over ? '❌ OVER' : '✅ OK'}\n`);
    }
    console.log('First Load JS (approx):\n  Size:', formatBytes(report.totals.totalBytes));
    console.log('  Limit:', formatBytes(report.totals.limitBytes));
    console.log('  Status:', report.totals.over ? '❌ OVER' : '✅ OK', '\n');
    if (hasErrors) {
      console.log('❌ Bundle size check failed.\n💡 Try code-splitting, removing unused deps, and tree shaking.');
    } else {
      console.log('✅ All bundle sizes within limits!');
    }
  }
  process.exit(hasErrors ? 1 : 0);
}
main();
