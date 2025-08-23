#!/usr/bin/env node

/**
 * CSS Validation Check Script
 * Detects common CSS issues that cause visual problems
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// CSS patterns that commonly cause visual issues
const CSS_ISSUE_PATTERNS = [
  // Circular elements that might become oval due to flex containers
  {
    pattern: /className="[^"]*rounded-full[^"]*"[^>]*style=\{[\s\S]*?backgroundColor[^}]*\}/g,
    name: 'Circular elements without aspect ratio protection',
    description: 'Circular elements (rounded-full) should have aspectRatio: 1/1 to prevent oval distortion',
    severity: 'HIGH'
  },
  
  // Flex containers that might distort child elements
  {
    pattern: /className="[^"]*flex[^"]*"[^>]*>\s*<div[^>]*className="[^"]*w-\d+ h-\d+[^"]*"/g,
    name: 'Fixed-size elements in flex containers',
    description: 'Fixed-size elements in flex containers may be distorted - add flex-shrink-0',
    severity: 'MEDIUM'
  },
  
  // Missing flex-shrink-0 on important elements
  {
    pattern: /className="[^"]*w-\d+ h-\d+[^"]*"[^>]*style=\{[\s\S]*?backgroundColor[^}]*\}/g,
    name: 'Colored elements without flex-shrink-0',
    description: 'Colored elements should have flex-shrink-0 to prevent distortion',
    severity: 'MEDIUM'
  },
  
  // Inconsistent width/height patterns
  {
    pattern: /className="[^"]*w-(\d+) h-(\d+)[^"]*"/g,
    name: 'Potential aspect ratio issues',
    description: 'Check if w-X h-Y creates the intended aspect ratio',
    severity: 'LOW'
  },
  
  // Missing min-width/min-height on important elements
  {
    pattern: /className="[^"]*w-4 h-4[^"]*"[^>]*style=\{[\s\S]*?backgroundColor[^}]*\}(?![\s\S]*?minWidth)/g,
    name: 'Small colored elements without min dimensions',
    description: 'Small colored elements should have minWidth/minHeight to prevent collapse',
    severity: 'MEDIUM'
  },
  
  // Grid items that might overflow
  {
    pattern: /className="[^"]*grid[^"]*"[^>]*>\s*<[^>]*className="[^"]*truncate[^"]*"/g,
    name: 'Grid items with truncate',
    description: 'Grid items with truncate may cause layout issues - check min-w-0',
    severity: 'LOW'
  },
  
  // Absolute positioning without proper z-index
  {
    pattern: /className="[^"]*absolute[^"]*"[^>]*style=\{[\s\S]*?backgroundColor[^}]*\}(?![\s\S]*?z-)/g,
    name: 'Absolutely positioned colored elements without z-index',
    description: 'Absolutely positioned elements should have appropriate z-index',
    severity: 'MEDIUM'
  },
  
  // Hover effects without proper positioning
  {
    pattern: /onMouseEnter[^>]*>\s*<div[^>]*className="[^"]*absolute[^"]*"[^>]*style=\{[\s\S]*?backgroundColor[^}]*\}/g,
    name: 'Hover effects with potential positioning issues',
    description: 'Hover effects should have proper positioning and z-index',
    severity: 'MEDIUM'
  }
];

// Specific patterns for common issues we've encountered
const SPECIFIC_ISSUES = [
  // Oval dots pattern - only if missing aspect ratio
  {
    pattern: /className="[^"]*w-4 h-4 rounded-full[^"]*"[^>]*style=\{[\s\S]*?backgroundColor[^}]*\}/g,
    name: 'Oval dots - missing aspect ratio',
    description: 'Circular dots need aspectRatio: 1/1 to stay circular in flex containers',
    severity: 'CRITICAL',
    fix: 'Add aspectRatio: 1/1, minWidth: 16px, minHeight: 16px to style',
    // Custom validation to exclude elements that already have aspectRatio
    customValidation: (match, content, index) => {
      // Look ahead to see if aspectRatio is already present
      const afterMatch = content.substring(index + match.length, index + match.length + 200);
      const hasAspectRatio = afterMatch.includes('aspectRatio');
      console.log(`Debug: ${match.substring(0, 50)}... has aspectRatio: ${hasAspectRatio}`);
      return !hasAspectRatio;
    }
  },
  
  // Tiny hover images
  {
    pattern: /width=\{(\d+)\}\s*height=\{(\d+)\}[^>]*className="[^"]*rounded object-cover[^"]*"/g,
    name: 'Hover images without explicit sizing',
    description: 'Hover images should have explicit minWidth/minHeight in style',
    severity: 'HIGH',
    fix: 'Add minWidth and minHeight to style prop'
  },
  
  // Broken prop alignment
  {
    pattern: /(\s+)(\w+)=\{([^}]+)\}\s*\n\s{1,3}(\w+)=\{([^}]+)\}/g,
    name: 'Broken prop alignment',
    description: 'Props are not properly aligned and may cause parsing issues',
    severity: 'CRITICAL',
    fix: 'Fix prop indentation to be consistent'
  }
];

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    // Check for CSS issue patterns
    CSS_ISSUE_PATTERNS.forEach(pattern => {
      let match;
      while ((match = pattern.pattern.exec(content)) !== null) {
        const lineNumber = content.substring(0, match.index).split('\n').length;
        issues.push({
          file: filePath,
          line: lineNumber,
          pattern: pattern.name,
          description: pattern.description,
          severity: pattern.severity,
          match: match[0].substring(0, 100) + '...'
        });
      }
    });
    
         // Check for specific issues
     SPECIFIC_ISSUES.forEach(issue => {
       let match;
       while ((match = issue.pattern.exec(content)) !== null) {
         // Apply custom validation if present
         if (issue.customValidation && !issue.customValidation(match[0], content, match.index)) {
           continue; // Skip this match if custom validation fails
         }
         
         const lineNumber = content.substring(0, match.index).split('\n').length;
         issues.push({
           file: filePath,
           line: lineNumber,
           pattern: issue.name,
           description: issue.description,
           severity: issue.severity,
           fix: issue.fix,
           match: match[0].substring(0, 100) + '...'
         });
       }
     });
    
    return issues;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return [];
  }
}

function main() {
  console.log('🔍 CSS Validation Check Starting...\n');
  
  // Find all TypeScript/TSX files
  const files = glob.sync('src/**/*.{ts,tsx}');
  let allIssues = [];
  
  files.forEach(file => {
    const issues = scanFile(file);
    allIssues = allIssues.concat(issues);
  });
  
  // Group issues by severity
  const critical = allIssues.filter(i => i.severity === 'CRITICAL');
  const high = allIssues.filter(i => i.severity === 'HIGH');
  const medium = allIssues.filter(i => i.severity === 'MEDIUM');
  const low = allIssues.filter(i => i.severity === 'LOW');
  
  // Report results
  console.log(`📊 CSS Validation Results:`);
  console.log(`   Critical: ${critical.length}`);
  console.log(`   High: ${high.length}`);
  console.log(`   Medium: ${medium.length}`);
  console.log(`   Low: ${low.length}`);
  console.log(`   Total: ${allIssues.length}\n`);
  
  // Show critical and high issues
  const importantIssues = [...critical, ...high];
  if (importantIssues.length > 0) {
    console.log('🚨 Important Issues Found:');
    importantIssues.forEach(issue => {
      console.log(`\n   ${issue.severity}: ${issue.pattern}`);
      console.log(`   File: ${issue.file}:${issue.line}`);
      console.log(`   Description: ${issue.description}`);
      if (issue.fix) {
        console.log(`   Fix: ${issue.fix}`);
      }
      console.log(`   Match: ${issue.match}`);
    });
  }
  
  // Show medium issues (limited)
  if (medium.length > 0) {
    console.log(`\n⚠️  Medium Priority Issues (showing first 5):`);
    medium.slice(0, 5).forEach(issue => {
      console.log(`\n   ${issue.file}:${issue.line} - ${issue.pattern}`);
      console.log(`   ${issue.description}`);
    });
    if (medium.length > 5) {
      console.log(`   ... and ${medium.length - 5} more medium priority issues`);
    }
  }
  
  // Exit with error code if critical issues found
  if (critical.length > 0) {
    console.log('\n❌ Critical CSS issues found! Please fix these immediately.');
    process.exit(1);
  }
  
  if (high.length > 0) {
    console.log('\n⚠️  High priority CSS issues found. Consider fixing these soon.');
    process.exit(1);
  }
  
  if (allIssues.length === 0) {
    console.log('✅ No CSS issues found!');
  } else {
    console.log('\n✅ CSS validation completed with warnings.');
  }
}

if (require.main === module) {
  main();
}

module.exports = { scanFile, CSS_ISSUE_PATTERNS, SPECIFIC_ISSUES };
