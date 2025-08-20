2) Environments & secrets

Local: .env.local in baseline; sandbox inherits its own env (set SANDBOX=1 when running).

Future Live (production):

No .env.production committed. Store secrets in GitHub Actions Secrets (or your host’s secret store).

Validate env at boot (Zod or a tiny validator) and fail fast on missing vars.

Service worker:

Register prod SW only on baseline; use sandbox SW (different scope/cache) on :3001.

If things look stale, unregister all SWs and hard-reload.