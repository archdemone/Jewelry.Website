# Enhanced Local Workflow Testing System

## Overview

This project uses a comprehensive local testing system that simulates GitHub Actions workflows without requiring Docker authentication, providing real CI/CD validation locally.

## Primary Testing Commands

### Full Workflow Testing
```bash
# Run all workflow tests locally (recommended)
npm run test:workflows:local
```

### Individual Test Components
```bash
# Core CI tests (no server required)
npm run test:workflows:core

# E2E tests with local server
npm run test:workflows:e2e

# Performance tests with Lighthouse
npm run test:workflows:perf
```

## What Gets Tested

### ✅ Core CI Tests (Always Run)
- **Type Check**: TypeScript compilation with CI-safe settings
- **Lint**: ESLint with zero warnings allowed
- **Unit Tests**: Jest tests with coverage
- **Build**: Production build with optimizations
- **Size Limit**: Bundle size validation

### 🌐 E2E Tests (Local Server)
- **Server Startup**: Starts actual Next.js production server
- **Real Browser Testing**: Playwright tests against live server
- **User Journeys**: Complete checkout flows, navigation
- **Console Error Detection**: Catches JavaScript errors
- **Cross-browser**: Tests in multiple browsers

### 📊 Performance Tests (Local Server)
- **Lighthouse Audits**: Real performance scoring
- **Core Web Vitals**: LCP, FID, CLS measurements
- **Bundle Analysis**: JavaScript/CSS optimization checks
- **Performance Score**: 0-100 rating with detailed breakdown

## Test Results Interpretation

```
✅ PASS Type Check
✅ PASS Lint
✅ PASS Unit Tests
✅ PASS Build
✅ PASS Size Limit
❌ FAIL E2E Tests          # Real issues found!
✅ PASS Performance Tests  # 100/100 score!

Results: 6/7 tests passed
```

## Benefits Over Docker/act

1. **No Authentication Issues**: Bypasses Docker registry problems
2. **Real Server Testing**: Tests against actual production build
3. **Fast Feedback**: Immediate results on local changes
4. **Comprehensive Coverage**: Tests everything CI would test
5. **Performance Validation**: Real Lighthouse scores
6. **Debugging Friendly**: Can inspect server logs and browser

## Troubleshooting

### E2E Test Failures
- Check server startup logs in test output
- Verify homepage elements exist ("Collections" text, etc.)
- Review console errors in browser
- Check network connectivity to localhost:3000

### Performance Issues
- Review Lighthouse HTML report: `lighthouse-report.report.html`
- Check bundle sizes and optimization
- Verify image optimization settings

### Server Startup Issues
- Ensure port 3000 is free: `npx kill-port 3000`
- Check environment variables in test script
- Verify Next.js build completed successfully

## Integration with CI/CD

The local tests mirror GitHub Actions workflows:
- **CI and Deploy**: Core tests + build validation
- **UI PR Checks**: E2E testing with real server
- **Performance**: Lighthouse audits and bundle analysis

## Development Workflow

1. **Make Changes**: Edit code, components, etc.
2. **Run Local Tests**: `npm run test:workflows:local`
3. **Fix Issues**: Address any failures found
4. **Commit & Push**: Changes are CI-ready
5. **Monitor GitHub Actions**: Should pass with same fixes

## Key Files

- `scripts/test-workflows-local.js` - Main comprehensive test runner
- `scripts/test-workflows-core.js` - Core CI tests only
- `scripts/test-workflows-e2e.js` - E2E tests with server
- `scripts/test-workflows-perf.js` - Performance tests with Lighthouse
- `README.md` - Comprehensive documentation

## When to Use

### Use Enhanced Local Testing When:
- You want to test changes before pushing to GitHub
- Docker authentication issues prevent `act` from working
- You need real server testing for E2E validation
- You want performance validation with Lighthouse
- You need fast feedback on local changes

### Use Docker/act When:
- You want to test exact GitHub Actions environment
- Docker authentication is working properly
- You need to test workflow-specific configurations

## Common Issues and Solutions

### "Collections" Text Missing
- Check homepage component for proper text rendering
- Verify component is properly exported and imported
- Check for conditional rendering that might hide the text

### Console Errors
- Review browser console for JavaScript errors
- Check for missing dependencies or imports
- Verify API endpoints are working correctly

### Server Connection Issues
- Ensure port 3000 is not in use
- Check firewall settings
- Verify Next.js build completed successfully

### Performance Score Low
- Review Lighthouse report for specific issues
- Check image optimization settings
- Verify bundle sizes are within limits
- Review Core Web Vitals metrics

This system ensures your local development environment catches the same issues that would fail in CI, providing confidence that your changes will deploy successfully.
