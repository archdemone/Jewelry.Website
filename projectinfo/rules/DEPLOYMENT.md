# Deployment Guide

## Requirements
- Node.js **20 LTS**
- Prod DB (PostgreSQL recommended; local dev uses SQLite)
- Platform that supports Next.js (Vercel recommended)

## Environment
- **Do not commit production env files.** Set secrets in your hosting platform or GitHub Actions.
- Keep a tracked `.env.example` only.

### Minimum env (examples)
- `NEXTAUTH_SECRET`
- `DATABASE_URL` (Postgres in prod, SQLite in dev)
- `NEXTAUTH_URL` (platform URL)

## Vercel (recommended)
1) Connect the GitHub repo.
2) Set env vars in Vercel → Project Settings → Environment Variables.
3) Deploy (PR previews auto; Production on merge to `main`).

## Docker (optional)
```bash
docker build -t jewelry .
docker run -p 4000:3000 --env-file .env.production -e NODE_ENV=production jewelry
