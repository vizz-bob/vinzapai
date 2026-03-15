#!/bin/bash
set -e  # Exit immediately if any command fails

echo "==== Starting VinzapAI Monorepo Build ===="

# ------------------------
# Step 1: Backend Setup
# ------------------------
echo "==> Setting up Django backend..."
cd vinzapai-backend

# Install Python dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Start Django backend on port 8000 in the background
echo "==> Starting Django backend on port 8000..."
python manage.py runserver 0.0.0.0:8000 &

# ------------------------
# Step 2: Frontend Setup
# ------------------------
echo "==> Setting up React frontend..."
cd ../vinzapai-frontend

# Install Node dependencies
npm install

# Build React frontend
npm run build

# Install serve if not already installed
npm install -g serve

# Serve frontend build on port 3000
echo "==> Starting React frontend on port 3000..."
serve -s dist -l 3000
