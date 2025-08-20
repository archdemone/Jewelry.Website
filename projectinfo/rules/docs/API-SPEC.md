# API Spec (Next.js App Router)

## Auth model
- Browser/API calls rely on **NextAuth session cookies** (server: `getServerSession`).
- Admin-only endpoints require `role=ADMIN` (MFA if `ADMIN_MFA_REQUIRED=true`).

## Stable endpoints
### GET /api/healthz
- **200 OK** when server is healthy.
- No auth. Used by CI and uptime checks.

### POST /api/contact
- Accepts JSON `{ name, email, message }`.
- Validates input and rate-limits. Returns `400` on invalid, `429` when limited.
- No auth required.

### POST /api/upload  *(admin only)*
- Accepts image; validates magic bytes; creates WebP/AVIF variants.
- Requires admin session; returns `403` if unauthorized.

## Errors
- `400` invalid • `401` unauthenticated • `403` unauthorized • `404` not found • `405` method not allowed • `429` rate limited • `5xx` server error.

## Notes
- Use `credentials: 'include'` on browser fetch so cookies are sent.
- Server code must call `getServerSession()` + role checks before privileged actions.
