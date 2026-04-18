import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 768, 1024, 1280, 1600],
    imageSizes: [64, 128, 256, 384, 600],
  },
  async redirects() {
    return [
      // Kanonisk slug är /strandar (svenska). /strander var en tidig variant.
      { source: '/strander', destination: '/strandar', permanent: true },
      { source: '/strander/:path*', destination: '/strandar/:path*', permanent: true },
    ];
  },
};

export default nextConfig;
