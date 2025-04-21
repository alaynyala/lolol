#!/bin/bash

# Exit on error
set -e

echo "🧹 Cleaning up build artifacts..."
rm -rf .nuxt dist .output node_modules

echo "🗑️ Removing lockfiles..."
rm -f package-lock.json

echo "📦 Installing dependencies with pnpm..."
pnpm install --no-frozen-lockfile

echo "🏗️ Building the project..."
pnpm build

echo "✅ Done! Your project is ready for deployment." 