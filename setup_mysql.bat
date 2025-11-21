@echo off
echo ============================================
echo La Verdad Herald - MySQL Setup Script
echo ============================================
echo.

REM Check if XAMPP MySQL is running
echo [1/4] Checking XAMPP MySQL...
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✓ MySQL is running
) else (
    echo ✗ MySQL is NOT running!
    echo.
    echo Please start MySQL in XAMPP Control Panel first.
    echo Then run this script again.
    pause
    exit /b 1
)

echo.
echo [2/4] Creating database...
REM Try to create database using mysql command
"C:\xampp\mysql\bin\mysql.exe" -u root -e "CREATE DATABASE IF NOT EXISTS laverdad_herald CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>NUL

if %ERRORLEVEL% EQU 0 (
    echo ✓ Database created successfully
) else (
    echo ✗ Could not create database automatically
    echo.
    echo Please create manually:
    echo 1. Open phpMyAdmin: http://localhost/phpmyadmin
    echo 2. Click "New" in left sidebar
    echo 3. Database name: laverdad_herald
    echo 4. Collation: utf8mb4_unicode_ci
    echo 5. Click "Create"
    echo.
    pause
)

echo.
echo [3/4] Clearing Laravel config cache...
php artisan config:clear

echo.
echo [4/4] Running migrations...
php artisan migrate

echo.
echo ============================================
echo ✓ Setup Complete!
echo ============================================
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo To start the server, run:
echo   php artisan serve
echo.
pause
