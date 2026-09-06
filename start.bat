@echo off
TITLE SIH 26120 Digital Twin Server & Dashboard
COLOR 0B
cls
echo =====================================================================
echo   SIH 26120: AI-Powered Well-to-Surface Digital Twin Platform
echo   Integrated CSS-SRP Co-Optimization & SCADA DCS System
echo =====================================================================
echo.
echo [1/2] Checking Dependencies...
if not exist node_modules (
    echo Installing required packages (Express, CORS)...
    call npm.cmd install
)

echo.
echo [2/2] Launching Backend Server on port 3000...
echo.
start http://localhost:3000
node server.js
pause

