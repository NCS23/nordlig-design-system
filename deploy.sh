#!/bin/bash
set -e

echo "Starting Nordlig Storybook deployment..."
cd /volume1/docker/nordlig

echo "Pulling latest code..."
su - NCSNASadmin -c "cd /volume1/docker/nordlig && git pull origin main 2>&1"

echo "Building and restarting Storybook..."
docker-compose up -d --build storybook

echo "Deployment complete!"
docker-compose ps
