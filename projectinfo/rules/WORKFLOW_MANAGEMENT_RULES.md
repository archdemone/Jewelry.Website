# 🔄 Workflow Management Rules

## 🚨 CRITICAL RULE: Always Update Both Local and CI Environments

### **The Problem We Encountered:**
- **Local Environment**: `NODE_ENV=development` (default)
- **CI Environment**: `NODE_ENV=production` (explicitly set)
- **Result**: Tests passed locally but failed in CI with `"act() is not supported in production builds of React"`

### **Root Cause:**
Environment mismatches between local development and CI environments can cause:
- Different React behavior (production vs development builds)
- Missing testing utilities in production mode
- Inconsistent test results
- CI failures that don't reproduce locally

## 📋 **Mandatory Workflow Management Rules**

### **1. Environment Consistency**
- ✅ **Always test with CI environment variables locally**
- ✅ **Use `NODE_ENV=test` for test steps in CI**
- ✅ **Use `NODE_ENV=production` for build and lint steps**
- ❌ **Never assume local environment matches CI**

### **2. Workflow Testing Process**

#### **Enhanced Local Testing (Recommended)**
```bash
# Run all workflow tests locally (bypasses Docker issues)
npm run test:workflows:local

# Run individual test components
npm run test:workflows:core      # Type check, lint, unit tests, build
npm run test:workflows:e2e       # E2E tests with local server
npm run test:workflows:perf      # Performance tests with Lighthouse
```

#### **Manual Environment Testing**
```bash
# Test locally with CI environment
$env:NODE_ENV="production"; npm run lint
$env:NODE_ENV="test"; npm run test
$env:NODE_ENV="production"; npm run build
```

### **3. Before Committing Workflow Changes**
1. **Run enhanced local tests**: `npm run test:workflows:local`
2. **Test locally with CI environment variables**
3. **Verify all steps work in both environments**
4. **Document any environment-specific behavior**
5. **Update this document if new patterns emerge**

### **4. Common Environment Variables to Test**
- `NODE_ENV` (development/test/production)
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`

## 🔧 **Current CI Environment Configuration**

### **Lint Step:**
```yaml
env:
  NODE_ENV: production  # ✅ Correct for linting
```

### **Build Step:**
```yaml
env:
  NODE_ENV: production  # ✅ Correct for building
```

### **Test Step:**
```yaml
env:
  NODE_ENV: test  # ✅ Correct for testing (allows React act())
```

## 🚀 **Best Practices**

### **1. Environment-Specific Testing**
```bash
# PowerShell (Windows)
$env:NODE_ENV="production"; npm run lint
$env:NODE_ENV="test"; npm run test

# Bash (Linux/Mac)
NODE_ENV=production npm run lint
NODE_ENV=test npm run test
```

### **2. Workflow Validation Checklist**
- [ ] Enhanced local tests pass: `npm run test:workflows:local`
- [ ] Lint passes with `NODE_ENV=production`
- [ ] Tests pass with `NODE_ENV=test`
- [ ] Build succeeds with `NODE_ENV=production`
- [ ] E2E tests work with local server
- [ ] Performance tests show acceptable scores
- [ ] All environment variables are properly set
- [ ] No hardcoded environment assumptions

### **3. Documentation Requirements**
- Document any environment-specific behavior
- Update this file when adding new environment variables
- Note any differences between local and CI environments

## ⚠️ **Common Pitfalls to Avoid**

1. **Assuming local environment matches CI**
2. **Not testing with production environment locally**
3. **Using development-only features in CI**
4. **Forgetting to test all workflow steps**
5. **Not documenting environment requirements**

## 📝 **Memory Rule for AI Assistant**

**ALWAYS test workflow changes with the enhanced local testing system (`npm run test:workflows:local`) before committing. This system bypasses Docker authentication issues and provides real CI/CD validation locally. Never assume the local development environment matches the CI environment. Use `NODE_ENV=test` for tests and `NODE_ENV=production` for builds/linting in CI.**

**The enhanced local testing system catches real issues like missing UI elements ("Collections" text), console errors, and performance problems that would fail in CI.**
