#!/usr/bin/env node
/**
 * Patches package.json in place:
 * - Adds safe scripts and agent helpers
 * - Removes scripts that reference deleted risky helpers
 * - Ensures devDependencies include kill-port and @playwright/test
 * - Ensures engines.node >= 20
 */
const fs = require('fs');

function readJSON(path) {
  const txt = fs.readFileSync(path, 'utf8');
  // Strip literal "..." that may have been accidentally pasted
  const cleaned = txt.replace(/\.\.\./g, '');
  return JSON.parse(cleaned);
}
function writeJSON(path, obj) {
  fs.writeFileSync(path, JSON.stringify(obj, null, 2) + '\n');
}

const pkgPath = 'package.json';
const pkg = readJSON(pkgPath);

pkg.scripts = pkg.scripts || {};
const addScripts = {
  "kill-ports": "node scripts/kill-ports.js",
  "health:check": "node scripts/health-check.js",
  "console:check:sandbox": "node scripts/console-check-playwright.js",
  "agent:fix:manifest": "node scripts/agent/fix-manifest.js",
  "agent:status": "node scripts/agent/status-check.js",
  "agent:find:preload": "node scripts/agent/find-preload.js",
  "dev:precheck": "node scripts/dev-error-helper.js",
  "dev:precheck:build": "node scripts/dev-error-helper.js --with-build"
};
Object.assign(pkg.scripts, addScripts);

// Remove scripts that call deleted helpers
const risky = [
  "scripts/dev-helper.js",
  "scripts/advanced-monitoring.js",
  "scripts/fix-jsx-formatting.js",
  "scripts/build-without-typescript.js",
  "scripts/fast-validation-check.js",
  "scripts/enhanced-health-check.js",
  "scripts/audit-images.js",
  "scripts/audit-images.mjs"
];
for (const k of Object.keys(pkg.scripts)) {
  const val = pkg.scripts[k];
  if (risky.some(r => val.includes(r))) {
    delete pkg.scripts[k];
  }
}

// Engines
pkg.engines = pkg.engines || {};
pkg.engines.node = ">=20";

// Dev deps
pkg.devDependencies = pkg.devDependencies || {};
if (!pkg.devDependencies["kill-port"]) pkg.devDependencies["kill-port"] = "^2.0.1";
if (!pkg.devDependencies["@playwright/test"]) pkg.devDependencies["@playwright/test"] = "^1.46.0";

writeJSON(pkgPath, pkg);
console.log(JSON.stringify({ ok: true, modifiedScripts: Object.keys(addScripts), engines: pkg.engines }, null, 2));
