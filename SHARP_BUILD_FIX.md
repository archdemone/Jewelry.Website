# Sharp Build Issue Fix Documentation

## Problem Analysis

### What Happened
The GitHub Actions CI build was failing with the error:
```
Error: Could not load the "sharp" module using the linux-x64 runtime
```

### Root Cause
1. **Platform-specific binaries**: Sharp is a native dependency that requires platform-specific binaries
2. **Build-time evaluation**: Next.js was trying to evaluate sharp during build time when collecting page data
3. **CI vs Local differences**: 
   - Local environment (Windows) had Windows-specific sharp binaries
   - GitHub Actions (Linux) needed Linux-specific sharp binaries
   - The conditional import using `require()` still triggered build-time evaluation

### Why It Was Missed Locally
1. **Platform compatibility**: Local machine had the correct sharp binaries for the OS
2. **Build environment differences**: Local builds might not trigger the same code paths as CI
3. **Dependency installation**: Local `npm install` includes optional dependencies by default

## Solution Implemented

### 1. Dynamic Import Pattern
**File**: `src/app/api/upload/route.ts`

**Before**:
```typescript
let sharp: any;
try {
  sharp = require('sharp');
} catch (error) {
  sharp = null;
}
```

**After**:
```typescript
async function getSharp() {
  try {
    const sharpModule = await import('sharp');
    return sharpModule.default;
  } catch (error) {
    console.warn('Sharp not available:', error);
    return null;
  }
}

// Usage in POST handler:
const sharp = await getSharp();
```

**Benefits**:
- Completely avoids build-time evaluation
- Only loads sharp when the API route is actually called
- Graceful fallback if sharp is unavailable

### 2. CI Workflow Enhancement
**File**: `.github/workflows/error-monitoring.yml`

Added explicit sharp installation step:
```yaml
- name: Install sharp with optional dependencies
  run: npm install --include=optional sharp
```

**Benefits**:
- Ensures Linux-specific sharp binaries are installed in CI
- Explicit handling of optional dependencies

### 3. Package.json Postinstall Script
**File**: `package.json`

Added postinstall script:
```json
"postinstall": "npm install --include=optional sharp"
```

**Benefits**:
- Automatically ensures sharp is properly installed across all environments
- Handles platform-specific binaries during installation

### 4. Webpack Configuration
**File**: `next.config.js`

Added sharp as external dependency:
```javascript
if (isServer) {
  config.externals = config.externals || [];
  config.externals.push({
    sharp: 'commonjs sharp',
  });
}
```

**Benefits**:
- Prevents webpack from trying to bundle sharp during build
- Ensures sharp is treated as a runtime dependency only

## Long-term Prevention Strategies

### 1. Development Environment Setup
```bash
# Always install with optional dependencies
npm install --include=optional

# Or add to your setup scripts
npm run postinstall
```

### 2. CI/CD Best Practices
- Always include optional dependencies in CI
- Use platform-specific installation when needed
- Test builds on multiple platforms

### 3. Code Patterns for Native Dependencies
```typescript
// ✅ Good: Dynamic import
async function getNativeModule() {
  try {
    const module = await import('native-module');
    return module.default;
  } catch (error) {
    console.warn('Native module not available:', error);
    return null;
  }
}

// ❌ Bad: Static require
const module = require('native-module');
```

### 4. Testing Strategy
```bash
# Test on different platforms
npm run test:workflows:local  # Test workflows locally
act push                      # Test GitHub Actions locally

# Test build process
npm run build                 # Local build
npm run test:ci-flow         # CI simulation
```

## Monitoring and Alerts

### 1. Build Health Checks
- Monitor build success rates across different platforms
- Set up alerts for build failures
- Track dependency installation issues

### 2. Runtime Monitoring
```typescript
// Add health checks for native dependencies
async function checkSharpAvailability() {
  try {
    const sharp = await import('sharp');
    return { available: true, version: sharp.default.versions };
  } catch (error) {
    return { available: false, error: error.message };
  }
}
```

### 3. Documentation
- Keep this document updated with any new native dependencies
- Document platform-specific requirements
- Maintain troubleshooting guides

## Related Files Modified

1. `src/app/api/upload/route.ts` - Dynamic import pattern
2. `.github/workflows/error-monitoring.yml` - CI enhancement
3. `package.json` - Postinstall script
4. `next.config.js` - Webpack configuration
5. `SHARP_BUILD_FIX.md` - This documentation

## Future Considerations

### 1. Alternative Image Processing
Consider alternatives to sharp for simpler use cases:
- `jimp` - Pure JavaScript image processing
- `canvas` - Node.js canvas implementation
- Cloud-based image processing services

### 2. Docker Strategy
If using Docker, ensure proper platform-specific builds:
```dockerfile
# Multi-stage build with platform-specific sharp
FROM node:20-alpine AS builder
RUN apk add --no-cache python3 make g++
COPY package*.json ./
RUN npm ci --include=optional
```

### 3. Dependency Management
- Regular audits of native dependencies
- Version pinning for stability
- Automated testing across platforms

## Conclusion

This fix addresses the immediate build issue while implementing long-term strategies to prevent similar problems. The key is understanding that native dependencies require special handling in cross-platform environments and CI/CD pipelines.

The solution ensures:
- ✅ Builds work across all platforms
- ✅ Runtime functionality is preserved
- ✅ Graceful degradation when dependencies are unavailable
- ✅ Future-proof patterns for similar issues