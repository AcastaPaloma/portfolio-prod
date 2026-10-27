import type { NextConfig } from "next";

// public/genie and public/pi hold static write-ups (see scripts/sync-projects.mjs) and public/privacy holds the
// static research dashboard (kept in this repo). Their pages load assets by relative path, so they must be served
// from /genie/, /pi/ and /privacy/ with the trailing slash (proxy.ts adds it). Next's own trailing-slash redirect
// is turned off and reapplied below for everything else.
const writeups = ["genie", "pi", "privacy"];

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
