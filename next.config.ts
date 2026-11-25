import type { NextConfig } from "next";

// public/genie, public/pi, public/kuangrad and public/pseudo-jepa hold static write-ups (see scripts/sync-projects.mjs),
// public/privacy holds the static research dashboard and public/tricicle the TRICICLE write-up (both kept in this repo:
// tricicle's source is writeup/ in a local project with no GitHub repo to sync from). Their pages load assets by
// relative path, so they must be served from /genie/, /pi/, /kuangrad/, /pseudo-jepa/, /privacy/ and /tricicle/ with
// the trailing slash (proxy.ts adds it). Next's own trailing-slash redirect
// is turned off and reapplied below for everything else.
const writeups = ["genie", "pi", "kuangrad", "pseudo-jepa", "privacy", "tricicle"];

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
