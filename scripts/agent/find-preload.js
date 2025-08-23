#!/usr/bin/env node
const fs=require('fs'); const path=require('path');
function* walk(d){ try{ for (const e of fs.readdirSync(d,{withFileTypes:true})) { const p=path.join(d,e.name); if (e.isDirectory()) yield* walk(p); else if (/\.(js|jsx|ts|tsx|html)$/i.test(e.name)) yield p; } } catch {}
(function(){ const root=process.cwd(); const hits=[]; for (const f of walk(root)){ try{ const t=fs.readFileSync(f,'utf8'); const lines=t.split(/\r?\n/); lines.forEach((ln,i)=>{ if(ln.includes('<link') && ln.includes('rel=\"preload\"')) hits.push({file:path.relative(root,f),line:i+1,snippet:ln.trim().slice(0,200)});}); } catch {} } console.log(JSON.stringify({ok:true,hits},null,2)); })();
