import type { NextConfig } from "next";

// Static export to `out/`, served by Cloudflare Workers static assets (see wrangler.jsonc).
const nextConfig: NextConfig = {
  output: "export",
  // next/image's default optimizer needs a server; files are served as-is.
  images: { unoptimized: true },
};

export default nextConfig;
