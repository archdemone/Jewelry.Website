# Deployment Guide

## Requirements
- Node.js **20 LTS**
- Host that supports Next.js (Vercel recommended)
- Prod DB (PostgreSQL recommended; local dev uses SQLite/Prisma)

## Environments & Secrets
- Do **not** commit prod env files.
- Keep `.env.example` in Git; set secrets in your hosting platform or GitHub Actions.

### Minimum env (examples)
- `NEXTAUTH_SECRET`
- `DATABASE_URL` (Postgres in prod; SQLite for dev)
- `NEXTAUTH_URL` (your site URL)

## Vercel (recommended)
1) Connect GitHub repo
2) Set env vars in Project Settings
3) Merge to `main` → Production deploy (PRs get previews)

## Docker (optional)
```bash
docker build -t jewelry .
docker run -p 4000:3000 --env-file .env.production -e NODE_ENV=production jewelry
```

## Traditional server (self-hosted)
```bash
npm ci
npm run build
npm run start   # next start -p <port>
```

## Database migrations
- Prod: `npx prisma migrate deploy` during deploy step.

## Post-deploy smoke
- GET `/api/healthz` → **200**
- `/` renders; logs show no `Error/Unhandled/TypeError`.

## Rollback
- Vercel: revert to previous deployment
- Docker/VM: redeploy previous image/artifact (tagged release)
