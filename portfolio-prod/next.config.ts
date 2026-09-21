import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL("https://cs.uwatering.com/icon.white.svg")],
  },
};

export default nextConfig;
