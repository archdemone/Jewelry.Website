#!/usr/bin/env node

/**
 * JSX Formatting Check Script
 * Detects malformed JSX props that can cause rendering issues
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Patterns to detect critical malformed JSX props that cause rendering issues
const CRITICAL_PATTERNS = [
  // Props with broken alignment that can cause parsing issues
  {
    pattern: /(\s+)(\w+)=\{([^}]+)\}\s*\n\s{1,3}(\w+)=\{([^}]+)\}/g,
    name: 'Broken prop alignment',
    description: 'Props are not properly aligned and may cause parsing issues'
  },
  // Props with excessive spaces that can break rendering
  {
    pattern: /(\s{15,})(\w+)=\{([^}]+)\}/g,
    name: 'Excessive prop indentation',
    description: 'Props have too many spaces (likely formatting issue that breaks rendering)'
  },
  // Props with tabs mixed with spaces
  {
    pattern: /\t.*\w+=\{([^}]+)\}/g,
    name: 'Mixed tabs and spaces',
    description: 'Props use tabs instead of spaces'
  },
  // Props that are completely misaligned (like the width/height issue we just fixed)
  {
    pattern: /(\s+)(\w+)=\{([^}]+)\}\s*\n\s{5,}(\w+)=\{([^}]+)\}/g,
    name: 'Severely misaligned props',
    description: 'Props are severely misaligned and will likely cause rendering issues'
  }
];

// Files to check (focus on admin files where the issue occurred)
const FILES_TO_CHECK = [
  'src/app/admin/**/*.tsx',
  'src/app/admin/**/*.jsx',
  'src/app/admin/**/*.ts',
  'src/app/admin/**/*.js'
];

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  CRITICAL_PATTERNS.forEach(({ pattern, name, description }) => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const lineNumber = content.substring(0, match.index).split('\n').length;
      const line = content.split('\n')[lineNumber - 1];
      
      // Only report if it's a critical issue (like the width/height problem)
      if (match[0].includes('width=') || match[0].includes('height=') || 
          match[0].includes('src=') || match[0].includes('alt=') ||
          match[0].includes('className=') || match[0].includes('onClick=')) {
        issues.push({
          file: filePath,
          line: lineNumber,
          pattern: name,
          description,
          code: line.trim(),
          match: match[0]
        });
      }
    }
  });
  
  return issues;
}

function main() {
  console.log('🔍 Checking for critical JSX formatting issues...\n');
  
  let allIssues = [];
  
  FILES_TO_CHECK.forEach(pattern => {
    const files = glob.sync(pattern, { ignore: ['node_modules/**', '.next/**', 'out/**'] });
    
    files.forEach(file => {
      const issues = checkFile(file);
      allIssues = allIssues.concat(issues);
    });
  });
  
  if (allIssues.length === 0) {
    console.log('✅ No critical JSX formatting issues found!');
    process.exit(0);
  }
  
  console.log(`❌ Found ${allIssues.length} critical JSX formatting issue(s):\n`);
  
  allIssues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.pattern}`);
    console.log(`   File: ${issue.file}:${issue.line}`);
    console.log(`   Description: ${issue.description}`);
    console.log(`   Code: ${issue.code}`);
    console.log(`   Match: ${issue.match.substring(0, 100)}${issue.match.length > 100 ? '...' : ''}`);
    console.log('');
  });
  
  console.log('💡 Fix these issues to prevent rendering problems.');
  console.log('   Consider using Prettier or ESLint to auto-format your code.');
  
  process.exit(1);
}

if (require.main === module) {
  main();
}

module.exports = { checkFile, CRITICAL_PATTERNS };
