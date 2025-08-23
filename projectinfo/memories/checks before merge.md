8) Must-have checks before merge

**Core Quality Checks:**
npm run type-check:strict passes.
npm run lint passes (no disabled rules added).
npm run build passes.

**Health & Smoke Tests:**
npm run smoke:all passes (agent:status + health:check + console:check:sandbox).
Local smoke (sandbox prod on :3001): / and /api/healthz return 200; logs show no Error/Unhandled/TypeError.

**Environment Validation:**
npm run dev:precheck --json passes (TypeScript + ESLint + optional build).
Ports 3000/3001 are free and accessible.
Manifest returns 200 status on both ports.

**Performance & Security:**
Web Vitals targets maintained (LCP < 2.5s, TBT < 300ms, CLS < 0.1).
No security regressions introduced.
No accessibility issues created.

**Error Handling:**
If any check fails, investigate root cause - never disable tests to pass.
Report exact error details with commands run and exit codes.
Retry failed installations once before reporting.
