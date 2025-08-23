#!/usr/bin/env node
const fs = require('fs'); const path = require('path');
const plan = require('./curation-plan.json');
let removed = [], kept = [];
for (const rel of plan.delete) {
  const p = path.join(process.cwd(), rel);
  if (fs.existsSync(p)) { fs.unlinkSync(p); removed.push(rel); }
}
for (const rel of plan.keep) {
  const p = path.join(process.cwd(), rel);
  if (fs.existsSync(p)) kept.push(rel);
}
console.log(JSON.stringify({ ok: true, removed, keptCount: kept.length }, null, 2));
