// Simplest method to generate a single index.html
// WARNING: This has been deprecated
// https://nextjs.org/docs/pages/api-reference/config/next-config-js/exportPathMap
const exportPathMap = async () => {
  return {
    '/': { page: '/' }
  };
};


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  exportPathMap,
  // TODO: replace instances of next/image'
  // or do image optimization on build
  // by utilizing a different method
  images: {
    unoptimized: true
  },
  reactStrictMode: true,
  swcMinify: false,
  trailingSlash: true,
  experimental: {
    esmExternals: true,
  },
  // TODO: Check if build time lowers
  // as long it doesn't cause issues
  outputFileTracing: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      return {
        ...config,
        module: {
          ...config.module,
          unknownContextCritical: false,
          exprContextCritical: false,
        },
        resolve: {
          ...config.resolve,
          fallback: {
            ...config.resolve.fallback,
            fs: false,
            tls: false,
            net: false,
          },
        },
      };
    }

    return {
      ...config,
    };
  },
};

module.exports = nextConfig;
