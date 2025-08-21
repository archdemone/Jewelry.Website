# Workflow Testing Rules & Protocol

## 🚨 **CRITICAL RULES (ALWAYS ENFORCED)**

### **1. NEVER Test Workflows with Local npm Commands**

**❌ FORBIDDEN:**
```bash
npm run type-check:ci
npm run lint:ci
npm run build
```

**✅ REQUIRED:**
```bash
npm run test:ci
npm run test:performance
npm run test:ui
npm run test:all
```

### **2. Always Test with `act` Before Pushing**

**MANDATORY SEQUENCE:**
1. **Make workflow changes**
2. **Test with `act`**: `npm run test:ci`
3. **If `act` passes** → Safe to push
4. **If `act` fails** → Fix locally until it passes
5. **Only then push to GitHub**

### **3. Failure Pattern Recognition**

**After 2+ workflow failures:**
- Stop suggesting "push fixes"
- Acknowledge systematic approach failure
- Suggest manual file replacement

**After 3+ failures:**
- Insist on manual file replacement
- Consider complete workflow rebuild
- Never suggest "just push the changes"

### **4. Environment Testing Protocol**

**ALWAYS test with:**
- `npm ci` (not `npm install`)
- Clean environment
- Production-like conditions
- Exact GitHub runner environment

## 🧪 **TESTING COMMANDS**

### **Primary Testing Commands**
```bash
# Test specific workflows
npm run test:ci              # CI and Deploy workflow
npm run test:performance     # Performance workflow  
npm run test:ui             # UI PR workflow

# Test all workflows
npm run test:all

# Debug workflows
npm run workflow:debug      # Verbose output
npm run workflow:list       # List available workflows
```

### **When to Use Each Command**

| Scenario | Command | Purpose |
|----------|---------|---------|
| **Making workflow changes** | `npm run test:ci` | Test CI workflow changes |
| **Performance testing** | `npm run test:performance` | Test performance workflow |
| **UI testing** | `npm run test:ui` | Test UI PR workflow |
| **Full validation** | `npm run test:all` | Test all workflows |
| **Debugging failures** | `npm run workflow:debug` | Get verbose output |
| **Setup verification** | `npm run workflow:list` | List available workflows |

## 🔧 **DEPENDENCY MANAGEMENT**

### **Build-Time Dependencies**
**MUST be in `dependencies` (not `devDependencies`):**
- `@next/bundle-analyzer` (required by next.config.js)
- Any package required at build time
- Any package used in production builds

### **Development-Only Dependencies**
**Can be in `devDependencies`:**
- Testing frameworks (Jest, Playwright)
- Linting tools (ESLint)
- Build tools (TypeScript)
- Development utilities

## 📋 **COMMUNICATION RULES**

### **When User Asks About File Differences**

**SAY:**
- "Let me test the workflows locally with `act` first"
- "The repeated failures indicate deeper issues"
- "Let's replace the GitHub files manually"

**NEVER SAY:**
- "The files are good, just push them"
- "Push and it will work"
- "The local files will fix GitHub issues"

### **When Workflows Fail Repeatedly**

**SAY:**
- "The repeated failures indicate systematic issues"
- "Let's replace the GitHub files manually"
- "We need a different approach"

**NEVER SAY:**
- "Just push the fixes"
- "The files are correct"
- "It will work after pushing"

## 🎯 **PREVENTION STRATEGIES**

### **1. Test Like GitHub Does**
- Use `npm ci` instead of `npm install`
- Test in clean environment
- Use exact GitHub runner conditions

### **2. Dependency Audit**
- Check package categories (dependencies vs devDependencies)
- Verify build-time requirements
- Test with production-like environment

### **3. Workflow Validation**
- Test workflows before making changes
- Test workflows after making changes
- Only push when `act` tests pass

### **4. Failure Analysis**
- Acknowledge failure patterns
- Suggest alternative approaches
- Never repeat failed strategies

## ✅ **SUCCESS CRITERIA**

### **Before Pushing Workflows:**
- [ ] `npm run test:ci` passes
- [ ] `npm run test:performance` passes (if applicable)
- [ ] `npm run test:ui` passes (if applicable)
- [ ] All dependencies in correct categories
- [ ] No build-time dependency issues
- [ ] Clean environment testing completed

### **After Pushing Workflows:**
- [ ] GitHub Actions pass
- [ ] No "works locally, fails on GitHub" issues
- [ ] All workflows green
- [ ] No dependency-related failures

---

**Remember: Always test with `act` before pushing workflow changes!**
