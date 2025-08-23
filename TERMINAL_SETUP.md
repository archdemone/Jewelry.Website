# 🎯 J&M Jewelry Terminal Setup

## Quick Setup Instructions

### Step 1: Configure Your Terminals

**Terminal 1 (Baseline):**
```powershell
. .\terminal-setup.ps1
Set-BaselineTerminal
```

**Terminal 2 (Sandbox):**
```powershell
. .\terminal-setup.ps1
Set-SandboxTerminal
```

### Step 2: Start Development Environment

In either terminal, run:
```powershell
Start-DevelopmentEnvironment
```

## Result

After setup, you'll have:
- **[BASELINE] terminal** with **GREEN text** (Port 3000)
- **[SANDBOX] terminal** with **YELLOW text** (Port 3001)

## Available Commands

- `Set-BaselineTerminal` - Configure terminal as baseline (green)
- `Set-SandboxTerminal` - Configure terminal as sandbox (yellow)
- `Show-TerminalHelp` - Show all available commands
- `Start-DevelopmentEnvironment` - Start both servers

## Benefits

✅ **Never accidentally close the wrong terminal again**  
✅ **Clear visual distinction between environments**  
✅ **Easy identification of which terminal is which**  
✅ **Custom window titles for quick recognition**

## Phase 1 Status

✅ **Accessibility Compliance** - Skip links, ARIA attributes, semantic HTML  
✅ **Product Image System** - Smart fallbacks, error handling, accessibility  
✅ **Mobile Navigation** - Already excellent, enhanced with accessibility  
✅ **Terminal Setup** - Custom titles and colors for easy identification

**Ready for Phase 2!** 🚀
