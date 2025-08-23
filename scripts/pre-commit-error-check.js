#!/usr/bin/env node

/**
 * Pre-commit Error Check Script
 * Runs comprehensive checks to catch errors before they reach the user
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Running Pre-commit Error Checks...\n');

let hasErrors = false;
const errors = [];

// Helper function to run commands safely
function runCommand(command, description) {
  try {
    console.log(`📋 ${description}...`);
    const output = execSync(command, { encoding: 'utf8', maxBuffer: 1024 * 1024 });
    console.log('✅ Passed\n');
    return { success: true, output };
  } catch (error) {
    console.log('❌ Failed\n');
    hasErrors = true;
    errors.push({ type: description, error: error.message });
    return { success: false, error: error.message };
  }
}

// 1. TypeScript Type Checking
runCommand('npm run type-check:strict', 'TypeScript Type Checking');

// 2. ESLint
runCommand('npm run lint', 'ESLint Code Quality Check');

// 3. Build Check
runCommand('npm run build', 'Build Process Check');

// 4. React Key Uniqueness Check
console.log('🔑 Checking for potential React key issues...');
try {
  const files = [
    'src/app/admin/products/page.tsx',
    'src/app/admin/AdminPanel.tsx'
  ];

  for (const file of files) {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');

      // Check for common key patterns that might cause issues
      const mapPatterns = content.match(/\.map\(([^}]+)\{[^}]*key=\{[^}]+\}[^}]*\}\)/g);
      if (mapPatterns) {
        console.log(`📄 Analyzing ${file} for key patterns...`);
        // Look for potentially problematic key patterns
        if (content.includes('key={image.name}') || content.includes('key={item.name}')) {
          console.log('⚠️  Found potentially problematic key pattern in', file);
          console.log('   Consider using unique identifiers instead of names\n');
        }
      }
    }
  }
  console.log('✅ React key check completed\n');
} catch (error) {
  console.log('❌ React key check failed:', error.message, '\n');
  hasErrors = true;
  errors.push({ type: 'React Key Check', error: error.message });
}

// 5. JSX Formatting Check
console.log('🔧 Checking JSX formatting...');
try {
  const { checkFile } = require('./jsx-formatting-check');
  const glob = require('glob');
  
  const files = glob.sync('src/**/*.{tsx,jsx,ts,js}', { 
    ignore: ['node_modules/**', '.next/**', 'out/**'] 
  });
  
  let formattingIssues = 0;
  for (const file of files) {
    const issues = checkFile(file);
    if (issues.length > 0) {
      console.log(`❌ ${file}: ${issues.length} formatting issue(s)`);
      formattingIssues += issues.length;
    }
  }
  
  if (formattingIssues === 0) {
    console.log('✅ No JSX formatting issues found\n');
  } else {
    console.log(`❌ Found ${formattingIssues} JSX formatting issues\n`);
    hasErrors = true;
    errors.push({ type: 'JSX Formatting', error: `${formattingIssues} formatting issues found` });
  }
} catch (error) {
  console.log('❌ JSX formatting check failed:', error.message, '\n');
  hasErrors = true;
  errors.push({ type: 'JSX Formatting Check', error: error.message });
}

// 6. Fast Multi-Page Validation Check
console.log('🎨 Running fast multi-page validation...');
try {
  execSync('npm run validate:fast', { stdio: 'inherit' });
  console.log('✅ Fast validation check passed\n');
} catch (error) {
  console.log('❌ Fast validation issues found\n');
  hasErrors = true;
  errors.push({ type: 'Fast Validation', error: 'Fast validation issues found' });
}

// 7. Missing Import Check
console.log('📦 Checking for missing imports...');
try {
  const tsFiles = execSync('find src -name "*.tsx" -o -name "*.ts"', { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean);

  let missingImports = 0;
  for (const file of tsFiles.slice(0, 10)) { // Check first 10 files for performance
    try {
      const content = fs.readFileSync(file, 'utf8');
      // Simple heuristic - look for common React hooks used without imports
      if (content.includes('useState(') && !content.includes('import.*useState')) {
        console.log(`⚠️  ${file} uses useState but may not import it`);
        missingImports++;
      }
      if (content.includes('useEffect(') && !content.includes('import.*useEffect')) {
        console.log(`⚠️  ${file} uses useEffect but may not import it`);
        missingImports++;
      }
    } catch (e) {
      // Ignore file reading errors
    }
  }

  if (missingImports === 0) {
    console.log('✅ No obvious missing import issues found\n');
  } else {
    console.log(`⚠️  Found ${missingImports} potential missing import issues\n`);
  }
} catch (error) {
  console.log('❌ Missing import check failed:', error.message, '\n');
}

// 6. File Size Check
console.log('📊 Checking for oversized files...');
try {
  const largeFiles = execSync('find src -name "*.tsx" -o -name "*.ts" -exec wc -l {} + | sort -n | tail -5', { encoding: 'utf8' })
    .split('\n')
    .filter(line => line.trim() && parseInt(line) > 500);

  if (largeFiles.length > 0) {
    console.log('⚠️  Large files found (>500 lines):');
    largeFiles.forEach(file => console.log(`   ${file}`));
    console.log('');
  } else {
    console.log('✅ No oversized files found\n');
  }
} catch (error) {
  console.log('❌ File size check failed:', error.message, '\n');
}

// 7. Bundle Size Check (if bundle analyzer is available)
if (fs.existsSync('package.json')) {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (packageJson.scripts && packageJson.scripts['bundle:analyze']) {
      console.log('📦 Running bundle size check...');
      execSync('npm run bundle:analyze', { stdio: 'pipe', timeout: 30000 });
      console.log('✅ Bundle analysis completed\n');
    }
  } catch (error) {
    console.log('⚠️  Bundle analysis skipped or failed\n');
  }
}

// Summary
console.log('📋 Pre-commit Error Check Summary:');
if (hasErrors) {
  console.log('\n❌ ERRORS FOUND:');
  errors.forEach(error => {
    console.log(`  • ${error.type}: ${error.error}`);
  });
  console.log('\n🚫 Commit blocked due to errors. Please fix them before committing.');
  process.exit(1);
} else {
  console.log('\n✅ All checks passed! Ready for commit.');
  process.exit(0);
}
