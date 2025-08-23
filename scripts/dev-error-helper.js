#!/usr/bin/env node
/**
 * Development Error Helper (Windows-safe)
 * Usage:
 *   node scripts/dev-error-helper.js [--with-build] [--json]
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const argv = process.argv.slice(2);
const WITH_BUILD = argv.includes('--with-build');
const AS_JSON = argv.includes('--json');

const colors = { red:'\x1b[31m', green:'\x1b[32m', yellow:'\x1b[33m', blue:'\x1b[34m', reset:'\x1b[0m' };
function log(color, msg){ if (!AS_JSON) console.log(`${colors[color]}${msg}${colors.reset}`); }

function runCheck(name, command, required = false) {
  if (!AS_JSON) log('blue', `🔍 ${name}...`);
  try {
    const output = execSync(command, { encoding: 'utf8', maxBuffer: 2*1024*1024, stdio: 'pipe', timeout: 600000 });
    if (!AS_JSON) log('green', `✅ ${name} passed`);
    return { name, required, success: true, output };
  } catch (error) {
    if (required) log('red', `❌ ${name} failed (required)`);
    else log('yellow', `⚠️  ${name} failed (optional)`);
    return { name, required, success: false, error: String(error.message || error) };
  }
}

// Quick key-usage hints (non-fatal)
function scanReactKeyHints() {
  const hits = [];
  function walk(dir) {
    try {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) walk(p);
        else if (p.endsWith('.tsx')) {
          try {
            const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
            lines.forEach((line, i) => {
              if (line.includes('key=')) {
                const warn = (line.includes('key={index}') || line.includes('key={image.name}') || line.includes('key={item.name}'));
                hits.push({ file: p, line: i+1, snippet: line.trim().slice(0,180), suggest: warn });
              }
            });
          } catch {}
        }
      }
    } catch {}
  }
  if (fs.existsSync('src')) walk('src');
  return hits;
}

const checks = [
  { name: 'TypeScript Check', command: 'npm run type-check:strict', required: true },
  { name: 'ESLint Check', command: 'npm run lint', required: true },
  ...(WITH_BUILD ? [{ name: 'Build Check', command: 'npm run build', required: true }] : []),
  { name: 'Health Check (Both)', command: 'npm run health:check', required: false },
  { name: 'Console Error Check (Sandbox)', command: 'npm run console:check:sandbox', required: false },
];

const results = [];
for (const c of checks) results.push(runCheck(c.name, c.command, c.required));
const allRequiredPassed = results.filter(r=>r.required).every(r=>r.success);

const keyHints = scanReactKeyHints();

if (AS_JSON) {
  console.log(JSON.stringify({ ok: allRequiredPassed, results, keyHints }, null, 2));
  process.exit(allRequiredPassed ? 0 : 1);
} else {
  console.log('\n' + '='.repeat(60));
  log('blue', '📋 SUMMARY');
  const req = results.filter(r=>r.required).length;
  const reqPass = results.filter(r=>r.required && r.success).length;
  console.log(`Required passed: ${reqPass}/${req}`);
  if (keyHints.length) {
    log('yellow', `\n🔑 Key hints (${keyHints.length}) — avoid unstable keys like index/name strings in lists`);
  }
  if (allRequiredPassed) { log('green', '\n✅ All required checks passed'); process.exit(0); }
  else { log('red', '\n❌ Some required checks failed'); process.exit(1); }
}
