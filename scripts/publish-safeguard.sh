#!/bin/bash
set -e

echo "Running pre-publish safeguards..."

# 1. Lint check
echo "Checking code style..."
pnpm nx run-many -t lint

# 2. Test check
echo "Running unit tests..."
pnpm nx run-many -t test

# 3. Build check
echo "Building all packages..."
pnpm nx run-many -t build

# 4. Security audit
echo "Checking for vulnerabilities..."
pnpm audit --audit-level=high

# 5. Dry run publish
echo "Simulating publish..."
cd packages/components
npm publish --dry-run --access public

echo "Safeguard check completed successfully!"
