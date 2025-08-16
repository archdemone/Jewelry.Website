const { spawn, spawnSync } = require('child_process')
const path = require('path')
const net = require('net')

const projectRoot = path.resolve(__dirname, '..')

// Ensure build in case not built
const build = spawnSync('npm', ['run', '-s', 'pretest:e2e'], { cwd: projectRoot, stdio: 'inherit', shell: process.platform === 'win32' })
if (build.status !== 0) process.exit(build.status)

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
  // Check IPv6 and IPv4 loopbacks
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

;(async () => {
  // Always pick a free port in range (ignore existing PORT to avoid stale collisions)
  const PORT = String(await findOpenPort(3010, 3090))
  const env = { ...process.env, HOST: '127.0.0.1', PORT, NEXTAUTH_URL: `http://localhost:${PORT}`, NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'dev-secret' }

  const server = spawn('npx', ['--no-install', 'next', 'start', '-p', PORT, '--hostname', '127.0.0.1'], { cwd: projectRoot, env, shell: true, stdio: 'inherit' })

  function shutdown(code) {
    try { server.kill() } catch {}
    process.exit(code)
  }

  server.on('error', () => shutdown(1))

  // Give server time to start, then run Cypress
  setTimeout(() => {
    const cypress = spawn('npx', ['--no-install', 'cypress', 'run', '--config', `video=false,baseUrl=http://localhost:${PORT},defaultCommandTimeout=10000,retries=1`], { cwd: projectRoot, env, shell: true, stdio: 'inherit' })
    cypress.on('exit', (code) => shutdown(code))
    cypress.on('error', () => shutdown(1))
  }, 3500)
})().catch((err) => {
  console.error(err)
  process.exit(1)
})


