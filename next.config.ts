import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: [
    "ais-dev-pn7kjgqs5mf657khxg5aoa-756843906523.europe-west2.run.app",
    "ais-pre-pn7kjgqs5mf657khxg5aoa-756843906523.europe-west2.run.app",
    "*.run.app",
    "localhost:3000",
    "localhost:8080",
    "127.0.0.1:3000",
    "127.0.0.1:8080",
  ],
  /* config options here */
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
      '/personas/:path*',
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
