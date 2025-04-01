// TODO: Now that defined's available
// replace the need to use "secrets"
import { getDefined } from './defined';
import { isServerSide } from '@/utils/isServerSide';

// TODO: Deprecate this file as it is not "secrets"
// Use a concept closer to `getDefined`, with support for overrides

export const secrets = {
  TEST_MODE: Boolean(process.env.NEXT_PUBLIC_TEST_MODE), // Keeping this as is since it might not be in defined.ts
  NEXT_PUBLIC_UI__WEB3AUTH_CLIENT_ID: getDefined('NEXT_PUBLIC_UI__WEB3AUTH_CLIENT_ID'),
  NEXT_PUBLIC_UI__DYNAMIC_ENVIRONMENT_ID: getDefined('NEXT_PUBLIC_UI__DYNAMIC_ENVIRONMENT_ID'),
  NEXT_PUBLIC_SDK__AUTHENTICATION_URL: getDefined('NEXT_PUBLIC_SDK__AUTHENTICATION_URL'),
  NEXT_PUBLIC_UI__SITE_SLUG_DOMAIN: getDefined('NEXT_PUBLIC_UI__SITE_SLUG_DOMAIN'),
  NEXT_PUBLIC_UI__FEEDBACK_FISH_PROJECT_ID: getDefined('NEXT_PUBLIC_UI__FEEDBACK_FISH_PROJECT_ID'),
  NEXT_PUBLIC_UI__GTM_ID: getDefined('NEXT_PUBLIC_UI__GTM_ID'),
  NEXT_PUBLIC_UI__LOG_ROCKET_ID: getDefined('NEXT_PUBLIC_UI__LOG_ROCKET_ID'),
  NEXT_PUBLIC_WEBSITE_URL: getDefined('NEXT_PUBLIC_WEBSITE_URL'),
  UPLOAD_PROXY_URL: getDefined('NEXT_PUBLIC_UI__UPLOAD_PROXY_API_URL'), // Note: variable name mismatch, using the one from defined.ts
  NEXT_PUBLIC_UI__LAUNCH_DARKLY_CLIENT_ID: getDefined('NEXT_PUBLIC_UI__LAUNCH_DARKLY_CLIENT_ID'),
  STRIPE_PUBLIC_KEY: getDefined('NEXT_PUBLIC_UI__STRIPE_PUBLIC_KEY'),
  COMMIT_HASH: process.env.NEXT_PUBLIC_UI__COMMIT_HASH, // Keeping as is since it might be optional
  ZENDESK_PROXY_API: getDefined('NEXT_PUBLIC_UI__ZENDESK_PROXY_API'),
  FLEEK_REST_API_URL: getDefined('NEXT_PUBLIC_UI_FLEEK_REST_API_URL'),
  NEXT_PUBLIC_UI__POSTHOG_KEY: getDefined('NEXT_PUBLIC_UI__POSTHOG_KEY'),
  NEXT_PUBLIC_UI__POSTHOG_HOST: getDefined('NEXT_PUBLIC_UI__POSTHOG_HOST'),
  NEXT_PUBLIC_UI__UPLOAD_PROXY_API_URL: getDefined('NEXT_PUBLIC_UI__UPLOAD_PROXY_API_URL'),
  NEXT_PUBLIC_UI__INTERNAL_IPFS_STORAGE_HOSTNAME: getDefined('NEXT_PUBLIC_UI__INTERNAL_IPFS_STORAGE_HOSTNAME'),
  // TODO: Switch to app.fleek.xyz or whichever address
  // is decided as client facing. At the moment using *.on-fleek.app for prd
  NEXT_PUBLIC_DASHBOARD_WEBSITE_URL: getDefined('NEXT_PUBLIC_DASHBOARD_WEBSITE_URL'),
  NEXT_PUBLIC_BASE_PATH: getDefined('NEXT_PUBLIC_BASE_PATH'),
  NEXT_PUBLIC_BILLING_FREE_PLAN_DEPRECATION_DATE: getDefined('NEXT_PUBLIC_BILLING_FREE_PLAN_DEPRECATION_DATE'),
  NEXT_PUBLIC_ALLOW_LANDING_PAGE_LOGIN:
    getDefined('NEXT_PUBLIC_ALLOW_LANDING_PAGE_LOGIN') === 'true' ||
    (!isServerSide() && window.location.hostname.includes('localhost')),
  NEXT_PUBLIC_AGENTS_AI_PATH: getDefined('NEXT_PUBLIC_AGENTS_AI_PATH'),
};

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
