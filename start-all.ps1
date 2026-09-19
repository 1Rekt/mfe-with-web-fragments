#!/usr/bin/env pwsh

# MFE Workspace Startup Script
# Starts all micro-frontends and the shell simultaneously

Write-Host "================================"
Write-Host "Starting MFE Workspace..."
Write-Host "================================"
Write-Host ""

# Color codes for output
$greenColor = "`e[32m"
$blueColor = "`e[34m"
$resetColor = "`e[0m"

# Check if concurrently is installed globally
$concurrently = npm list -g concurrently 2>$null
if (-not $concurrently) {
    Write-Host "${blueColor}Installing concurrently globally...${resetColor}"
    npm install -g concurrently
}

Write-Host "${greenColor}Installing dependencies for all services...${resetColor}"
Write-Host ""

# Install dependencies for shell
Write-Host "${blueColor}Installing shell dependencies...${resetColor}"
cd sales_portal_shell
npm install
cd ..

# Install dependencies for MFEs
Write-Host "${blueColor}Installing mfe_customers dependencies...${resetColor}"
cd micro-frontends/mfe_customers
npm install
cd ../..

Write-Host "${blueColor}Installing mfe_orders dependencies...${resetColor}"
cd micro-frontends/mfe_orders
npm install
cd ../..

Write-Host "${blueColor}Installing mfe_timer dependencies...${resetColor}"
cd micro-frontends/mfe_timer
npm install
cd ../..

Write-Host ""
Write-Host "${greenColor}Starting all services...${resetColor}"
Write-Host ""
Write-Host "Shell (port 4200):          http://localhost:4200"
Write-Host "Customers MFE (port 4203):  http://localhost:4203"
Write-Host "Orders MFE (port 4204):     http://localhost:4204"
Write-Host "Timer MFE (port 4205):      http://localhost:4205"
Write-Host ""

# Start customers MFE
Write-Host "${blueColor}Starting Customers MFE...${resetColor}"
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd micro-frontends/mfe_customers; npm start"

# Start orders MFE
Write-Host "${blueColor}Starting Orders MFE...${resetColor}"
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd micro-frontends/mfe_orders; npm start"

# Start timer MFE
Write-Host "${blueColor}Starting Timer MFE...${resetColor}"
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd micro-frontends/mfe_timer; npm start"

# Start shell
Write-Host "${blueColor}Starting Shell...${resetColor}"
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd sales_portal_shell; npm start"

Write-Host ""
Write-Host "${greenColor}All services started in separate windows!${resetColor}"
