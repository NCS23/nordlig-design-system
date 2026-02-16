#!/bin/sh
set -e

# Always run pnpm install to recreate workspace symlinks
# (bind mount overwrites symlinks created during Docker build)
echo "Installing/linking dependencies..."
pnpm install

# Build tokens if not built yet
if [ ! -f "packages/styles/dist/tokens.css" ]; then
  echo "Building tokens..."
  pnpm build:tokens
fi

exec "$@"
