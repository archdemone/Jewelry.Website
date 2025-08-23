#!/usr/bin/env node
const kill = require('kill-port');
(async ()=>{
  const ports=[3000,3001];
  for (const p of ports) {
    try { await kill(p,'tcp'); console.log(`🔪 Freed port ${p}`); }
    catch { console.log(`ℹ️ Port ${p} not in use`); }
  }
})();