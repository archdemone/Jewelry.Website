#!/usr/bin/env node

const { spawn, spawnSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const net = require('net')
const http = require('http')

const projectRoot = path.resolve(__dirname, '..')

function isPortFreeOnHost(port, host) {
  return new Promise((resolve) => {
    const srv = net.createServer()
      .once('error', () => resolve(false))
      .once('listening', () => {
        srv.once('close', () => resolve(true)).close()
      })
      .listen(port, host)
  })
}

async function isPortGloballyFree(port) {
  const v6 = await isPortFreeOnHost(port, '::').catch(() => false)
  const v4 = await isPortFreeOnHost(port, '127.0.0.1').catch(() => false)
  return v6 && v4
}

async function findOpenPort(start, end) {
  for (let p = start; p <= end; p++) {
    // eslint-disable-next-line no-await-in-loop
    const free = await isPortGloballyFree(p)
    if (free) return p
  }
  throw new Error('No open port found')
}

function fileExists(p) {
  try { fs.accessSync(p); return true } catch { return false }
}

function ensureBuilt() {
  const buildIdFile = path.join(projectRoot, '.next', 'BUILD_ID')
  if (fileExists(buildIdFile)) return true
  const res = spawnSync('npx --no-install next build', { cwd: projectRoot, stdio: 'inherit', shell: true })
  return res.status === 0
}

async function waitForHttp(url, timeoutMs = 30000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const req = http.get(url, (res) => {
        res.resume()
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 500) return resolve(true)
        if (Date.now() - start > timeoutMs) return reject(new Error('Timeout waiting for server'))
        setTimeout(attempt, 500)
      })
      req.on('error', () => {
        if (Date.now() - start > timeoutMs) return reject(new Error('Timeout waiting for server'))
        setTimeout(attempt, 500)
      })
    }
    attempt()
  })
}

function decodeNextImageSrc(src) {
  try {
    const u = new URL(src, 'http://localhost')
    if (u.pathname === '/_next/image') {
      const urlParam = u.searchParams.get('url')
      if (urlParam) return decodeURIComponent(urlParam)
    }
  } catch {}
  return src
}

function classify(naturalW, requiredW) {
  if (!naturalW || !requiredW) return 'UNKNOWN'
  if (naturalW < requiredW) return 'RED'
  if (naturalW > requiredW * 1.5) return 'YELLOW'
  return 'GREEN'
}

async function runAudit() {
  const { chromium } = require('playwright')

  const PORT = await findOpenPort(3010, 3090)

  if (!ensureBuilt()) {
    console.error('next build failed; cannot run image audit')
    process.exit(1)
  }

  const env = { ...process.env, HOST: '127.0.0.1', PORT: String(PORT), NEXTAUTH_URL: `http://localhost:${PORT}` }
  const server = spawn('npx', ['--no-install', 'next', 'start', '-p', String(PORT), '--hostname', '127.0.0.1'], { cwd: projectRoot, env, shell: true, stdio: 'inherit' })

  try {
    await waitForHttp(`http://127.0.0.1:${PORT}/`)

    const browser = await chromium.launch()
    const pagesToCheck = ['/', '/products']
    const viewports = [
      { width: 360, height: 740, label: 'mobile' },
      { width: 768, height: 1024, label: 'tablet' },
      { width: 1280, height: 800, label: 'desktop' },
    ]

    let redCount = 0

    console.log('\nImage Audit Report')
    console.log('='.repeat(80))
    console.log('Legend: GREEN = OK, YELLOW = oversized, RED = blur risk')

    for (const route of pagesToCheck) {
      for (const vp of viewports) {
        const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
        const page = await context.newPage()
        const url = `http://127.0.0.1:${PORT}${route}`
        try {
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 })
        } catch {
          await context.close()
          continue
        }
        // Wait a moment for images to settle
        await page.waitForTimeout(500)

        const results = await page.evaluate(() => {
          const dpr = window.devicePixelRatio || 1
          const items = []
          const imgs = Array.from(document.querySelectorAll('img'))
          for (const img of imgs) {
            const rect = img.getBoundingClientRect()
            const naturalW = img.naturalWidth || 0
            const naturalH = img.naturalHeight || 0
            const clientW = Math.round(rect.width)
            const clientH = Math.round(rect.height)
            const requiredW = Math.round(clientW * dpr)
            const requiredH = Math.round(clientH * dpr)
            items.push({
              src: img.currentSrc || img.src || '',
              alt: img.alt || '',
              clientW,
              clientH,
              naturalW,
              naturalH,
              requiredW,
              requiredH,
              dpr
            })
          }
          return items
        })

        if (results.length === 0) {
          await context.close()
          continue
        }

        console.log(`\nRoute: ${route}  |  Viewport: ${vp.label} (${vp.width}x${vp.height})`)
        console.log('-'.repeat(80))
        console.log(['Status', 'NaturalWxH', 'ReqWxH', 'ClientWxH', 'DPR', 'Alt', 'Src'].join(' | '))

        for (const r of results) {
          const requiredW = r.requiredW
          const status = classify(r.naturalW, requiredW)
          if (status === 'RED') redCount += 1
          const srcDisplay = decodeNextImageSrc(r.src)
          console.log([
            status,
            `${r.naturalW}x${r.naturalH}`,
            `${r.requiredW}x${r.requiredH}`,
            `${r.clientW}x${r.clientH}`,
            `${r.dpr.toFixed(2)}`,
            r.alt || '(no alt)',
            srcDisplay,
          ].join(' | '))
        }

        await context.close()
      }
    }

    await browser.close()

    console.log('\n'.padEnd(80, '='))
    if (redCount > 0) {
      console.error(`\nFound ${redCount} RED rows (potential blur). Failing.`)
      process.exit(1)
    } else {
      console.log('\nNo RED rows found. All good!')
    }
  } catch (err) {
    console.error('[audit-images] Error:', err && err.message ? err.message : err)
    process.exit(1)
  } finally {
    try { server.kill() } catch {}
  }
}

runAudit()