# Platform Guardrails Summary

This PR adds reliability, security, performance, observability, ops, and CI guardrails for a Next.js-only stack (App Router). No custom Express server was detected.

## Key Features

- Health and readiness:
  - /api/healthz quick OK
  - /api/readyz DB-check with env toggle `READINESS_PROBE_SKIP_DB`
  - Correct status codes: 200 healthy, 503 not ready
- Metrics:
  - Prometheus metrics via `/api/metrics` using `prom-client` with default Node metrics, request counter and latency histogram
- Graceful shutdown:
  - `src/instrumentation.ts` installs SIGTERM/SIGINT handlers and disconnects Prisma
- Security headers & HTTPS:
  - `src/middleware.ts` adds CSP, security headers, optional HTTPS redirect (`FORCE_HTTPS=true`), HSTS in production
  - `next.config.js` ensures immutable caching for static assets and image formats
- Validation & rate limiting:
  - `src/lib/validate.ts` with `zod` schema and helpers
  - `src/lib/rateLimit.ts` lightweight in-memory limiter for App Router routes
  - Applied to `/api/contact` and `/api/auth/register`
- HTTP client:
  - `src/lib/httpClient.ts` wrapper with timeout and exponential backoff for idempotent GETs
- Logging:
  - `src/lib/logger.ts` pino logger, request-scoped child with `x-request-id`
- Feature flags:
  - `src/lib/flags.ts` env-based flags e.g. `USE_CANARY_ROLLOUT`
- Smoke tests:
  - `tools/smoke.mjs` fetches `/` and `/products` and asserts 200 and keyword
- Environment:
  - `.env.example` created with all variables
- DB/ops docs:
  - `docs/db-indexing-checklist.md`, `docs/restore-test.md`
- CDN caching notes:
  - See `src/lib/performance/README.md`. Static assets are immutable cached; HTML/API short TTL with must-revalidate. Prefer ISR where applicable.

## How to run locally

- Install: `npm ci`
- Build: `npm run build`
- Start: `PORT=3000 npm run start`
- Verify endpoints:
  - `curl -i http://localhost:3000/api/healthz`
  - `curl -i http://localhost:3000/api/readyz`
  - `curl -i http://localhost:3000/api/metrics`
- Simulate DB degraded:
  - `READINESS_PROBE_SKIP_DB=false` and temporarily break DB, or set to `true` to skip checks
- Graceful shutdown:
  - `kill -TERM <pid>` (or Ctrl+C). Server logs "received shutdown signal" and disconnects Prisma
- Smoke test:
  - With server running: `node tools/smoke.mjs`
- Image audit (already present):
  - `npm run audit:images`

## CI pipeline

- Lint, typecheck, migrate (SQLite), build, start server, wait-on, smoke tests
- Image audit and production dependency security audit
- Artifacts uploaded: tools outputs, build

## New ENV variables

- NODE_ENV, PORT, HOST, TRUST_PROXY, FORCE_HTTPS, CSP_DISABLE
- RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX
- READINESS_PROBE_SKIP_DB
- SENTRY_DSN / NEXT_PUBLIC_SENTRY_DSN (no-op if unset)
- USE_CANARY_ROLLOUT

## Notes

- Metrics in serverless environments may reset frequently; use a long-lived Node process for meaningful metrics.
- CSP can be disabled during dev with `CSP_DISABLE=true` if needed.
- Rate limiting is in-memory and per instance; switch to an external store for multi-instance deployments.