// Simplest method to generate a single index.html
// WARNING: This has been deprecated
// https://nextjs.org/docs/pages/api-reference/config/next-config-js/exportPathMap
const exportPathMap = async () => {
  return {
    '/': { page: '/' }
  };
};

const requiredEnvs = [
  'NEXT_PUBLIC_DASHBOARD_WEBSITE_URL',
  'NEXT_PUBLIC_SDK__AUTHENTICATION_URL',
  'NEXT_PUBLIC_UI_FLEEK_REST_API_URL',
  'NEXT_PUBLIC_UI__DYNAMIC_ENVIRONMENT_ID',
  'NEXT_PUBLIC_UI__FEEDBACK_FISH_PROJECT_ID',
  'NEXT_PUBLIC_UI__GTM_ID',
  'NEXT_PUBLIC_UI__INTERNAL_IPFS_STORAGE_HOSTNAME',
  'NEXT_PUBLIC_UI__LAUNCH_DARKLY_CLIENT_ID',
  'NEXT_PUBLIC_UI__LOG_ROCKET_ID',
  'NEXT_PUBLIC_UI__POSTHOG_HOST',
  'NEXT_PUBLIC_UI__POSTHOG_KEY',
  'NEXT_PUBLIC_UI__SITE_SLUG_DOMAIN',
  'NEXT_PUBLIC_UI__STRIPE_PUBLIC_KEY',
  'NEXT_PUBLIC_UI__UPLOAD_PROXY_API_URL',
  'NEXT_PUBLIC_UI__WEB3AUTH_CLIENT_ID',
  'NEXT_PUBLIC_UI__ZENDESK_PROXY_API',
  'NEXT_PUBLIC_WEBSITE_URL',
  'NEXT_PUBLIC_ZENDESK_PROXY_HOSTNAME',
  'NEXT_PUBLIC_BILLING_FREE_PLAN_DEPRECATION_DATE',
];

const missingEnvs = requiredEnvs.filter(env => !process.env[env]);

if (missingEnvs.length > 0) {
  throw new Error(`
    👹 Oops! Missing required environment variables ${missingEnvs.join('\n    ')}
  `);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  exportPathMap,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
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
