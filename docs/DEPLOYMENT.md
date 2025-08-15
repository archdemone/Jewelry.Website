# Deployment Guide

## Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Redis (optional but recommended)
- Domain name configured
- SSL certificate

## Environment Setup

1. Clone the repository
2. Copy `.env.production` to `.env.production.local`
3. Fill in all environment variables
4. Generate secure secrets:
   ```bash
   openssl rand -base64 32  # For NEXTAUTH_SECRET
   ```

## Database Setup

1. Create production database:
   ```sql
   CREATE DATABASE jewelry_prod;
   CREATE USER jewelry_user WITH ENCRYPTED PASSWORD 'your-password';
   GRANT ALL PRIVILEGES ON DATABASE jewelry_prod TO jewelry_user;
   ```

2. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

3. Seed initial data:
   ```bash
   node scripts/seed-prod.js
   ```

## Deployment Options

### Option 1: Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with: `vercel --prod`

### Option 2: Docker
1. Build image: `docker build -t jewelry-store .`
2. Run: `docker-compose up -d`

### Option 3: Traditional VPS
1. Install Node.js and PM2
2. Build: `npm run build`
3. Start: `pm2 start npm --name "jewelry-store" -- start`

## Post-Deployment Checklist

- [ ] Verify all environment variables
- [ ] Test health check endpoint
- [ ] Configure DNS records
- [ ] Set up SSL certificate
- [ ] Enable CDN (CloudFlare)
- [ ] Configure backups
- [ ] Set up monitoring alerts
- [ ] Test payment processing
- [ ] Verify email sending
- [ ] Check SEO tags
- [ ] Submit sitemap to Google
- [ ] Configure analytics
- [ ] Test on real devices
- [ ] Load test the application
- [ ] Set up error tracking

## Monitoring

- Health Check: https://yourstore.com/api/health
- Sentry: https://sentry.io/organizations/your-org
- Analytics: https://analytics.google.com
- Uptime: Configure with UptimeRobot or similar

## Rollback Procedure

1. Revert to previous deployment in Vercel
2. Or: `git revert HEAD && git push`
3. Restore database backup if needed

## Support

- Technical issues: tech@yourstore.com
- Emergency: +1-xxx-xxx-xxxx

## Final Production Checklist

### Infrastructure
- [ ] Production database configured
- [ ] Redis cache set up
- [ ] CDN configured
- [ ] SSL certificates installed
- [ ] Domain DNS configured

### Security
- [ ] All secrets in environment variables
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] HTTPS enforced
- [ ] Admin access restricted

### Performance
- [ ] Images optimized
- [ ] Code minified
- [ ] Caching configured
- [ ] Database indexed
- [ ] CDN enabled

### Monitoring
- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics)
- [ ] Uptime monitoring
- [ ] Performance monitoring
- [ ] Log aggregation

### Business
- [ ] Payment processing live
- [ ] Email service configured
- [ ] Backup system running
- [ ] Support system ready
- [ ] Legal pages updated

### SEO
- [ ] Sitemap submitted
- [ ] Robots.txt configured
- [ ] Meta tags optimized
- [ ] Schema markup added
- [ ] Google Search Console verified

## After Completion

1. Final Testing:
   - Complete purchase with real payment
   - Test all critical paths
   - Verify emails sending
   - Check mobile experience

2. Go-Live Steps:
   - Deploy to production
   - Update DNS records
   - Verify SSL certificate
   - Test production site
   - Monitor first 24 hours

3. Documentation:
   - Update all documentation
   - Create operation manual
   - Document known issues
   - Create support guides

4. Team Preparation:
   - Train support team
   - Prepare launch announcement
   - Set up monitoring alerts
   - Create escalation procedures

> Remember to update `DEVELOPMENT_CHECKLIST.md` marking Phase 14 complete.

> Note: `prisma/schema.prisma` uses SQLite for local dev. In production, set `DATABASE_URL` to PostgreSQL. Prisma will target the runtime database from env.

## Commands Reference

```bash
npm run migrate:prod    # Run production migration indexes/extensions
npm run seed:prod       # Seed admin and essential categories
npm run backup:db       # Run database backup
npm run health          # Check /api/health
```

### Vercel Configuration
- `vercel.json` sets build, install, and headers
- Configure `DATABASE_URL`, `NEXTAUTH_SECRET`, `STRIPE_SECRET_KEY` in Vercel project settings (Encrypted envs)

> Seeder: Set `ADMIN_PASSWORD` in environment before running `npm run seed:prod`.