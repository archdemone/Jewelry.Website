# Prisma Troubleshooting Guide

## Common Issues and Solutions

### 1. TypeScript Error: "Module '@prisma/client' has no exported member 'PrismaClient'"

**Symptoms:**
```
prisma/seed.ts:1:10 - error TS2305: Module '"@prisma/client"' has no exported member 'PrismaClient'.
```

**Cause:**
The Prisma client hasn't been generated. This happens when:
- `node_modules/.prisma/client/` directory is missing
- Prisma schema was modified but client wasn't regenerated
- CI environment has certificate issues preventing Prisma engine download

**Solutions:**

#### Local Development
```bash
# Generate Prisma client
npm run db:generate

# Or use the combined command
npm run type-check:with-prisma
```

#### CI/CD Environment
The GitHub Actions workflows have been updated to:
- Bypass certificate issues with `NODE_TLS_REJECT_UNAUTHORIZED=0`
- Include retry logic for Prisma generation
- Fail fast if Prisma generation fails

#### Manual Fix
```bash
# Remove existing client
rm -rf node_modules/.prisma

# Reinstall dependencies
npm ci --ignore-scripts

# Generate client with certificate bypass
NODE_TLS_REJECT_UNAUTHORIZED=0 npx prisma generate
```

### 2. Certificate Issues in CI

**Symptoms:**
```
Error: certificate is not yet valid
```

**Solution:**
Use the updated GitHub Actions workflows that include:
```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0
npx prisma generate
```

### 3. Prisma Client Not Found

**Symptoms:**
```
Cannot find module '@prisma/client'
```

**Solution:**
```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate
```

## Prevention Strategies

### 1. Pre-commit Hooks
Use the new script to ensure Prisma client is generated:
```bash
npm run type-check:with-prisma
```

### 2. CI/CD Best Practices
- Always generate Prisma client before type checking
- Use retry logic for network-dependent operations
- Set appropriate environment variables for CI

### 3. Development Workflow
1. Modify Prisma schema (`prisma/schema.prisma`)
2. Generate client: `npm run db:generate`
3. Run type check: `npm run type-check:strict`
4. Commit changes

## Environment Variables

For CI environments, ensure these are set:
```bash
DATABASE_URL=file:./prisma/dev.db
NEXTAUTH_SECRET=ci-secret-key
NEXTAUTH_URL=http://localhost:3000
NODE_TLS_REJECT_UNAUTHORIZED=0  # For certificate issues
```

## Related Files

- `prisma/schema.prisma` - Prisma schema definition
- `prisma/seed.ts` - Database seeding script
- `src/lib/db.ts` - Database client configuration
- `.github/workflows/ui-pr.yml` - UI PR workflow
- `.github/workflows/ci-and-deploy.yml` - Main CI workflow