import type { NextConfig } from 'next';
import path from 'path';

// Monorepo root — Turbopack needs this to resolve packages
const monorepoRoot = path.resolve(__dirname, '../..');

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    clientSegmentCache: true,
  },
  turbopack: {
    root: monorepoRoot,
  },
};

export default nextConfig;
