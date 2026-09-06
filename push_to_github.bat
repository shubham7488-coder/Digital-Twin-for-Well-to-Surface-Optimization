@echo off
TITLE Push SIH 26120 to GitHub
COLOR 0A
cls
echo =====================================================================
echo   SIH 26120: Pushing Code to GitHub
echo   Repository: https://github.com/shubham7488-coder/Digital-Twin-for-Well-to-Surface-Optimization.git
echo =====================================================================
echo.

git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in your PATH.
    echo Please install Git from https://git-scm.com/download/win and try again.
    echo Or upload your files directly on https://github.com/shubham7488-coder/Digital-Twin-for-Well-to-Surface-Optimization
    pause
    exit /b
)

echo [1/4] Initializing Git...
git init

echo [2/4] Staging files...
git add .

echo [3/4] Creating commit...
git commit -m "SIH 26120: AI-Powered Well-to-Surface Digital Twin for Integrated CSS-SRP Optimization"

echo [4/4] Setting main branch & remote...
git branch -M main
git remote remove origin >nul 2>&1
git remote add origin https://github.com/shubham7488-coder/Digital-Twin-for-Well-to-Surface-Optimization.git

echo Pushing to GitHub...
git push -u origin main

echo.
echo =====================================================================
echo   DONE! Code successfully pushed to your repository.
echo =====================================================================
pause

