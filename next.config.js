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
  redirects: async () => [
    { source: '/docs', destination: '/docs/introduction', permanent: true },
    { source: '/docs/', destination: '/docs/introduction', permanent: true },
  ],
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
      ],
    },
  ],
};

module.exports = withContentlayer(nextConfig);
