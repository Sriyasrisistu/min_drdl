@echo off
REM DRDL Fire Management System - Backend Startup Script
REM This script starts the Spring Boot backend on port 8080

echo.
echo ========================================
echo DRDL Fire Management System
echo Backend Startup
echo ========================================
echo.
echo Starting backend on http://localhost:8080
echo Press Ctrl+C to stop the server
echo.

cd backend
java -jar target/fire-management-system-1.0.0.jar

pause