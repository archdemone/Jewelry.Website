## Jewelry Website

Development setup:

- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Start: `npm start`
- Run unit tests: `npm test`
- Run E2E tests: `npm run test:e2e`

Environment:

- Copy `.env.local.example` to `.env.local` and fill values
- For local SQLite: no variables required
- For auth (local dev) add at minimum:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```


Tech stack: Next.js (App Router) + TypeScript + Tailwind CSS + ESLint + Prettier.

## Ops Notes

- Uptime checks:
  - Monitor `GET /api/healthz` and `GET /api/readyz` from at least 3 regions every 1 minute.
  - Expect 200 when healthy; 503 on readiness issues.
- Backups:
  - Daily database backups retained for 7 days (configure per environment). Store encrypted in cloud storage. Run a monthly restore test. See `docs/restore-test.md`.
- Alarms:
  - Alert on error rate: 5xx > 2% over 5 minutes, latency p95 > 1s, rate limit spikes. If using a CDN or APM, configure based on `/api/metrics` or platform metrics.
- Security:
  - Secrets are not committed. Copy `.env.example` to `.env.local` for development.


