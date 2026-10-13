import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: process.cwd(),
  allowedDevOrigins: ['*.e2b.app'],
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536],
    imageSizes: [48, 64, 96, 128, 256, 384]
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};

export default nextConfig;
