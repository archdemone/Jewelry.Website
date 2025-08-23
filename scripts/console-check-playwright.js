#!/usr/bin/env node
const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  try { await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded', timeout: 15000 }); await page.waitForTimeout(1000); }
  catch (e) { errors.push('Navigation/timeout error: ' + (e.message || e)); }
  await browser.close();
  const ok = errors.length === 0;
  console.log(JSON.stringify({ ok, errors }, null, 2));
  process.exit(ok ? 0 : 1);
})();