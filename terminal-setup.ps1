# Terminal Setup Script for J&M Jewelry Development
# Run this script to set up custom terminal configurations

function Set-BaselineTerminal {
    $host.UI.RawUI.WindowTitle = "[BASELINE] J&M Jewelry (Port 3000)"
    $host.UI.RawUI.ForegroundColor = "Green"
    Write-Host "=== BASELINE TERMINAL CONFIGURED ===" -ForegroundColor Green
    Write-Host "Port: 3000" -ForegroundColor Green
    Write-Host "Purpose: Production-like baseline for comparison" -ForegroundColor White
    Write-Host "Commands: npm run dev:baseline, npm run start:baseline" -ForegroundColor Cyan
}

function Set-SandboxTerminal {
    $host.UI.RawUI.WindowTitle = "[SANDBOX] J&M Jewelry (Port 3001)"
    $host.UI.RawUI.ForegroundColor = "Yellow"
    Write-Host "=== SANDBOX TERMINAL CONFIGURED ===" -ForegroundColor Yellow
    Write-Host "Port: 3001" -ForegroundColor Yellow
    Write-Host "Purpose: Active development workspace" -ForegroundColor White
    Write-Host "Commands: npm run dev:sandbox, npm run start:sandbox" -ForegroundColor Cyan
}

function Show-TerminalHelp {
    Write-Host "J&M Jewelry Terminal Setup" -ForegroundColor Magenta
    Write-Host "============================" -ForegroundColor Magenta
    Write-Host ""
    Write-Host "BASELINE Terminal (Green):" -ForegroundColor Green
    Write-Host "   - Port: 3000" -ForegroundColor White
    Write-Host "   - Purpose: Production-like baseline for comparison" -ForegroundColor White
    Write-Host "   - Commands: npm run dev:baseline, npm run start:baseline" -ForegroundColor White
    Write-Host ""
    Write-Host "SANDBOX Terminal (Yellow):" -ForegroundColor Yellow
    Write-Host "   - Port: 3001" -ForegroundColor White
    Write-Host "   - Purpose: Active development workspace" -ForegroundColor White
    Write-Host "   - Commands: npm run dev:sandbox, npm run start:sandbox" -ForegroundColor White
    Write-Host ""
    Write-Host "Quick Start Commands:" -ForegroundColor Cyan
    Write-Host "   - npm run dev:safe (starts both)" -ForegroundColor White
    Write-Host "   - npm run stop (stops both)" -ForegroundColor White
    Write-Host "   - npm run status (check status)" -ForegroundColor White
    Write-Host ""
    Write-Host "TIP: Never close these terminals - they're your development environment!" -ForegroundColor Red
}

function Start-DevelopmentEnvironment {
    Write-Host "Starting J&M Jewelry Development Environment..." -ForegroundColor Magenta
    Write-Host "This will start both Baseline (Port 3000) and Sandbox (Port 3001)" -ForegroundColor Cyan
    Write-Host ""
    npm run dev:safe
}

Write-Host "J&M Jewelry Terminal Setup Loaded!" -ForegroundColor Magenta
Write-Host "Use: Set-BaselineTerminal or Set-SandboxTerminal to configure terminals" -ForegroundColor Cyan
Write-Host "Use: Show-TerminalHelp to see available commands" -ForegroundColor Cyan
Write-Host "Use: Start-DevelopmentEnvironment to start both servers" -ForegroundColor Cyan
