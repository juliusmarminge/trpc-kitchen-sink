// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
    // mdxRs: true,
    typedRoutes: true,
  },
};

module.exports = withContentlayer(nextConfig);
