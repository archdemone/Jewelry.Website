#!/usr/bin/env node

/**
 * Development Error Helper
 * Provides detailed error analysis and debugging tools
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🛠️  Development Error Helper\n');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCheck(name, command, required = false) {
  log('blue', `🔍 Running ${name}...`);
  try {
    const output = execSync(command, {
      encoding: 'utf8',
      maxBuffer: 1024 * 1024,
      timeout: 30000
    });
    log('green', `✅ ${name} passed`);
    return { success: true, output };
  } catch (error) {
    if (required) {
      log('red', `❌ ${name} failed (required)`);
      console.log(error.message);
      return { success: false, error: error.message };
    } else {
      log('yellow', `⚠️  ${name} failed (optional)`);
      return { success: false, error: error.message };
    }
  }
}

// 1. Check for React key issues in detail
log('yellow', '\n🔑 Checking React key patterns...');
const reactFiles = [
  'src/app/admin/products/page.tsx',
  'src/app/admin/AdminPanel.tsx'
];

reactFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      if (line.includes('key=')) {
        const lineNumber = index + 1;
        console.log(`${colors.blue}Line ${lineNumber}${colors.reset} in ${file}: ${line.trim()}`);

        // Check for potentially problematic patterns
        if (line.includes('key={image.name}') || line.includes('key={item.name}')) {
          log('yellow', `   ⚠️  Consider using unique IDs instead of names`);
        }
        if (line.includes('key={index}')) {
          log('yellow', `   ⚠️  Using array index as key can cause issues`);
        }
      }
    });
  }
});

// 2. Run standard checks
const checks = [
  { name: 'TypeScript Check', command: 'npm run type-check:strict', required: true },
  { name: 'ESLint Check', command: 'npm run lint', required: true },
  { name: 'Build Check', command: 'npm run build', required: true },
  { name: 'Health Check (Sandbox)', command: 'npm run health:check:sandbox', required: false },
  { name: 'Console Error Check (Sandbox)', command: 'npm run console:check:sandbox', required: false }
];

let allPassed = true;
const results = [];

checks.forEach(check => {
  const result = runCheck(check.name, check.command, check.required);
  results.push(result);
  if (!result.success && check.required) {
    allPassed = false;
  }
});

// 3. Check for common error patterns
log('yellow', '\n🔍 Checking for common error patterns...');

const commonIssues = [
  {
    name: 'Missing error boundaries',
    pattern: /try\s*\{[^}]*\}\s*catch\s*\{[^}]*\}/g,
    files: ['src/app/**/*.tsx', 'src/components/**/*.tsx']
  },
  {
    name: 'Unused imports',
    pattern: /import.*from.*['"][^'"]+['"];?\s*$/gm,
    files: ['src/**/*.tsx', 'src/**/*.ts']
  }
];

// 4. Check file sizes
log('yellow', '\n📊 File size analysis...');
try {
  const files = execSync('find src -name "*.tsx" -exec wc -l {} + | sort -n | tail -10', { encoding: 'utf8' })
    .split('\n')
    .filter(line => line.trim());

  files.forEach(line => {
    const [count, ...fileParts] = line.trim().split(/\s+/);
    const fileName = fileParts.join(' ');
    const lineCount = parseInt(count);

    if (lineCount > 300) {
      log('yellow', `⚠️  Large file: ${lineCount} lines - ${fileName}`);
    }
  });
} catch (error) {
  log('red', 'Failed to analyze file sizes');
}

// 5. Summary
console.log('\n' + '='.repeat(50));
log('blue', '📋 SUMMARY');

const passed = results.filter(r => r.success).length;
const failed = results.filter(r => !r.success).length;
const required = results.filter(r => r.required).length;
const requiredPassed = results.filter(r => r.success && r.required).length;

console.log(`Total checks: ${results.length}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Required passed: ${requiredPassed}/${required}`);

if (allPassed) {
  log('green', '\n✅ All required checks passed!');
} else {
  log('red', '\n❌ Some required checks failed. Please fix them before proceeding.');
  process.exit(1);
}

// 6. Recommendations
console.log('\n' + '='.repeat(50));
log('blue', '💡 RECOMMENDATIONS');

console.log('• Run "npm run console:check:sandbox" to test for React warnings');
console.log('• Use "npm run pre:commit" before committing changes');
console.log('• Check the GitHub Actions workflow for comprehensive CI testing');
console.log('• Monitor the admin panel specifically for React key warnings');

// 7. Quick fix suggestions
const failedChecks = results.filter(r => !r.success);
if (failedChecks.length > 0) {
  console.log('\n' + '='.repeat(50));
  log('yellow', '🔧 QUICK FIXES');

  failedChecks.forEach(check => {
    switch (check.name) {
      case 'TypeScript Check':
        console.log('• Fix TypeScript errors by adding proper type annotations');
        break;
      case 'ESLint Check':
        console.log('• Run "npm run lint:fix" to auto-fix some linting issues');
        break;
      case 'Build Check':
        console.log('• Check for missing dependencies or import errors');
        break;
    }
  });
}
