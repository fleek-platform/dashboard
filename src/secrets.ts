/* eslint-disable no-process-env */

import { isServerSide } from '@/utils/isServerSide';

// TODO: Deprecate this file as it is not "secrets"
// Use a concepto closer to `getDefined`, with support for overrides

// The `process.env` variables starting with `NEXT_PUBLIC_` are inlined during the build process.
export const secrets = {
  TEST_MODE: Boolean(process.env.NEXT_PUBLIC_TEST_MODE),
  NEXT_PUBLIC_UI__WEB3AUTH_CLIENT_ID:
    process.env.NEXT_PUBLIC_UI__WEB3AUTH_CLIENT_ID!,
  NEXT_PUBLIC_UI__DYNAMIC_ENVIRONMENT_ID:
    process.env.NEXT_PUBLIC_UI__DYNAMIC_ENVIRONMENT_ID!,
  NEXT_PUBLIC_SDK__AUTHENTICATION_URL:
    process.env.NEXT_PUBLIC_SDK__AUTHENTICATION_URL!,
  NEXT_PUBLIC_UI__SITE_SLUG_DOMAIN:
    process.env.NEXT_PUBLIC_UI__SITE_SLUG_DOMAIN!,
  NEXT_PUBLIC_UI__FEEDBACK_FISH_PROJECT_ID:
    process.env.NEXT_PUBLIC_UI__FEEDBACK_FISH_PROJECT_ID!,
  NEXT_PUBLIC_UI__GTM_ID: process.env.NEXT_PUBLIC_UI__GTM_ID!,
  NEXT_PUBLIC_UI__LOG_ROCKET_ID: process.env.NEXT_PUBLIC_UI__LOG_ROCKET_ID!,
  NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL!,
  UPLOAD_PROXY_URL: process.env.NEXT_PUBLIC_UI__UPLOAD_PROXY_URL!,
  NEXT_PUBLIC_UI__LAUNCH_DARKLY_CLIENT_ID:
    process.env.NEXT_PUBLIC_UI__LAUNCH_DARKLY_CLIENT_ID!,
  STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_UI__STRIPE_PUBLIC_KEY!,
  COMMIT_HASH: process.env.NEXT_PUBLIC_UI__COMMIT_HASH,
  ZENDESK_PROXY_API: process.env.NEXT_PUBLIC_UI__ZENDESK_PROXY_API,
  FLEEK_REST_API_URL: process.env.NEXT_PUBLIC_UI_FLEEK_REST_API_URL,
  NEXT_PUBLIC_UI__POSTHOG_KEY: process.env.NEXT_PUBLIC_UI__POSTHOG_KEY,
  NEXT_PUBLIC_UI__POSTHOG_HOST: process.env.NEXT_PUBLIC_UI__POSTHOG_HOST,
  NEXT_PUBLIC_UI__UPLOAD_PROXY_API_URL:
    process.env.NEXT_PUBLIC_UI__UPLOAD_PROXY_API_URL,
  NEXT_PUBLIC_UI__INTERNAL_IPFS_STORAGE_HOSTNAME:
    process.env.NEXT_PUBLIC_UI__INTERNAL_IPFS_STORAGE_HOSTNAME,
  // TODO: Switch to app.fleek.xyz or whichever address
  // is decided as client facing. At the moment using *.on-fleek.app for prd
  NEXT_DASHBOARD_WEBSITE_URL: process.env.NEXT_DASHBOARD_WEBSITE_URL,
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
  NEXT_PUBLIC_ALLOW_LANDING_PAGE_LOGIN: 
    !!process.env.NEXT_ALLOW_LANDING_PAGE_LOGIN ||
    (!isServerSide() && window.location.hostname.includes('localhost')),
};

console.log(`[debug] secrets.ts: process.env.NEXT_PUBLIC_ALLOW_LANDING_PAGE_LOGIN= `, process.env.NEXT_PUBLIC_ALLOW_LANDING_PAGE_LOGIN)

console.log(`[debug] secrets.ts: secrets.NEXT_PUBLIC_ALLOW_LANDING_PAGE_LOGIN= `, secrets.NEXT_PUBLIC_ALLOW_LANDING_PAGE_LOGIN)

console.log(`[debug] secrets.ts: !!secrets.NEXT_PUBLIC_ALLOW_LANDING_PAGE_LOGIN= `, !!secrets.NEXT_PUBLIC_ALLOW_LANDING_PAGE_LOGIN)

export const getMutableSecrets = () => {
  if (!secrets.TEST_MODE) {
    return;
  }

  const mutableEnvironment: Record<string, string> = {};

  if (process.env.AUTHENTICATION_URL) {
    mutableEnvironment.NEXT_PUBLIC_SDK__AUTHENTICATION_URL =
      process.env.AUTHENTICATION_URL;
  }

  if (process.env.UPLOAD_PROXY_URL) {
    mutableEnvironment.UPLOAD_PROXY_URL = process.env.UPLOAD_PROXY_URL;
  }

  Object.assign(secrets, mutableEnvironment);

  return mutableEnvironment;
};
