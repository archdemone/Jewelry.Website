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

## 🚨 **CRITICAL PORT MANAGEMENT**

### **Port Requirements:**
- **Fixed ports only**: Baseline :3000, Sandbox :3001 (no other ports)
- **Always free ports first**: `npm run kill-ports` before starting any servers
- **Check status**: Use `npm run status` to verify port availability
- **Never start hidden servers**: Use non-interactive commands only

### **Port Commands:**
```bash
# Free ports before starting
npm run kill-ports

# Check port status
npm run status

# Start with port management
npm run dev:safe
```

## 📱 **MANIFEST CONFIGURATION RULES**

### **Manifest Requirements:**
- **Use static manifest only**: `public/manifest.webmanifest` + `/public/icons/*.png`
- **Do NOT create**: `app/manifest.*` files
- **Keep in public directory**: All manifest configuration must be in public folder
- **Must return 200**: Manifest endpoint must be accessible for PWA functionality

### **Manifest Validation:**
```bash
# Check manifest status
npm run agent:status

# Verify manifest accessibility
curl http://localhost:3000/manifest.webmanifest
curl http://localhost:3001/manifest.webmanifest
```

## 🔧 **ENVIRONMENT VALIDATION**

### **Pre-Start Validation:**
```bash
# Free ports and validate environment
npm run kill-ports
npm run dev:precheck --json

# Start with validation
npm run dev:safe
```

### **Health Check Validation:**
```bash
# Comprehensive health check
npm run smoke:all

# Individual checks
npm run agent:status
npm run health:check
npm run console:check:sandbox
```

---

**This rule prevents 90% of CI/CD issues!** 🎯

**Remember: Ports must be free, manifest must be accessible, and environment must be validated before any development work.**
