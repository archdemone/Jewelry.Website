# PowerShell Command Execution - Critical Operational Memory

## 🚨 **CRITICAL: Use Direct Commands Only**

### **Problem:**
PowerShell commands with pipes, redirections, or complex syntax often hang or fail in the terminal environment.

### **Solution:**
**ALWAYS use direct, simple commands without pipes or redirection.**

## ✅ **Working Command Patterns**

### **✅ DO - Direct Commands:**
```bash
# Direct npm commands
npm run dev:precheck:build

# Direct node script execution
node scripts/dev-error-helper.js --with-build

# Simple git commands
git add .
git commit -m "message"
git push

# Direct status checks
npm run smoke:all
npm run health:check
npm run lint
```

### **❌ DON'T - Complex Pipes/Redirections:**
```bash
# These HANG or FAIL in PowerShell
npm run dev:precheck:build | cat
npm run lint 2>&1 | more
git diff --name-only | head

# These cause PowerShell binding errors
command | cat
command > file.txt
command 2>&1
```

## 🎯 **Operational Rules**

### **Command Execution Standards:**
1. **Use direct commands**: No pipes, no redirections
2. **Let commands run naturally**: Don't try to control output
3. **If command hangs**: Cancel and use direct alternative
4. **Check exit codes**: Commands will show their natural exit status

### **When Commands Get Stuck:**
1. **Cancel immediately**: Don't wait for hung commands
2. **Use direct alternative**: Run the underlying script directly
3. **Report the issue**: Note which command pattern failed

## 📋 **Proven Working Commands**

### **Development Workflow:**
```bash
# Health checks
npm run smoke:all
npm run health:check
npm run console:check:sandbox

# Code quality
npm run lint
npm run type-check:strict
npm run build

# Direct script execution
node scripts/dev-error-helper.js --with-build
node scripts/health-check.js
node scripts/console-check-playwright.js

# Git workflow
git add .
git commit -m "descriptive message"
git push
git status
```

### **Environment Management:**
```bash
# Port management
npm run kill-ports
npm run status

# Server control
npm run dev:safe
npm run stop

# Validation
npm run dev:precheck
npm run dev:precheck:build
```

## 🔧 **Script Execution Best Practices**

### **When npm run fails:**
1. **Try direct node execution**: `node scripts/script-name.js`
2. **Add parameters as needed**: `node scripts/script-name.js --with-build`
3. **Check script exists**: Verify the script file is present

### **PowerShell Compatibility:**
- **PowerShell handles simple commands well**
- **PowerShell struggles with Unix-style pipes**
- **Use native PowerShell alternatives when needed**
- **Avoid complex shell scripting in commands**

## 📊 **Success Metrics**

### **✅ Command Success Indicators:**
- Command completes with exit code (0 or 1)
- Clear output is displayed
- No hanging or timeout issues
- Consistent execution time

### **❌ Command Failure Indicators:**
- Command hangs indefinitely
- Output truncated with "..." or pager
- PowerShell binding errors
- Inconsistent or no exit codes

## 💡 **Key Insights**

### **Why Direct Commands Work:**
1. **PowerShell compatibility**: Simple commands work reliably
2. **No pipe complexity**: Avoids PowerShell object binding issues
3. **Clean output**: Natural command output is displayed
4. **Reliable exit codes**: Commands complete properly

### **Why Pipes/Redirections Fail:**
1. **PowerShell object model**: Different from Unix pipes
2. **Binding errors**: Objects can't bind to pipeline parameters
3. **Pager issues**: Commands get stuck in less/more viewers
4. **Complex parsing**: PowerShell struggles with complex syntax

---

**REMEMBER: Keep it simple. Direct commands work reliably. Complex pipes and redirections cause issues in PowerShell environment.**
