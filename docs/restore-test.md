# Restore Test Checklist

1. Provision a throwaway database instance
2. Restore latest production backup to this instance
3. Run migrations: `npx prisma migrate deploy`
4. Run smoke tests against a staging app pointed at the restored DB
5. Verify critical pages and admin access
6. Document duration and any issues found