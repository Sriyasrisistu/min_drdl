# DRDL Fire Management System - Backend Startup Script
# This PowerShell script starts the Spring Boot backend

Write-Host "========================================" -ForegroundColor Green
Write-Host "DRDL Fire Management System" -ForegroundColor Green
Write-Host "Backend Startup Script" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check if Java is available
Write-Host "Checking for Java installation..." -ForegroundColor Yellow
$javaPath = Get-Command java -ErrorAction SilentlyContinue

if ($null -eq $javaPath) {
    Write-Host "Java not found in PATH" -ForegroundColor Red
    Write-Host "Please install Java 17 or higher" -ForegroundColor Red
    Write-Host ""
    Write-Host "Alternatively, find Java manually:" -ForegroundColor Yellow
    Write-Host "Common paths:" -ForegroundColor Yellow
    Write-Host "  C:\Program Files\Java\jdk-17\bin\java" -ForegroundColor Cyan
    Write-Host "  C:\Program Files\Java\jdk-21\bin\java" -ForegroundColor Cyan
    pause
    exit 1
}

Write-Host "Java found!" -ForegroundColor Green
java -version
Write-Host ""

# Start backend
Write-Host "Starting backend on http://localhost:8080..." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

cd backend\target
java -jar fire-management-system-1.0.0.jar