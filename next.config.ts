import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fyxhfsrzqhlbbbahmijx.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // Allow any https image (for products loaded from other CDNs)
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default config;
