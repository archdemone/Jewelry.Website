/*
 Cross-platform CI build: run a production build with database setup
*/
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const projectRoot = path.resolve(__dirname, '..')

try {

  // Ensure Prisma client is generated and database is ready for pages relying on data
  const prismaGen = spawnSync('npx --no-install prisma generate', { stdio: 'inherit', cwd: projectRoot, env: process.env, shell: true })
  if (prismaGen.status !== 0) {
    console.warn(`[ci-build] prisma generate returned code ${prismaGen.status}, continuing if client already exists`)
  }
  // Apply migrations (or create schema) non-interactively
  const prismaMigrate = spawnSync('npx --no-install prisma migrate deploy', { stdio: 'inherit', cwd: projectRoot, env: process.env, shell: true })
  if (prismaMigrate.status !== 0) {
    console.warn('[ci-build] prisma migrate deploy failed')
  }
  // Always ensure schema is fully in sync with the current Prisma schema (covers cases where migrations lag behind)
  const prismaPush = spawnSync('npx --no-install prisma db push', { stdio: 'inherit', cwd: projectRoot, env: process.env, shell: true })
  if (prismaPush.status !== 0) {
    console.warn(`[ci-build] prisma db push failed with code ${prismaPush.status}`)
  }
  // Seed minimal data for E2E flows
  const seed = spawnSync('npm run -s seed', { stdio: 'inherit', cwd: projectRoot, env: process.env, shell: true })
  if (seed.status !== 0) {
    console.warn(`[ci-build] seed failed with code ${seed.status}, continuing`)
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
}


