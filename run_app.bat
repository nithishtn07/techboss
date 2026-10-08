@echo off
title Tech Boss Fullstack Launcher
echo ===================================================
echo           TECH BOSS - FULLSTACK PLATFORM
echo ===================================================
echo.

:: 1. Start PostgreSQL if not already running on port 5432
netstat -ano | findstr :5432 >nul
if %errorlevel% neq 0 (
    echo [1/3] Starting PostgreSQL 16 on port 5432...
    start "Tech Boss - PostgreSQL" /min ".\backend\pgsql\bin\postgres.exe" -D ".\backend\pgsql\data" -p 5432
    timeout /t 2 /nobreak >nul
) else (
    echo [1/3] PostgreSQL is already running on port 5432.
)

:: 2. Start FastAPI Backend if not already running on port 8000
netstat -ano | findstr :8000 >nul
if %errorlevel% neq 0 (
    echo [2/3] Starting FastAPI Backend on http://127.0.0.1:8000...
    start "Tech Boss - FastAPI Backend" cmd /k "cd backend && .\venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"
    timeout /t 2 /nobreak >nul
) else (
    echo [2/3] FastAPI Backend is already running on port 8000.
)

:: 3. Start Vite Frontend if not already running on port 5173
netstat -ano | findstr :5173 >nul
if %errorlevel% neq 0 (
    echo [3/3] Starting Vite Frontend on http://127.0.0.1:5173...
    start "Tech Boss - Vite Frontend" cmd /k "npm run dev -- --host 127.0.0.1 --port 5173"
    timeout /t 2 /nobreak >nul
) else (
    echo [3/3] Vite Frontend is already running on port 5173.
)

echo.
echo ===================================================
echo All services are active!
echo Opening Tech Boss in your browser: http://127.0.0.1:5173/
echo ===================================================
start http://127.0.0.1:5173/
timeout /t 5
