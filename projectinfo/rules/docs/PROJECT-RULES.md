# Project Rules (Frontend • Backend • Workflow)

## Performance & Web Vitals
- Targets: **LCP < 2.5s**, **TBT < 300 ms**, **CLS < 0.1**, **FCP < 1.8s**.
- **Hero (LCP):** first slide is server-rendered and visible; `<Image priority sizes="100vw" ...>` with real dimensions; WebP/AVIF; ~≤ **200 KB**.  
  *Don’t add a duplicate `<link rel="preload">` if `priority` is set.*
- **JS/CSS:** lazy-load non-critical UI via `next/dynamic` (use `ssr:false` only when truly client-only). Keep critical CSS minimal; avoid layout shift.
- **3rd-party scripts:** `<Script strategy="afterInteractive">` for needed scripts; `lazyOnload` for analytics; avoid `beforeInteractive` unless essential.
- **Budgets (enforced via size-limit):** First Load JS ≤ **2000 kB** gzip; Vendor ≤ **1500 kB**; React ≤ **500 kB**; Common ≤ **300 kB**.

## Frontend Hygiene & A11y
- Only use "use client" when required. Prefer direct imports; keep any barrel files small (preserve tree-shaking).
- Reserve space for media/components; interactive controls have labels, roles, and focus styles.

## Backend/API
- Auth: NextAuth session cookies (`getServerSession`) and role checks (ADMIN routes).
- Caching: use `revalidate`/tags; be explicit (`cache: 'no-store'` or `force-cache`).
- Security: validate env at boot (fail fast), never expose secrets, secure cookies (`HttpOnly`, `Secure` in prod, `SameSite`).
- Headers: CSP / X-Frame-Options / X-Content-Type-Options via `next.config.js` or middleware.
- Compression: handled by platform/proxy (don’t re-implement in Next unless self-hosting raw Node).

## Service Workers & Assets
- **SW scoping:** Baseline uses `/sw.js` (port 3000), Sandbox uses `/sw-sandbox.js` (port 3001) with separate cache names. Never cache HTML as cache-first.
- Images: ensure `images.remotePatterns` matches sources; prefer `/public` or trusted domains.

## Environments & Secrets
- Local: `.env.local` in baseline; sandbox has its own env and runs with `SANDBOX=1`.
- CI/Prod: secrets stored in platform or GitHub Actions; `.env.production` not committed. Track **`.env.example`** only.

## Workflow (Local → CI → Prod)
- Local safe dev: `npm run dev:safe` (baseline prod + sandbox dev).
- Prod parity/perf: `npm run run:both`.
- Promotion: sandbox `npm run sandbox:patch` → main `npm run sandbox:apply` → commit (never copy files manually).
- Stop/Status: `npm run stop` / `npm run status`.

## Pre-merge checks (must pass)
- `npm run type-check:strict`, `npm run lint`, `npm run build`.
- Local sandbox **prod** smoke: `/` and `/api/healthz` return **200** and logs contain **no** `Error/Unhandled/TypeError`.
- Size-limits within budgets above.
