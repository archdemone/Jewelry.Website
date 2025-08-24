# Prisma Build Issues and Fixes

## Problem Description

The GitHub Actions workflow was failing with the error:
```
Module not found: Can't resolve '.prisma/client/index-browser'
```

This error occurs when:
1. Prisma client is not properly generated before the build
2. Prisma client is being imported on the client-side (browser)
3. Dependencies are not properly installed in CI

## Root Causes

### 1. Missing Prisma Client Generation
- The workflow had `continue-on-error: true` for Prisma generation
- No verification that the client was actually generated
- Missing DATABASE_URL environment variable

### 2. Client-Side Prisma Imports
- Prisma client was being bundled for the browser
- No webpack configuration to prevent client-side imports
- Missing server-side guards in database files

### 3. Dependency Installation Issues
- Using `--ignore-scripts` prevented proper installation
- No verification of installed dependencies

## Solutions Implemented

### 1. Enhanced GitHub Workflow (.github/workflows/performance.yml)

```yaml
- name: Install dependencies
  run: npm ci --legacy-peer-deps

- name: Generate Prisma client
  run: npx prisma generate
  env:
    DATABASE_URL: "file:./dev.db"

- name: Verify Prisma client generation
  run: npm run debug:prisma
```

### 2. Updated Next.js Configuration (next.config.js)

Added webpack aliases to prevent client-side Prisma imports:
```javascript
// Ensure Prisma client is only used on server-side
if (!isServer) {
  config.resolve.alias['@prisma/client'] = false;
  config.resolve.alias['prisma'] = false;
}
```

### 3. Enhanced Database Connection (src/lib/db.ts)

- Added error handling for CI environments
- Added server-side guards
- Mock client fallback for CI

### 4. Server-Side Guards (src/lib/queries.ts)

Added runtime checks to prevent client-side usage:
```javascript
if (typeof window !== 'undefined') {
  throw new Error('Database queries cannot be used on the client side');
}
```

### 5. Prebuild Script (package.json)

Updated to ensure Prisma client generation:
```json
"prebuild": "echo 'Running build with type checking and linting enabled' && npx prisma generate"
```

### 6. Debug Script (scripts/debug-prisma.js)

Created a comprehensive debugging script to verify Prisma client generation.

## Prevention Strategies

### 1. Always Generate Prisma Client
- Run `npx prisma generate` before builds
- Verify client generation with debug script
- Set proper DATABASE_URL environment variable

### 2. Prevent Client-Side Imports
- Use webpack aliases to block client-side imports
- Add runtime guards in database files
- Keep database logic in server components only

### 3. Proper CI Setup
- Install dependencies without `--ignore-scripts`
- Verify all required files exist before building
- Use proper environment variables

### 4. Error Handling
- Graceful fallbacks for CI environments
- Mock clients when database is unavailable
- Clear error messages for debugging

## Testing the Fixes

1. **Local Testing**:
   ```bash
   npm run debug:prisma
   npm run build
   ```

2. **CI Testing**:
   - Push changes to trigger GitHub Actions
   - Check workflow logs for Prisma generation
   - Verify build succeeds

3. **Client-Side Protection**:
   - Try importing database files in client components
   - Should see clear error messages

## Common Issues and Solutions

### Issue: "Module not found: Can't resolve '.prisma/client/index-browser'"
**Solution**: Ensure Prisma client is generated and not imported on client-side

### Issue: "Prisma client not generated"
**Solution**: Run `npx prisma generate` with proper DATABASE_URL

### Issue: "Database queries cannot be used on the client side"
**Solution**: Move database logic to server components or API routes

### Issue: Build fails in CI
**Solution**: Check dependency installation and Prisma generation steps

## Best Practices

1. **Always generate Prisma client** before building
2. **Keep database logic server-side** only
3. **Use API routes** for client-side data fetching
4. **Add proper error handling** for CI environments
5. **Verify dependencies** are properly installed
6. **Test builds locally** before pushing to CI

## Monitoring

- Check GitHub Actions logs for Prisma generation
- Monitor build times and success rates
- Use debug script to verify client generation
- Review error messages for client-side import attempts