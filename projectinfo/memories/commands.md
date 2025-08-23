<<<<<<< HEAD
9) Fast commands you'll actually use

**Primary Commands:**
Start dev safe: npm run dev:safe
Start prod both: npm run run:both
Sandbox dev only: npm run dev:sandbox
Stop servers: npm run stop
Status: npm run status
Promote: npm run sandbox:patch → npm run sandbox:apply

**One-Shot Health Checks:**
smoke:all: npm run smoke:all (agent:status + health:check + console:check:sandbox)

**Individual Helper Commands:**
- `npm run agent:status` — Check 3000/3001 + manifest 200 status
- `npm run health:check` — Test /api/healthz on both ports (JSON output)
- `npm run console:check:sandbox` — Fails on console errors (Playwright-based)
- `npm run dev:precheck --json` — TypeScript + ESLint (+ optional build via :build)

**Fallback Commands (if dev:safe unavailable):**
- Baseline: `npm run build && npm run start`
- Sandbox: `PORT=3001 NEXT_DISABLE_TURBOPACK=1 npm run dev`

**Critical Requirements:**
- Always free ports first: `npm run kill-ports`
- Use non-interactive commands only
- Print exit codes for all commands
- Never start hidden extra servers/ports

=======
9\) Fast commands you’ll actually use



Start dev safe: npm run dev:safe



Start prod both: npm run run:both



Sandbox dev only: npm run dev:sandbox



Stop servers: npm run stop



Status: npm run status



Promote: npm run sandbox:patch → npm run sandbox:apply

>>>>>>> 5fc3b20079238d8670d61bf90a7940c7b1f46d8f
