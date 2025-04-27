/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure Next.js to export static HTML/CSS/JS
  output: 'export',
  // Disable image optimization API for static export compatibility
  images: {
    unoptimized: true,
  },
  assetPrefix: './',
  // Optional: Set trailingSlash to true if needed for routing within the extension context
  // trailingSlash: true,
};

module.exports = nextConfig;
