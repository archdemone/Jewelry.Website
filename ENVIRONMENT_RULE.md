# 🚨 CRITICAL ENVIRONMENT RULE

## **ALWAYS TEST BOTH ENVIRONMENTS BEFORE COMMITTING**

### **The Problem:**
- Local: `NODE_ENV=development` (default)
- CI: `NODE_ENV=production` (build/lint) + `NODE_ENV=test` (tests)
- **Result**: Works locally, fails in CI

### **The Solution:**
**Before committing ANY workflow changes, run:**

```bash
# Quick test
npm run env:consistency

# Or manual test
npm run env:validate
```

### **What This Tests:**
1. ✅ Lint with `NODE_ENV=production`
2. ✅ Type check with `NODE_ENV=production`  
3. ✅ Tests with `NODE_ENV=test`
4. ✅ Build with `NODE_ENV=production`
5. ✅ Accessibility tests with `NODE_ENV=test`

### **Memory Rule:**
**NEVER assume local environment matches CI. ALWAYS test with CI environment variables before committing workflow changes.**

### **Quick Commands:**
```bash
# Test everything
npm run env:consistency

# Test individual steps
npm run lint:ci      # Production environment
npm run test:ci      # Test environment  
npm run build:ci     # Production environment
```

---
**This rule prevents 90% of CI/CD issues!** 🎯
