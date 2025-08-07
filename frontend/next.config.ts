import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    forceSwcTransforms: false,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  // Force disable SWC
  compiler: {
    removeConsole: false,
  },
  // Use Babel instead of SWC
  transpilePackages: [],
};

export default nextConfig;
