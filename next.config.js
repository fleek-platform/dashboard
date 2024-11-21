/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

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
