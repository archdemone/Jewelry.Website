# 📁 Project Information Index

This folder contains all the important instructions, rules, and memories for the Jewelry Website project, organized for easy access.

## 📋 **Rules Folder** (`/rules/`)
**Critical instructions and guidelines that must be followed:**

### **Environment & Workflow Rules**
- `ENVIRONMENT_RULE.md` - **CRITICAL**: Always test both local and CI environments
- `WORKFLOW_MANAGEMENT_RULES.md` - Comprehensive workflow management guidelines
- `DEPLOYMENT.md` - Production deployment instructions

### **Development Rules**
- `README.md` - Project setup and environment configuration
- `ADMIN_SECURITY.md` - Admin panel security guidelines

### **Operational Rules**
- `SECURITY_CHECKLIST.md` - Security best practices
- `LAUNCH_CHECKLIST.md` - Pre-launch verification checklist
- `MAINTENANCE.md` - Ongoing maintenance procedures
- `API.md` - API documentation and guidelines

## 🧠 **Memories Folder** (`/memories/`)
**Historical context, lessons learned, and troubleshooting information:**

### **Workflow & CI/CD Memories**
- `.git-workflow-memory.md` - Git workflow patterns and commands
- `UI_PR_WORKFLOW_FIXES.md` - UI PR workflow fixes and TypeScript error resolution
- `typescript-fix-report.md` - TypeScript error fixes and solutions
- `CI_FIX_SUMMARY.md` - CI/CD fixes and solutions
- `CI_WORKFLOW_FIXES.md` - Workflow fixes and improvements
- `GITHUB_WORKFLOWS_STATUS.md` - GitHub workflows status and configuration

### **Performance Memories**
- `performance-optimization-report.md` - Performance optimization strategies
- `LCP_OPTIMIZATION_SUMMARY.md` - Largest Contentful Paint optimizations
- `IMAGE_OPTIMIZATION_SUMMARY.md` - Image optimization techniques
- `PERFORMANCE_OPTIMIZATION_SUMMARY.md` - Comprehensive performance improvements
- `LIGHTHOUSE_OPTIMIZATION_COMPLETE.md` - Lighthouse optimization results
- `LIGHTHOUSE_PERFORMANCE_GUIDE.md` - Lighthouse performance guidelines
- `WEB_VITALS_GUARDRAIL.md` - Web Vitals monitoring and guardrails

### **Development Memories**
- `final-ui-ux-audit-report.md` - UI/UX audit results and recommendations

## 🚀 **Quick Access Commands**

### **Before Making Changes:**
```bash
# Check environment rules
cat projectinfo/rules/ENVIRONMENT_RULE.md

# Test environment consistency
npm run env:consistency
```

### **Before Deploying:**
```bash
# Check deployment rules
cat projectinfo/rules/DEPLOYMENT.md

# Check launch checklist
cat projectinfo/rules/LAUNCH_CHECKLIST.md
```

### **When Troubleshooting:**
```bash
# Check CI/CD memories
cat projectinfo/memories/CI_FIX_SUMMARY.md

# Check performance memories
cat projectinfo/memories/performance-optimization-report.md
```

## 📝 **How to Use This Organization**

### **Rules** = **Must Follow**
- These are active guidelines and requirements
- Always check before making changes
- Update when new patterns emerge

### **Memories** = **Reference & Context**
- Historical information and lessons learned
- Troubleshooting guides and solutions
- Performance optimization strategies

## 🎯 **Key Rules to Remember**

1. **Environment Testing**: Always run `npm run env:consistency` before committing
2. **Workflow Management**: Test both local and CI environments
3. **Security**: Follow security checklist for all changes
4. **Performance**: Monitor Web Vitals and Lighthouse scores
5. **Documentation**: Update relevant files when making changes

## ✅ **File Coherence Status**

### **Current & Relevant Files:**
- ✅ **Environment Rules**: Up-to-date and critical for CI/CD
- ✅ **Workflow Management**: Current workflow guidelines
- ✅ **Performance Memories**: Recent optimization strategies
- ✅ **CI/CD Memories**: Recent fixes and solutions

### **Removed Outdated Files:**
- ❌ **PHASE*.txt**: Development prompts (no longer relevant)
- ❌ **DEVELOPMENT_CHECKLIST.md**: Outdated checklist (many items completed)
- ❌ **actionable-checklist.md**: Outdated issues (likely fixed)
- ❌ **REPORT.md**: Generic report (not specific instructions)
- ❌ **PERF.md**: Duplicate performance file

---
**All remaining files are current and relevant to the project!** 🎉
