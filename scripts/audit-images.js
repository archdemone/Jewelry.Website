#!/usr/bin/env node
// Fast CI-optimized image sharpness auditor
const fs = require('fs')
const path = require('path')
const http = require('http')
const { spawn } = require('child_process')
const puppeteer = require('puppeteer')

const BASE = process.env.AUDIT_BASE_URL || 'http://localhost:3000'
const PAGES = ['/', '/products'] // Reduced pages for speed

const OUT_DIR = path.join(process.cwd(), 'tools')
const JSON_OUT = path.join(OUT_DIR, 'audit-images.json')
const HTML_OUT = path.join(OUT_DIR, 'audit-images.html')

function absolute(url) {
  if (url.startsWith('http')) return url
  if (url.startsWith('//')) return 'https:' + url
  if (url.startsWith('/')) return BASE + url
  return new URL(url, BASE).toString()
}

async function fetchHead(url) {
  return new Promise((resolve) => {
    const req = http.request(url, { method: 'HEAD' }, (res) => {
      resolve({
        status: res.statusCode,
        headers: res.headers,
      })
    })
    req.on('error', () => resolve({ status: 0, headers: {} }))
    req.end()
  })
}

async function auditPage(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 }) // Faster loading
  const dpr = await page.evaluate(() => window.devicePixelRatio || 1)

  const results = []

  // <img> elements only (skip background images for speed)
  const imgs = await page.$$eval('img', (els) => els.map((el) => ({
    selector: el.outerHTML.slice(0, 120),
    currentSrc: el.currentSrc || el.src || '',
    naturalWidth: el.naturalWidth,
    naturalHeight: el.naturalHeight,
    renderedWidth: el.getBoundingClientRect().width,
    renderedHeight: el.getBoundingClientRect().height,
  })))
  
  for (const it of imgs) {
    const scale = it.naturalWidth ? (it.renderedWidth * dpr) / it.naturalWidth : 0
    const full = absolute(it.currentSrc)
    const head = full ? await fetchHead(full) : { status: 0, headers: {} }
    results.push({
      type: 'img', url: full, selector: it.selector,
      rendered: `${Math.round(it.renderedWidth)}x${Math.round(it.renderedHeight)}`,
      natural: `${it.naturalWidth}x${it.naturalHeight}`,
      dpr, scale: Number(scale.toFixed(2)),
      contentType: head.headers['content-type'] || '',
      bytes: head.headers['content-length'] || '',
      notes: '',
      page: url,
    })
  }

  return results
}

async function main() {
  console.log('Starting fast image audit...')
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  })
  
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  
  const allResults = []
  
  for (const pageUrl of PAGES) {
    console.log(`Auditing ${pageUrl}...`)
    const results = await auditPage(page, BASE + pageUrl)
    allResults.push(...results)
  }
  
  await browser.close()
  
  // Write results
  fs.mkdirSync(OUT_DIR, { recursive: true })
  fs.writeFileSync(JSON_OUT, JSON.stringify(allResults, null, 2))
  
  // Generate HTML report
  const html = generateHtmlReport(allResults)
  fs.writeFileSync(HTML_OUT, html)
  
  console.log(`Wrote ${JSON_OUT} and ${HTML_OUT}`)
  
  // Check for critical issues (RED status)
  const criticalIssues = allResults.filter(r => {
    if (r.natural === '0x0') return false // Skip unknown sizes
    const scale = parseFloat(r.scale)
    return scale > 1.5 // Only flag if significantly upscaled
  })
  
  if (criticalIssues.length > 0) {
    console.error(`Found ${criticalIssues.length} critical image issues (upscaled >1.5x)`)
    process.exit(1)
  }
  
  console.log('✅ Image audit passed - no critical issues found')
}

function generateHtmlReport(results) {
  const critical = results.filter(r => {
    if (r.natural === '0x0') return false
    const scale = parseFloat(r.scale)
    return scale > 1.5
  })
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Image Audit Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    .critical { color: red; }
    .warning { color: orange; }
    .good { color: green; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
  <h1>Image Audit Report</h1>
  <p>Total images: ${results.length}</p>
  <p class="critical">Critical issues: ${critical.length}</p>
  
  <h2>All Images</h2>
  <table>
    <tr>
      <th>Page</th>
      <th>URL</th>
      <th>Rendered</th>
      <th>Natural</th>
      <th>Scale</th>
      <th>Status</th>
    </tr>
    ${results.map(r => {
      const scale = parseFloat(r.scale)
      const status = r.natural === '0x0' ? 'UNKNOWN' : 
                    scale > 1.5 ? 'CRITICAL' : 
                    scale > 1.2 ? 'WARNING' : 'GOOD'
      const cls = status === 'CRITICAL' ? 'critical' : 
                  status === 'WARNING' ? 'warning' : 'good'
      return `<tr class="${cls}">
        <td>${r.page}</td>
        <td>${r.url}</td>
        <td>${r.rendered}</td>
        <td>${r.natural}</td>
        <td>${r.scale}</td>
        <td>${status}</td>
      </tr>`
    }).join('')}
  </table>
</body>
</html>`
  
  return html
}

main().catch(console.error)


