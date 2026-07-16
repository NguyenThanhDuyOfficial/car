import type { NextConfig } from "next";
import path from 'path'
import { config } from 'slopenv';
config();
const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  turbopack: {
    root: path.join(__dirname, "..")
  }
};

export default nextConfig;
