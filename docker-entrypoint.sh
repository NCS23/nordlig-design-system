#!/bin/sh
set -e

# Always run pnpm install to recreate workspace symlinks
# (bind mount overwrites symlinks created during Docker build)
echo "Installing/linking dependencies..."
CI=true pnpm install

# Build tokens and components if not built yet
if [ ! -f "packages/styles/dist/tokens.css" ] || [ ! -d "packages/components/dist" ]; then
  echo "Building packages..."
  pnpm build
fi

exec "$@"
