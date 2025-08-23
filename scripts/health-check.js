#!/usr/bin/env node
const http = require('http');
const urls = ['http://localhost:3000/api/healthz', 'http://localhost:3001/api/healthz'];
function get(url){
  return new Promise((resolve)=> {
    const req = http.get(url, (res) => { res.resume(); resolve({url, status: res.statusCode}); })
      .on('error', ()=> resolve({url, status: 0}));
    req.setTimeout(3000, ()=> { req.destroy(); resolve({url, status: 0}); });
  });
}
(async()=>{
  const res = await Promise.all(urls.map(get));
  const ok = res.every(r => r.status === 200);
  console.log(JSON.stringify({ok, checks: res}, null, 2));
  process.exit(ok ? 0 : 1);
})();