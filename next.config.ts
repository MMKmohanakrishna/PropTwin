import type { NextConfig } from "next";

/**
 * Sub-path the site is served from, e.g. "/proptwin" for
 * https://<user>.github.io/proptwin/. Empty for a custom domain or localhost.
 * Set automatically by the GitHub Pages workflow.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/JS/CSS to `out/`.
  output: "export",
  // GitHub Pages serves folders, so emit /about/index.html for /about.
  trailingSlash: true,
  basePath,
  // Image resizing needs a server; serve images as-is.
  images: { unoptimized: true },
};

export default nextConfig;
