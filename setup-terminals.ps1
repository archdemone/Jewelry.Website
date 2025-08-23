# Quick Terminal Setup for J&M Jewelry Development
# This script will configure both terminals automatically

Write-Host "Setting up J&M Jewelry Development Terminals..." -ForegroundColor Magenta
Write-Host "===============================================" -ForegroundColor Magenta

# Load the terminal setup functions
. .\terminal-setup.ps1

Write-Host ""
Write-Host "Instructions for Terminal Setup:" -ForegroundColor Cyan
Write-Host "===============================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. In your FIRST terminal window, run:" -ForegroundColor Yellow
Write-Host "   . .\terminal-setup.ps1" -ForegroundColor White
Write-Host "   Set-BaselineTerminal" -ForegroundColor White
Write-Host ""
Write-Host "2. In your SECOND terminal window, run:" -ForegroundColor Yellow
Write-Host "   . .\terminal-setup.ps1" -ForegroundColor White
Write-Host "   Set-SandboxTerminal" -ForegroundColor White
Write-Host ""
Write-Host "3. To start development, run in either terminal:" -ForegroundColor Yellow
Write-Host "   Start-DevelopmentEnvironment" -ForegroundColor White
Write-Host ""
Write-Host "Result:" -ForegroundColor Green
Write-Host "   - [BASELINE] terminal with GREEN text (Port 3000)" -ForegroundColor Green
Write-Host "   - [SANDBOX] terminal with YELLOW text (Port 3001)" -ForegroundColor Yellow
Write-Host ""
Write-Host "You'll never accidentally close the wrong terminal again!" -ForegroundColor Red
