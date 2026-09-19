@echo off
REM MFE Workspace Startup Script
REM Starts all micro-frontends and the shell simultaneously

echo ================================
echo Starting MFE Workspace...
echo ================================
echo.

echo Installing dependencies for all services...
echo.

echo Installing shell dependencies...
cd sales_portal_shell
call npm install
cd ..

echo Installing mfe_customers dependencies...
cd micro-frontends\mfe_customers
call npm install
cd ..\..

echo Installing mfe_orders dependencies...
cd micro-frontends\mfe_orders
call npm install
cd ..\..

echo Installing mfe_timer dependencies...
cd micro-frontends\mfe_timer
call npm install
cd ..\..

echo.
echo Starting all services...
echo.
echo Shell (port 4200):          http://localhost:4200
echo Customers MFE (port 4203):  http://localhost:4203
echo Orders MFE (port 4204):     http://localhost:4204
echo Timer MFE (port 4205):      http://localhost:4205
echo.

REM Start customers MFE in new window
echo Starting Customers MFE...
start "Customers MFE" cmd /k "cd micro-frontends\mfe_customers && npm start"

REM Start orders MFE in new window
echo Starting Orders MFE...
start "Orders MFE" cmd /k "cd micro-frontends\mfe_orders && npm start"

REM Start timer MFE in new window
echo Starting Timer MFE...
start "Timer MFE" cmd /k "cd micro-frontends\mfe_timer && npm start"

REM Start shell in new window
echo Starting Shell...
start "Shell" cmd /k "cd sales_portal_shell && npm start"

echo.
echo All services started in separate windows!
