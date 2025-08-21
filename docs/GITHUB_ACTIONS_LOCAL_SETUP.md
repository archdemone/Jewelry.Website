# GitHub Actions Local Testing Setup

## 🚀 **100% Accurate Workflow Testing**

This guide sets up local GitHub Actions testing to prevent "works locally, fails on GitHub" issues.

## 📋 **Prerequisites**

### 1. Install Docker Desktop
- Download from: https://www.docker.com/products/docker-desktop/
- Install and start Docker Desktop
- Ensure Docker is running (check system tray icon)

### 2. Install `act` CLI

**Windows (Recommended):**
```bash
# Using Chocolatey
choco install act-cli

# Or download from GitHub releases
# https://github.com/nektos/act/releases
```

**Manual Installation:**
1. Go to: https://github.com/nektos/act/releases
2. Download the latest Windows release
3. Extract to a folder in your PATH
4. Or add the folder to your system PATH

## 🔧 **Setup**

### 1. Verify Installation
```bash
# Check if act is installed
act --version

# List available workflows
npm run workflow:list
```

### 2. Create Configuration (Optional)
Create `.actrc` file in project root:
```bash
# .actrc
-P ubuntu-latest=node:20
--env-file .env.local
```

## 🧪 **Testing Commands**

### **New Testing Protocol (Use These Instead of Local npm Commands)**

| Test Type | Old Method | New Method |
|-----------|------------|------------|
| **Type Check** | `npm run type-check:ci` | `npm run test:ci` |
| **Lint** | `npm run lint:ci` | `npm run test:ci` |
| **Build** | `npm run build` | `npm run test:ci` |
| **Full CI** | Individual commands | `npm run test:ci` |
| **Performance** | Manual testing | `npm run test:performance` |
| **UI Tests** | Manual testing | `npm run test:ui` |
| **All Workflows** | Manual testing | `npm run test:all` |

### **Available Commands**

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

# Setup help
npm run workflow:setup      # Installation instructions
```

## 🎯 **Testing Protocol**

### **Before Making Workflow Changes:**
1. **Test current state**: `npm run test:all`
2. **Make changes** to workflow files
3. **Test changes**: `npm run test:ci` (or specific workflow)
4. **If passes**: Safe to push to GitHub
5. **If fails**: Fix locally until it passes

### **Example Workflow:**
```bash
# 1. Test current state
npm run test:ci

# 2. Make workflow changes
# (edit .github/workflows/ci-and-deploy.yml)

# 3. Test changes
npm run test:ci

# 4. If successful, push to GitHub
git add .github/workflows/
git commit -m "Fix workflow issues"
git push origin main
```

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **Docker not running**
   ```bash
   # Start Docker Desktop
   # Check Docker status
   docker --version
   ```

2. **act not found**
   ```bash
   # Reinstall act
   npm run workflow:setup
   ```

3. **Permission issues**
   ```bash
   # Run PowerShell as Administrator
   # Or use WSL2 for better compatibility
   ```

4. **Workflow not found**
   ```bash
   # List available workflows
   npm run workflow:list
   ```

### **Debug Mode:**
```bash
# Run with verbose output
npm run workflow:debug

# Check specific job
act -j ci --verbose
```

## ✅ **Benefits**

- **100% environment match** with GitHub
- **Catch all issues** before pushing
- **No more "works locally, fails on GitHub"**
- **Faster debugging** and iteration
- **Confidence** that local success = GitHub success

## 📚 **Additional Resources**

- [act Documentation](https://github.com/nektos/act)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)

---

**Remember: Always test with `act` before pushing workflow changes!**
