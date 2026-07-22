/** @type {import('next').NextConfig} */

// Project is served from https://<user>.github.io/car-perfume/ on GitHub Pages.
// basePath/assetPrefix are only applied for production builds so `next dev` stays at "/".
const isProd = process.env.NODE_ENV === "production";
const repo = "car-perfume";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  images: { unoptimized: true },
};

export default nextConfig;
