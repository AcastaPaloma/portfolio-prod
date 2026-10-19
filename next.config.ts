import type { NextConfig } from "next";

// public/genie and public/pi hold static write-ups (see scripts/sync-projects.mjs) whose pages load assets by
// relative path, so they must be served from /genie/ and /pi/ with the trailing slash (proxy.ts adds it). Next's
// own trailing-slash redirect is turned off and reapplied below for everything else.
const writeups = ["genie", "pi"];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [new URL("https://cs.uwatering.com/icon.white.svg")],
  },
  async redirects() {
    return [
      { source: `/:path((?!${writeups.join("/|")}/).+)/`, destination: "/:path", permanent: true },
    ];
  },
  async rewrites() {
    return writeups.map((name) => ({ source: `/${name}/`, destination: `/${name}/index.html` }));
  },
};

export default nextConfig;
