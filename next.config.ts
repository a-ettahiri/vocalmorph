import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  async headers() {
    // Static design assets are content-stable (filenames change per export),
    // so browsers may cache them immutably: download once, never revalidate.
    const immutableDirs = [
      '/figma/:path*',
      '/de-noise/:path*',
      '/generate/:path*',
      '/history/:path*',
      '/home/:path*',
      '/library/:path*',
      '/persona/:path*',
      '/voice-clone/:path*',
    ];
    return immutableDirs.map((source) => ({
      source,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    }));
  },
  experimental: {
    agentUpgrade: "security",
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
