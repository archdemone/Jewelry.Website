#!/usr/bin/env node
// Lightweight image sharpness auditor
import fs from 'fs';
import path from 'path';
import http from 'http';
import { spawn } from 'child_process';
import puppeteer from 'puppeteer';

const BASE = process.env.AUDIT_BASE_URL || 'http://localhost:3000';
const PAGES = ['/', '/products', '/products?category=engagement-rings'];

const OUT_DIR = path.join(process.cwd(), 'tools');
const JSON_OUT = path.join(OUT_DIR, 'audit-images.json');
const HTML_OUT = path.join(OUT_DIR, 'audit-images.html');

function absolute(url) {
  if (url.startsWith('http')) return url;
  if (url.startsWith('//')) return 'https:' + url;
  if (url.startsWith('/')) return BASE + url;
  return new URL(url, BASE).toString();
}

async function fetchHead(url) {
  return new Promise((resolve) => {
    const req = http.request(url, { method: 'HEAD' }, (res) => {
      resolve({
        status: res.statusCode,
        headers: res.headers,
      });
    });
    req.on('error', () => resolve({ status: 0, headers: {} }));
    req.end();
  });
}

async function auditPage(page, url) {
  await page.goto(url, { waitUntil: 'networkidle2' });
  const dpr = await page.evaluate(() => window.devicePixelRatio || 1);

  const results = [];

  // <img> elements
  const imgs = await page.$$eval('img', (els) =>
    els.map((el) => ({
      selector: el.outerHTML.slice(0, 120),
      currentSrc: el.currentSrc || el.src || '',
      naturalWidth: el.naturalWidth,
      naturalHeight: el.naturalHeight,
      renderedWidth: el.getBoundingClientRect().width,
      renderedHeight: el.getBoundingClientRect().height,
    })),
  );
  for (const it of imgs) {
    const scale = it.naturalWidth ? (it.renderedWidth * dpr) / it.naturalWidth : 0;
    const full = absolute(it.currentSrc);
    const head = full ? await fetchHead(full) : { status: 0, headers: {} };
    results.push({
      type: 'img',
      url: full,
      selector: it.selector,
      rendered: `${Math.round(it.renderedWidth)}x${Math.round(it.renderedHeight)}`,
      natural: `${it.naturalWidth}x${it.naturalHeight}`,
      dpr,
      scale: Number(scale.toFixed(2)),
      contentType: head.headers['content-type'] || '',
      bytes: head.headers['content-length'] || '',
      notes: '',
    });
  }

  // background-image elements
  const bgItems = await page.evaluate(() => {
    const out = [];
    const all = Array.from(document.querySelectorAll('*'));
    for (const el of all) {
      const cs = getComputedStyle(el);
      const bg = cs.backgroundImage;
      if (bg && bg !== 'none') {
        const m = /url\("?(.*?)"?\)/.exec(bg);
        if (m && m[1]) {
          const rect = el.getBoundingClientRect();
          out.push({
            selector: el.tagName.toLowerCase(),
            url: m[1],
            renderedWidth: rect.width,
            renderedHeight: rect.height,
          });
        }
      }
    }
    return out;
  });
  for (const it of bgItems) {
    const full = absolute(it.url);
    const head = await fetchHead(full);
    // We cannot read naturalWidth for bg easily; flag if slot is large
    results.push({
      type: 'background',
      url: full,
      selector: it.selector,
      rendered: `${Math.round(it.renderedWidth)}x${Math.round(it.renderedHeight)}`,
      natural: 'unknown',
      dpr,
      scale: 0,
      contentType: head.headers['content-type'] || '',
      bytes: head.headers['content-length'] || '',
      notes: 'Ensure asset >= 2x rendered width for retina',
    });
  }

  // Tag risks
  for (const r of results) {
    if (r.type === 'img' && r.scale > 1.0) {
      r.notes = 'Upscaled on this device DPR → possible blur';
    }
  }
  return results;
}

async function main() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const all = [];
  for (const p of PAGES) {
    const url = BASE + p;
    const rows = await auditPage(page, url);
    rows.forEach((r) => (r.page = p));
    all.push(...rows);
  }
  await browser.close();

  fs.writeFileSync(JSON_OUT, JSON.stringify(all, null, 2));

  // HTML report
  const rows = all
    .map(
      (
        r,
      ) => `<tr style="background:${r.scale > 1 ? '#ffe5e5' : r.scale > 0.8 ? '#fff7e6' : '#fff'}">
    <td>${r.page}</td>
    <td>${r.type}</td>
    <td><code>${r.selector.replace(/</g, '&lt;')}</code></td>
    <td>${r.rendered}</td>
    <td>${r.natural}</td>
    <td>${r.dpr}</td>
    <td>${r.scale}</td>
    <td><a href="${r.url}">${r.url}</a></td>
    <td>${r.contentType}</td>
    <td>${r.bytes}</td>
    <td>${r.notes}</td>
  </tr>`,
    )
    .join('\n');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Image Audit</title>
  <style>body{font-family:system-ui,Arial} table{border-collapse:collapse;width:100%} td,th{border:1px solid #ddd;padding:6px;font-size:12px} th{background:#f5f5f5;position:sticky;top:0}</style>
  </head><body>
  <h1>Image Audit Report</h1>
  <p>Base: ${BASE}</p>
  <table><thead><tr><th>Page</th><th>Type</th><th>Selector</th><th>Rendered</th><th>Natural</th><th>DPR</th><th>Scale</th><th>URL</th><th>Type</th><th>Bytes</th><th>Notes</th></tr></thead>
  <tbody>${rows}</tbody></table>
  </body></html>`;
  fs.writeFileSync(HTML_OUT, html);

  console.log(`Wrote ${JSON_OUT} and ${HTML_OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
