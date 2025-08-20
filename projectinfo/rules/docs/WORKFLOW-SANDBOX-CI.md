# Workflow — Sandbox, Local Dev, CI

## Local development (sandbox-first)
- **Edit only in sandbox**; baseline is read-only unless you “promote”.
- **Ports** fixed: baseline :3000, sandbox :3001. Always `npm run stop` first.

### Commands
- Start dev (baseline prod + sandbox hot reload): `npm run dev:safe`
- Start prod both (parity/perf): `npm run run:both`
- Sandbox only (dev): `npm run dev:sandbox`
- Stop servers: `npm run stop`
- Status: `npm run status`

### Promotion (no manual copying)
1) In sandbox: `npm run sandbox:patch`
2) In main: `npm run sandbox:apply`
3) Commit + push (or open PR)

## CI (GitHub Actions)
- Pipeline: `npm ci` → `type-check:strict` → `lint` → `build` → start on **:4000** → smoke `/:200` and `/api/healthz:200`.
- On failure: tail server log. See `.github/workflows/ci.yml`.

## Environment consistency (local vs CI)
- Reproduce CI locally with `NODE_ENV=production` for lint/build; `NODE_ENV=test` for tests (if enabled).
- If sandbox `npm ci` fails: sync `package.json` + `package-lock.json` from main, then retry.
