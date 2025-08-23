# Error Handling & Reporting Standards

## 🚨 Critical Error Handling Procedures

### **Sandbox Installation Failures**
If sandbox install fails:
1. **Sync from main**: Copy package.json and package-lock.json from main branch
2. **Retry once**: Run `npm ci` again
3. **Report failure**: If still failing, STOP and report with exact error details
4. **Never disable tests**: Do not modify tests to pass CI

### **Port Conflicts**
- **Always free ports first**: `npm run kill-ports` before starting any servers
- **Fixed ports only**: Baseline :3000, Sandbox :3001 (no other ports)
- **Check status**: Use `npm run status` to verify port availability

### **Environment Issues**
- **Baseline protection**: Do not modify main code unless instructed to "promote/apply patch"
- **Environment validation**: Test with CI environment variables before committing
- **Fail fast**: Stop immediately on missing environment variables

## 📋 Reporting Requirements

### **Every Task Must Include:**
1. **Exact commands run** with full syntax
2. **Exit codes** for all commands
3. **Last 20-50 log lines** from each server
4. **JSON outputs** when available
5. **Error details** with stack traces if applicable

### **Command Output Format:**
```bash
# Example reporting format
$ npm run dev:safe
Exit code: 0
Last 20 lines:
[timestamp] info: Server started on port 3000
[timestamp] info: Server started on port 3001
...

$ npm run smoke:all
Exit code: 0
JSON output: {"status": "healthy", "ports": [3000, 3001]}
```

### **Error Reporting Format:**
```bash
# Example error reporting
$ npm run dev:safe
Exit code: 1
Error: Port 3000 already in use
Last 20 lines:
[timestamp] error: EADDRINUSE: address already in use
[timestamp] error: Failed to start server
...
```

## 🔒 Regression Prevention

### **Security/Performance/SEO/Accessibility**
- **Must not regress**: All existing functionality must remain intact
- **No test disabling**: Never disable tests to pass CI
- **Performance budgets**: Maintain Web Vitals targets
- **Security standards**: Maintain all security checks

### **Quality Gates**
- **Type checking**: `npm run type-check:strict` must pass
- **Linting**: `npm run lint` must pass (no disabled rules)
- **Build**: `npm run build` must complete successfully
- **Tests**: All tests must pass without modification

## 🎯 Clarification Rules

### **When Unclear:**
- **Ask "dev or prod?"**: Clarify environment requirements
- **Default to dev:safe**: Use development mode unless specified otherwise
- **Confirm scope**: Verify what needs to be modified

### **Environment Selection:**
- **Development**: `npm run dev:safe` (baseline prod + sandbox dev)
- **Production**: `npm run run:both` (both in production mode)
- **Testing**: `npm run smoke:all` (comprehensive health check)

## 📊 Health Check Procedures

### **One-Shot Health Check:**
```bash
npm run smoke:all
```
This runs:
- `npm run agent:status` — Check 3000/3001 + manifest 200
- `npm run health:check` — Test /api/healthz on both ports
- `npm run console:check:sandbox` — Check for console errors

### **Individual Health Checks:**
- **Status check**: `npm run agent:status`
- **Health endpoint**: `npm run health:check`
- **Console errors**: `npm run console:check:sandbox`
- **Pre-deployment**: `npm run dev:precheck --json`

## 🚀 Promotion Workflow

### **Safe Promotion Process:**
1. **Create patch**: `npm run sandbox:patch`
2. **Apply to main**: `npm run sandbox:apply`
3. **Run smoke test**: `npm run smoke:all`
4. **Commit with rationale**: Explain what was changed and why
5. **Verify no regressions**: All tests and checks must pass

### **Pre-Promotion Checklist:**
- [ ] All TypeScript errors resolved
- [ ] All linting issues fixed
- [ ] Build completes successfully
- [ ] All tests pass
- [ ] Performance budgets maintained
- [ ] Security checks pass
- [ ] Accessibility standards met

## ⚠️ Emergency Procedures

### **If Build Fails:**
1. **Check environment**: Verify NODE_ENV and other variables
2. **Clear cache**: Remove .next and node_modules
3. **Reinstall**: Run `npm ci` with fresh dependencies
4. **Report**: Document exact failure point and error

### **If Ports Are Stuck:**
1. **Force kill**: `npm run kill-ports`
2. **Check processes**: Verify no hidden servers running
3. **Restart**: Use fallback commands if needed
4. **Report**: Document what caused the port conflict

### **If Tests Fail:**
1. **Don't disable**: Never modify tests to pass
2. **Investigate**: Find root cause of failure
3. **Fix properly**: Address the underlying issue
4. **Verify**: Ensure fix doesn't break other functionality

---

**Remember: Quality and reliability are non-negotiable. Every change must maintain or improve the current standards.**
