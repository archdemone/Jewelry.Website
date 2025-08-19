#!/usr/bin/env node
// Minimal, dependency-free checks for common pitfalls

import fs from 'fs';
import path from 'path';

const files = process.argv.slice(2);
let hadError = false;

const problems = [];

const add = (file, line, rule, snippet) => {
  hadError = true;
  problems.push({ file, line, rule, snippet });
};

// Helpers
const eachLine = (text, cb) => {
  text.split(/\r?\n/).forEach((line, idx) => cb(line, idx + 1));
};

for (const file of files) {
  let text = '';
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch {
    continue;
  }

  eachLine(text, (line, ln) => {
    // 1) Computed dynamic import: import(`...${...}`) or import(someVar)
    if (/\b(dynamic|lazy)\s*\(/.test(line) || /React\.lazy\s*\(/.test(line)) {
      // Any import(  that is not followed by a simple quoted string
      const m = line.match(/import\s*\(([^)]+)\)/);
      if (m) {
        const arg = m[1].trim();
        const isQuoted = /^['"][^'"]+['"]$/.test(arg);
        const isTemplate = /^`/.test(arg) || /\$\{/.test(arg);
        const isVariable = !isQuoted && !isTemplate;

        if (isTemplate) {
          add(file, ln, 'Computed dynamic import (template literal)', line.trim());
        } else if (isVariable) {
          add(file, ln, 'Computed dynamic import (variable path)', line.trim());
        } else {
          // 2) Barrel/index imports (path ends with /index or /index.ext)
          const p = arg.slice(1, -1); // strip quotes
          if (/\/index(\.[a-zA-Z]+)?$/.test(p)) {
            add(
              file,
              ln,
              'Dynamic import targets a barrel (/index.*). Use the concrete file.',
              line.trim(),
            );
          }
          // 3) Directory-only target (ends with /)
          if (/\/$/.test(p)) {
            add(
              file,
              ln,
              'Dynamic import ends with "/". Use the concrete file, not a folder.',
              line.trim(),
            );
          }
        }
      }
    }

    // 4) next/dynamic without literal path via thenable (named export mapping allowed)
    // We only flag obvious misuse: dynamic(() => import(foo))
    if (/dynamic\s*\(\s*\(\s*=>\s*import\s*\(\s*[a-zA-Z_$]/.test(line)) {
      add(file, ln, 'dynamic() import uses a variable. Use a literal string path.', line.trim());
    }
  });
}

// Report
if (hadError) {
  console.error('\n❌ Blocked commit due to risky lazy/dynamic imports:\n');
  for (const p of problems) {
    console.error(`- ${p.file}:${p.line} — ${p.rule}\n  ${p.snippet}`);
  }
  console.error(`
Guidelines:
  • Use literal file paths: dynamic(() => import('path/to/Component'))
  • Don't use template strings or variables in import().
  • Don't target barrels (/index) or folders.
  • If importing a named export, map it:
      dynamic(() => import('./Widget').then(m => ({ default: m.Widget })))
`);
  process.exit(1);
}

process.exit(0);
