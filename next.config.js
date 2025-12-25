/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove swcMinify as it's deprecated in Next.js 15+
  // swcMinify is now enabled by default
  images: {
    unoptimized: true,
  },
  // Add transpilePackages for ReactFlow
  transpilePackages: ['reactflow'],
  // Disable Turbopack for production if needed
  experimental: {
    // Remove if you want to keep Turbopack
    // turbo: {
    //   rules: {
    //     '*.svg': {
    //       loaders: ['@svgr/webpack'],
    //       as: '*.js',
    //     },
    //   },
    // },
  },
};

module.exports = nextConfig;