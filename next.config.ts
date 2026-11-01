import type { NextConfig } from "next";

// Static export to `out/`, served by Cloudflare Workers static assets (see wrangler.jsonc).
const nextConfig: NextConfig = {
  output: "export",
  // next/image's default optimizer needs a server; files are served as-is.
  images: { unoptimized: true },
  // Two root layouts ((home) and (classic)) mean there's no single layout to
  // compose a 404 from, so the global 404 is its own standalone page.
  experimental: { globalNotFound: true },
};

export default nextConfig;
