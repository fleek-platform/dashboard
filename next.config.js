// TODO: Create project config/settings
// The fleek sites dashboard basepath
const basePath = '/dashboard';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  assetPrefix: basePath,
  output: 'export',
  // TODO: replace instances of next/image'
  // or do image optimization on build
  // by utilizing a different method
  images: {
    unoptimized: true
  },
  reactStrictMode: true,
  swcMinify: false,
  trailingSlash: true,
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
