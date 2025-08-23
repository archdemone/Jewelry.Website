6\) Backend \& data (Prisma)



Local: sandbox DB separate from baseline (e.g. file:./sandbox.db). Never point sandbox to prod.



Migrations:



Local dev: prisma migrate dev (sandbox only).



Promotion: create migration in sandbox, apply patch to main, run prisma migrate deploy in CI/live.



Health:



/api/healthz must return 200 quickly (DB optional).



Log structured JSON (pino) with level info in prod, debug in dev.

