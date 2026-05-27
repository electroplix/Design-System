#!/bin/bash
set -e

REGISTRY_URL="http://localhost:4873"

echo "Starting local Verdaccio registry..."
# Start verdaccio in the background or use npx
npx verdaccio --config .verdaccio/config.yml &
VERDACCIO_PID=$!

# Wait for verdaccio to start
sleep 5

echo "Publishing to local registry..."
pnpm nx release --yes --registry="$REGISTRY_URL"

echo "Package published successfully to $REGISTRY_URL"

# Cleanup
kill $VERDACCIO_PID
echo "Local registry stopped."
