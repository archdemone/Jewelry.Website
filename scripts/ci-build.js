/*
 Cross-platform CI build: temporarily disable Babel config so Next.js can use SWC (required by next/font),
 then run a production build, and finally restore the Babel config if it existed.
*/
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const projectRoot = path.resolve(__dirname, '..')
const babelrcPath = path.join(projectRoot, '.babelrc')
const babelrcBackupPath = path.join(projectRoot, '.babelrc.ci.bak')

let babelTemporarilyMoved = false

try {
  if (fs.existsSync(babelrcPath)) {
    // Move .babelrc out of the way to allow SWC
    fs.renameSync(babelrcPath, babelrcBackupPath)
    babelTemporarilyMoved = true
  }

  // Ensure Prisma client is generated for server code that imports it
  const prismaCmd = process.platform === 'win32' ? 'npx --no-install prisma generate' : 'npx --no-install prisma generate'
  const prismaGen = spawnSync(prismaCmd, { stdio: 'inherit', cwd: projectRoot, env: process.env, shell: true })
  if (prismaGen.status !== 0) {
    throw new Error(`prisma generate failed with exit code ${prismaGen.status}`)
  }

  // Resolve local next binary for cross-platform execution
  const command = process.platform === 'win32' ? 'npx --no-install next build' : 'npx --no-install next build'

  const result = spawnSync(command, {
    stdio: 'inherit',
    cwd: projectRoot,
    env: process.env,
    shell: true,
  })

  if (result.status !== 0) {
    throw new Error(`next build failed with exit code ${result.status}`)
  }
} finally {
  // Always attempt to restore Babel config
  if (babelTemporarilyMoved && fs.existsSync(babelrcBackupPath)) {
    try { fs.renameSync(babelrcBackupPath, babelrcPath) } catch {}
  }
}


