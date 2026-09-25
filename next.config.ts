import type { NextConfig } from "next";

// Default: static export to `out/` for Cloudflare Workers static assets.
// The Dockerfile sets NEXT_OUTPUT=standalone to build the Node server instead.
const standalone = process.env.NEXT_OUTPUT === "standalone";

const nextConfig: NextConfig = standalone
  ? { output: "standalone" }
  : {
      output: "export",
      // next/image's default optimizer needs a server; serve images as-is.
      images: { unoptimized: true },
    };

export default nextConfig;
