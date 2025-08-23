#!/usr/bin/env node

/**
 * Fast Multi-Page Validation System
 * Checks CSS, JSX, and common issues across all pages in ~1 second
 */

const fs = require('fs');
const glob = require('glob');

// Fast CSS patterns (only critical issues)
const FAST_CSS_PATTERNS = [
  {
    pattern: /className="[^"]*w-4 h-4 rounded-full[^"]*"[^>]*style=\{[\s\S]*?backgroundColor[^}]*\}/g,
    name: 'Oval dots detected',
    fix: 'Add aspectRatio: "1 / 1", minWidth: "16px", minHeight: "16px"',
    severity: 'CRITICAL'
  },
  {
    pattern: /width=\{(\d+)\}\s*height=\{(\d+)\}[^>]*className="[^"]*rounded object-cover[^"]*"(?![\s\S]*?minWidth)/g,
    name: 'Tiny hover images detected',
    fix: 'Add minWidth and minHeight to style prop',
    severity: 'CRITICAL'
  },
  {
    pattern: /(\s{15,})(\w+)=\{([^}]+)\}/g,
    name: 'Broken prop alignment',
    fix: 'Fix prop indentation to be consistent',
    severity: 'CRITICAL'
  }
];

// Fast JSX patterns
const FAST_JSX_PATTERNS = [
  {
    pattern: /key=\{([^}]+\.name)\}/g,
    name: 'Non-unique React keys',
    fix: 'Use unique identifiers instead of names for keys',
    severity: 'HIGH'
  },
  {
    pattern: /useState\([^)]*\)[^;]*;[^;]*useEffect\([^)]*\)/g,
    name: 'Missing React imports',
    fix: 'Ensure useState and useEffect are imported',
    severity: 'MEDIUM'
  }
];

// Fast accessibility patterns
const FAST_A11Y_PATTERNS = [
  {
    pattern: /<img[^>]*src=[^>]*>(?![\s\S]*?alt=)/g,
    name: 'Missing alt text',
    fix: 'Add descriptive alt text to images',
    severity: 'HIGH'
  },
  {
    pattern: /<button[^>]*>(?![\s\S]*?aria-label)/g,
    name: 'Button without label',
    fix: 'Add aria-label or text content to buttons',
    severity: 'MEDIUM'
  }
];

function quickScanFile(filePath, patterns) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.pattern.exec(content)) !== null) {
        // Skip if already fixed (quick check)
        const afterMatch = content.substring(match.index, match.index + match[0].length + 100);
        if (pattern.name.includes('Oval dots') && afterMatch.includes('aspectRatio')) continue;
        if (pattern.name.includes('hover images') && afterMatch.includes('minWidth')) continue;
        
        const lineNumber = content.substring(0, match.index).split('\n').length;
        issues.push({
          file: filePath,
          line: lineNumber,
          issue: pattern.name,
          fix: pattern.fix,
          severity: pattern.severity,
          match: match[0].substring(0, 80) + '...'
        });
      }
    });
    
    return issues;
  } catch (error) {
    return [];
  }
}

function getAllPages() {
  // Get all page files (TSX, TS, JSX, JS)
  const pageFiles = glob.sync('src/**/*.{tsx,ts,jsx,js}', {
    ignore: ['node_modules/**', '.next/**', 'out/**', 'node_modules/**']
  });
  
  // Filter to only include actual pages/components
  return pageFiles.filter(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      return content.includes('export default') || 
             content.includes('function') || 
             content.includes('const') ||
             file.includes('page.tsx') ||
             file.includes('layout.tsx');
    } catch (error) {
      return false;
    }
  });
}

function main() {
  const startTime = Date.now();
  const args = process.argv.slice(2);
  
  console.log('🔍 Fast Multi-Page Validation Starting...\n');
  
  // Get all pages
  const allPages = getAllPages();
  console.log(`📄 Scanning ${allPages.length} pages...`);
  
  let allIssues = [];
  
  // Scan each page for all types of issues
  allPages.forEach(file => {
    const cssIssues = quickScanFile(file, FAST_CSS_PATTERNS);
    const jsxIssues = quickScanFile(file, FAST_JSX_PATTERNS);
    const a11yIssues = quickScanFile(file, FAST_A11Y_PATTERNS);
    
    allIssues = allIssues.concat(cssIssues, jsxIssues, a11yIssues);
  });
  
  const scanTime = Date.now() - startTime;
  
  // Group by severity
  const critical = allIssues.filter(i => i.severity === 'CRITICAL');
  const high = allIssues.filter(i => i.severity === 'HIGH');
  const medium = allIssues.filter(i => i.severity === 'MEDIUM');
  
  // Report results
  console.log(`\n📊 Fast Validation Results (${scanTime}ms):`);
  console.log(`   Critical: ${critical.length}`);
  console.log(`   High: ${high.length}`);
  console.log(`   Medium: ${medium.length}`);
  console.log(`   Total: ${allIssues.length}`);
  
  if (allIssues.length === 0) {
    console.log('\n✅ No issues found! All pages look good.');
    process.exit(0);
  }
  
  // Show critical and high issues
  const importantIssues = [...critical, ...high];
  if (importantIssues.length > 0) {
    console.log('\n🚨 Important Issues Found:');
    importantIssues.forEach(issue => {
      console.log(`\n   ${issue.severity}: ${issue.issue}`);
      console.log(`   📍 ${issue.file}:${issue.line}`);
      console.log(`   🔧 Fix: ${issue.fix}`);
      console.log(`   📝 ${issue.match}`);
    });
  }
  
  // Show medium issues (limited)
  if (medium.length > 0) {
    console.log(`\n⚠️  Medium Priority Issues (showing first 3):`);
    medium.slice(0, 3).forEach(issue => {
      console.log(`   ${issue.file}:${issue.line} - ${issue.issue}`);
    });
    if (medium.length > 3) {
      console.log(`   ... and ${medium.length - 3} more medium priority issues`);
    }
  }
  
  // Exit with error if critical issues found
  if (critical.length > 0) {
    console.log('\n❌ Critical issues found! Please fix these immediately.');
    process.exit(1);
  }
  
  if (high.length > 0) {
    console.log('\n⚠️  High priority issues found. Consider fixing these soon.');
    process.exit(1);
  }
  
  console.log('\n✅ Fast validation completed with warnings.');
}

if (require.main === module) {
  main();
}
