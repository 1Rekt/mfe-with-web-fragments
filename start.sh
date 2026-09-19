#!/bin/bash

# Bash script to start the Web Fragments microfrontend demo
# This script installs dependencies and starts both the fragment and host servers

echo "🚀 Starting Web Fragments Microfrontend Demo"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js version: $NODE_VERSION"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

NPM_VERSION=$(npm --version)
echo "✅ npm version: $NPM_VERSION"

echo ""
echo "📦 Installing dependencies..."
echo ""

# Install fragment dependencies
echo "Installing fragment dependencies..."
cd fragment
if [ -d "node_modules" ]; then
    echo "  Fragment node_modules already exists, skipping install..."
else
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install fragment dependencies"
        exit 1
    fi
fi
cd ..

# Install Angular fragment dependencies
echo "Installing Angular fragment dependencies..."
cd fragment_ng
if [ -d "node_modules" ]; then
    echo "  Angular fragment node_modules already exists, skipping install..."
else
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Angular fragment dependencies"
        exit 1
    fi
fi
cd ..

# Install Angular 19 fragment dependencies
echo "Installing Angular 19 fragment dependencies..."
cd fragment_ng19
if [ -d "node_modules" ]; then
    echo "  Angular 19 fragment node_modules already exists, skipping install..."
else
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Angular 19 fragment dependencies"
        exit 1
    fi
fi
cd ..

# Install host dependencies
echo "Installing host dependencies..."
cd host
if [ -d "node_modules" ]; then
    echo "  Host node_modules already exists, skipping install..."
else
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install host dependencies"
        exit 1
    fi
fi
cd ..

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Build host application
echo "🔨 Building host application..."
cd host
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Failed to build host application"
    exit 1
fi
cd ..

echo ""
echo "🚀 Starting servers..."
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $FRAGMENT_PID $ANGULAR_FRAGMENT_PID $ANGULAR_FRAGMENT_19_PID $HOST_PID 2>/dev/null
    wait $FRAGMENT_PID $ANGULAR_FRAGMENT_PID $ANGULAR_FRAGMENT_19_PID $HOST_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit
}

# Register cleanup on script exit
trap cleanup EXIT INT TERM

# Start fragment server in background
echo "Starting fragment server on http://localhost:3001..."
cd fragment
npm start > ../fragment.log 2>&1 &
FRAGMENT_PID=$!
cd ..

# Wait a moment for fragment to start
sleep 2

# Start Angular fragment server in background
echo "Starting Angular fragment server on http://localhost:3002..."
cd fragment_ng
npm start > ../fragment_ng.log 2>&1 &
ANGULAR_FRAGMENT_PID=$!
cd ..

# Wait a moment for Angular fragment to start
sleep 5

# Start Angular 19 fragment server in background
echo "Starting Angular 19 fragment server on http://localhost:3003..."
cd fragment_ng19
npm start > ../fragment_ng19.log 2>&1 &
ANGULAR_FRAGMENT_19_PID=$!
cd ..

# Wait a moment for Angular 19 fragment to start
sleep 5

# Start host server in background
echo "Starting host server on http://localhost:3000..."
cd host
npm start > ../host.log 2>&1 &
HOST_PID=$!
cd ..

# Wait a moment for host to start
sleep 3

echo ""
echo "✅ Servers are starting!"
echo ""
echo "📍 Counter fragment server: http://localhost:3001"
echo "📍 Angular fragment server: http://localhost:3002"
echo "📍 Angular fragment 19 server: http://localhost:3003"
echo "📍 Host application: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""
echo "View logs:"
echo "  Counter fragment: tail -f fragment.log"
echo "  Angular fragment: tail -f fragment_ng.log"
echo "  Angular fragment 19: tail -f fragment_ng19.log"
echo "  Host: tail -f host.log"
echo ""

# Wait for processes
wait $FRAGMENT_PID $ANGULAR_FRAGMENT_PID $ANGULAR_FRAGMENT_19_PID $HOST_PID

