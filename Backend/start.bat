@echo off
echo ========================================
echo Smart Classroom Management - Backend
echo ========================================
echo.

echo [1/2] Checking MongoDB connection...
node test-db.js

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: MongoDB is not running!
    echo Please start MongoDB first.
    pause
    exit /b 1
)

echo.
echo [2/2] Starting backend server...
echo.
node server.js
