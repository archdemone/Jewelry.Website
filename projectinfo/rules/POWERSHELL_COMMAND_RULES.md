# 🚨 CRITICAL POWERSHELL COMMAND RULES

## **NEVER USE PIPES OR REDIRECTIONS - THEY HANG!**

### **The Problem:**
PowerShell commands with pipes (`|`), redirections (`>`), or complex syntax cause commands to hang indefinitely or fail with binding errors.

### **The Solution:**
**ALWAYS use simple, direct commands without any pipes or redirections.**

## 🚨 **MANDATORY COMMAND PATTERNS**

### **✅ ALWAYS USE - Direct Commands:**
```bash
# ✅ These work reliably
npm run lint
npm run dev:precheck:build
node scripts/dev-error-helper.js --with-build
git add .
git commit -m "message"
npm run smoke:all
```

### **❌ NEVER USE - Pipes/Redirections:**
```bash
# ❌ These HANG or FAIL
npm run lint | cat
npm run dev:precheck:build | more
git diff --name-only | head
command > file.txt
command 2>&1
```

## 🎯 **CRITICAL OPERATIONAL RULES**

### **Rule 1: Direct Execution Only**
- **Use commands as-is**: No modifications or piping
- **Let output display naturally**: Don't try to control it
- **If it hangs**: Cancel immediately and use direct alternative

### **Rule 2: Script Alternatives**
- **If npm run fails**: Use `node scripts/script-name.js` directly
- **Add parameters**: `node scripts/script-name.js --with-build`
- **Check script exists**: Verify file before execution

### **Rule 3: PowerShell Compatibility**
- **PowerShell ≠ Bash**: Different object model and syntax
- **Avoid Unix patterns**: No pipes, grep, awk, etc.
- **Use native alternatives**: PowerShell commands when needed

## ⚡ **EMERGENCY PROCEDURES**

### **If Command Hangs:**
1. **Cancel immediately**: Don't wait
2. **Use direct alternative**: Remove pipes/redirections
3. **Try script directly**: `node scripts/...` instead of `npm run`
4. **Report pattern**: Note which command failed

### **If Command Fails:**
1. **Check syntax**: Ensure no pipes or redirections
2. **Verify script exists**: Check file is present
3. **Use simplest form**: Strip all modifications
4. **Try alternative**: Different approach if needed

## 📋 **PROVEN WORKING COMMANDS**

### **Development Commands:**
```bash
npm run dev:safe
npm run stop
npm run kill-ports
npm run status
npm run smoke:all
npm run health:check
npm run lint
npm run type-check:strict
npm run build
```

### **Script Commands:**
```bash
node scripts/dev-error-helper.js
node scripts/dev-error-helper.js --with-build
node scripts/health-check.js
node scripts/console-check-playwright.js
node scripts/kill-ports.js
```

### **Git Commands:**
```bash
git add .
git commit -m "message"
git push
git status
git log --oneline -3
```

## 🔒 **ENFORCEMENT**

### **Before Running Any Command:**
- [ ] Is it a direct command?
- [ ] Does it use pipes or redirections?
- [ ] Is it the simplest possible form?
- [ ] Have I tested this pattern before?

### **If Unsure:**
- **Default to simplest**: Use the most basic form
- **Test small**: Try simple version first
- **Build up slowly**: Add complexity only if needed
- **Document success**: Note working patterns

---

**CRITICAL MEMORY: PowerShell is NOT Bash. Keep commands simple and direct. Pipes and redirections WILL cause problems.**
