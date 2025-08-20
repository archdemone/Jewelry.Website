# API Documentation (App Router)

## Auth model
- Browser/API calls rely on **NextAuth session cookies** (server: `getServerSession`).
- Admin-only routes require `role=ADMIN` (and MFA if `ADMIN_MFA_REQUIRED=true`).

## Stable endpoints (today)
### GET /api/healthz
- **200 OK** when server is healthy.
- No auth. Used by CI and uptime checks.

### POST /api/contact
- Accepts JSON `{ name, email, message }`.
- **Validation + rate limiting**; returns `400` on invalid, `429` when limited.
- No auth required.

### POST /api/upload  *(admin only)*
- Accepts image file; validates magic bytes; creates WebP/AVIF variants.
- **Requires admin session** (and MFA if enforced). Returns `403` if unauthorized.

## Optional / planned endpoints
> Product/Cart/Order endpoints are implemented behind pages/components. If/when you expose public REST for these, document the contract here and add auth + rate limits.

## Errors
- `400` invalid input • `401` not authenticated • `403` not authorized  
- `404` not found • `405` method not allowed • `429` rate limit • `5xx` server error

## Notes
- Use `credentials: 'include'` for browser `fetch` so cookies are sent.
- Server code should call `getServerSession()` and role-check helpers.
