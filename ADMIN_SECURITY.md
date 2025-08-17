# Admin Security Verification Guide

This document summarizes the admin hardening and how to verify locally.

## What was added
- RBAC: `User.role` enforced; ADMIN/STAFF only.
- Admin gating: `/admin` guarded server-side and via middleware. Non-admin → 302 to `/auth/login`.
- Robots noindex: `/admin` and children are noindex via page metadata; `robots.ts` also disallows `/admin/`.
- NextAuth hardened: secure httpOnly cookies, sameSite=strict, 8h rolling sessions, rate-limited auth, optional CAPTCHA after failed attempts.
- MFA scaffold (TOTP): enroll at `/admin/mfa/enroll`, verify at `/admin/mfa/verify`, cookie `mfa_verified` marks verified session. `ADMIN_MFA_REQUIRED=true` enforces MFA for admins.
- Rate limiting: reusable limiter applied to `/api/auth/*` and `/api/contact`. Exponential backoff and proper `Retry-After` on 429.
- Security headers and HTTPS: HSTS in prod, CSP with report-only toggle and optional `report-uri`, HTTPS redirect for GET/HEAD.
- Server-side authorization helpers: `requireAdmin()` for RSC/pages, `requireAdminApi()` for route handlers.
- Audit logging: `AuditLog` model and `audit()` util; `/admin/audit` page to view logs.
- Secure image upload endpoint: `POST /api/upload` accepts only images, sniffs magic bytes, resizes/strips via sharp, generates WebP/AVIF, random filenames, rejects risky names.
- CORS: Default policy is same-origin; for any public API that needs cross-origin, use an allowlist via `IP_ALLOWLIST` or implement per-route checks.
- CI: adds admin smoke check, npm audit, build/start/smoke, artifacts on failure.

## Environment
Copy `.env.example` to `.env.local` and set secrets:
- `NEXTAUTH_SECRET` – random string
- `ADMIN_MFA_REQUIRED=true`
- Optional Turnstile CAPTCHA:
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
  - `TURNSTILE_SECRET_KEY`

## Database
Run migrations (sqlite):
```
npx prisma migrate dev
```
Seed (optional):
```
npm run seed
```
Create an admin user manually if needed:
```
# Use Prisma Studio or a script; set user.role = 'ADMIN'
```

## Verifications
- Non-admin to /admin:
  - Visit `/admin` while signed out → 302 to `/auth/login`.
  - Sign in as non-admin → `/admin` redirects to `/auth/login`.
- Admin MFA flow (with `ADMIN_MFA_REQUIRED=true`):
  - Sign in as `ADMIN` without MFA → redirect to `/admin/mfa/enroll`.
  - Visit `/admin/mfa/enroll`, scan QR in Authy/1Password/Google Authenticator.
  - Go to `/admin/mfa/verify`, enter 6-digit code → sets `mfa_verified` cookie; accessing `/admin` now allowed.
- Rate limiting and CAPTCHA:
  - Repeatedly attempt failed logins above `LOGIN_MAX_FAILS` → Credentials auth requires a valid Turnstile token if keys are configured.
  - `/api/contact` obeys 429 with `Retry-After` after exceeding `RATE_LIMIT_MAX` within window; backoff delays apply after `slowdownAfter`.
- Headers and HTTPS:
  - In prod, responses include HSTS; CSP header is present (or Report-Only if `CSP_REPORT_ONLY=true`).
  - Middleware redirects to HTTPS for GET/HEAD when `FORCE_HTTPS=true`.
  - Middleware excludes `/_next/static`, `/_next/image`, `favicon.ico`, `robots.txt`, `sitemap.xml`.
- Admin API auth:
  - `POST /api/upload` without admin → 403 JSON. With admin + MFA verified → 200 JSON with variants.
- Audit logs:
  - Sensitive actions can call `audit()`; visit `/admin/audit` to view paginated logs.
- CI:
  - `tools/smoke.mjs` checks `/api/healthz` and `/admin` redirect; CI runs `npm audit --production` and builds/starts/smokes.

## Notes
- If deploying behind a proxy/CDN, ensure `x-forwarded-for` and `x-forwarded-proto` are set.
- For persistent rate limiting and failed login tracking, use Redis or similar in production.
- For S3 uploads, set `UPLOADS_DEST=s3` and wire storage (scaffold left local by default).