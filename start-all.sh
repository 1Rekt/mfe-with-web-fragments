#!/bin/bash

# MFE Workspace Startup Script
# Starts all micro-frontends and the shell simultaneously

echo "================================"
echo "Starting MFE Workspace..."
echo "================================"
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if concurrently is installed
if ! npm list -g concurrently > /dev/null 2>&1; then
    echo -e "${BLUE}Installing concurrently globally...${NC}"
    npm install -g concurrently
fi

echo -e "${GREEN}Installing dependencies for all services...${NC}"
echo ""

echo -e "${BLUE}Installing shell dependencies...${NC}"
cd sales_portal_shell
npm install
cd ..

echo -e "${BLUE}Installing mfe_customers dependencies...${NC}"
cd micro-frontends/mfe_customers
npm install
cd ../..

echo -e "${BLUE}Installing mfe_orders dependencies...${NC}"
cd micro-frontends/mfe_orders
npm install
cd ../..

echo -e "${BLUE}Installing mfe_timer dependencies...${NC}"
cd micro-frontends/mfe_timer
npm install
cd ../..

echo ""
echo -e "${GREEN}Starting all services...${NC}"
echo ""
echo "Shell (port 4200):          http://localhost:4200"
echo "Customers MFE (port 4203):  http://localhost:4203"
echo "Orders MFE (port 4204):     http://localhost:4204"
echo "Timer MFE (port 4205):      http://localhost:4205"
echo ""

# Start customers MFE in background
echo -e "${BLUE}Starting Customers MFE...${NC}"
(cd micro-frontends/mfe_customers && npm start) &

# Start orders MFE in background
echo -e "${BLUE}Starting Orders MFE...${NC}"
(cd micro-frontends/mfe_orders && npm start) &

# Start timer MFE in background
echo -e "${BLUE}Starting Timer MFE...${NC}"
(cd micro-frontends/mfe_timer && npm start) &

# Start shell in background
echo -e "${BLUE}Starting Shell...${NC}"
(cd sales_portal_shell && npm start) &

echo ""
echo -e "${GREEN}All services started in the background!${NC}"
echo -e "${BLUE}Press Ctrl+C to stop all services${NC}"

# Wait for all background jobs
wait
