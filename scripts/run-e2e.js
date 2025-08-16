const { spawn, spawnSync } = require('child_process')
const path = require('path')

const projectRoot = path.resolve(__dirname, '..')

// Ensure build in case not built
const build = spawnSync('npm', ['run', '-s', 'pretest:e2e'], { cwd: projectRoot, stdio: 'inherit', shell: process.platform === 'win32' })
if (build.status !== 0) process.exit(build.status)

// Choose a non-3000 port to avoid conflicts on Windows runners
const PORT = process.env.PORT || '3010'

const env = { ...process.env, PORT, NEXTAUTH_URL: `http://localhost:${PORT}`, NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'dev-secret' }

const server = spawn('npx', ['--no-install', 'next', 'start', '-p', PORT], { cwd: projectRoot, env, shell: true, stdio: 'inherit' })

function shutdown(code) {
  try { server.kill() } catch {}
  process.exit(code)
}

server.on('error', () => shutdown(1))

// Give server time to start, then run Cypress
setTimeout(() => {
  const cypress = spawn('npx', ['--no-install', 'cypress', 'run', '--config', 'video=false,baseUrl=http://localhost:' + PORT, 'defaultCommandTimeout=8000'], { cwd: projectRoot, env, shell: true, stdio: 'inherit' })
  cypress.on('exit', (code) => shutdown(code))
  cypress.on('error', () => shutdown(1))
}, 3000)


