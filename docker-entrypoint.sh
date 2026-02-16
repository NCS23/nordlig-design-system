#!/bin/sh
set -e

# Install dependencies if node_modules is empty
if [ ! -d "node_modules/.pnpm" ]; then
  echo "Installing dependencies..."
  pnpm install
fi

# Build tokens if not built yet
if [ ! -f "packages/styles/dist/tokens.css" ]; then
  echo "Building tokens..."
  pnpm build:tokens
fi

exec "$@"
