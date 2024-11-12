/** @type {import('next').NextConfig} */
const nextConfig = {
  // eslint-disable-next-line no-process-env
  output: process.env.STANDALONE_RELEASE === 'true' ? 'standalone' : undefined,

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
