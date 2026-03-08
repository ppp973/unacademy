import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'player.uacdn.net',
      },
      {
        protocol: 'https',
        hostname: 'uamedia.uacdn.net',
      }
    ],
  },
};

export default nextConfig;
