2) Environments & secrets

<<<<<<< HEAD
**Local Environment:**
- .env.local in baseline; sandbox inherits its own env (set SANDBOX=1 when running)
- Ports: Baseline :3000, Sandbox :3001 (fixed, no other ports)
- Always free ports first: `npm run kill-ports`

**Manifest Configuration:**
- Use static `public/manifest.webmanifest` + `/public/icons/*.png` only
- Do NOT create `app/manifest.*` files
- Keep manifest configuration in public directory only
- Manifest must return 200 status for PWA functionality

**Future Live (production):**
- No .env.production committed. Store secrets in GitHub Actions Secrets (or your host's secret store)
- Validate env at boot (Zod or a tiny validator) and fail fast on missing vars

**Service worker:**
- Register prod SW only on baseline; use sandbox SW (different scope/cache) on :3001
- If things look stale, unregister all SWs and hard-reload

**Error Handling:**
- If sandbox install fails, sync package.json/lockfile from main
- Retry once, then report with exact error details
- Never disable tests to pass CI
=======
Local: .env.local in baseline; sandbox inherits its own env (set SANDBOX=1 when running).

Future Live (production):

No .env.production committed. Store secrets in GitHub Actions Secrets (or your host’s secret store).

Validate env at boot (Zod or a tiny validator) and fail fast on missing vars.

Service worker:

Register prod SW only on baseline; use sandbox SW (different scope/cache) on :3001.

If things look stale, unregister all SWs and hard-reload.
>>>>>>> 5fc3b20079238d8670d61bf90a7940c7b1f46d8f
