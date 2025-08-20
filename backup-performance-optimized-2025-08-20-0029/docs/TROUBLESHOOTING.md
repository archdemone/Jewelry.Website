# Troubleshooting

## Build Failures

- Ensure `DATABASE_URL` is set for Prisma generate
- Clear `.next/` and rebuild: `rm -rf .next && npm run build`

## Database Connection Errors

- Verify Postgres is reachable and credentials are correct
- Check `DIRECT_URL` and `DATABASE_URL`
- Ensure SSL settings if required by provider

## Stripe Errors

- Confirm live keys in production
- Webhook secret matches deployed webhook
- Test a $1 payment

## Emails Not Sending

- Verify SMTP credentials
- Check `EMAIL_FROM` domain verification (SendGrid/Resend)

## 500 Errors

- Check logs (Vercel, Docker logs, PM2)
- Inspect Sentry traces

## Images Not Loading

- Verify allowed image domains in `next.config.js`
- CDN configuration and cache invalidation
