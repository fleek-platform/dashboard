export type Defined = {
  NEXT_PUBLIC_SDK__AUTHENTICATION_URL?: string;
  NEXT_PUBLIC_UI_FLEEK_REST_API_URL?: string;
  NEXT_PUBLIC_UI__DYNAMIC_ENVIRONMENT_ID?: string;
  NEXT_PUBLIC_UI__GTM_ID?: string;
  NEXT_PUBLIC_UI__POSTHOG_HOST?: string;
  NEXT_PUBLIC_UI__POSTHOG_KEY?: string;
  NEXT_PUBLIC_UI__SITE_SLUG_DOMAIN?: string;
  NEXT_PUBLIC_UI__STRIPE_PUBLIC_KEY?: string;
  NEXT_PUBLIC_UI__ZENDESK_PROXY_API?: string;
  NEXT_PUBLIC_ZENDESK_PROXY_HOSTNAME?: string;
  NEXT_PUBLIC_UI__UPLOAD_PROXY_API_URL?: string;
  NEXT_PUBLIC_UI__INTERNAL_IPFS_STORAGE_HOSTNAME?: string;
  NEXT_PUBLIC_WEBSITE_URL?: string;
  NEXT_PUBLIC_DASHBOARD_BASE_PATH?: string;
  NEXT_PUBLIC_AGENTS_AI_PATH?: string;
  NEXT_PUBLIC_ALLOW_LANDING_PAGE_LOGIN?: string;
  NEXT_PUBLIC_BILLING_FREE_PLAN_DEPRECATION_DATE?: string;
  NEXT_PUBLIC_UI__COMMIT_HASH?: string;
};

export const defined: Defined = {
  NEXT_PUBLIC_SDK__AUTHENTICATION_URL:
    process.env.NEXT_PUBLIC_SDK__AUTHENTICATION_URL,
  NEXT_PUBLIC_UI_FLEEK_REST_API_URL:
    process.env.NEXT_PUBLIC_UI_FLEEK_REST_API_URL,
  NEXT_PUBLIC_UI__DYNAMIC_ENVIRONMENT_ID:
    process.env.NEXT_PUBLIC_UI__DYNAMIC_ENVIRONMENT_ID,
  NEXT_PUBLIC_UI__GTM_ID: process.env.NEXT_PUBLIC_UI__GTM_ID,
  NEXT_PUBLIC_UI__POSTHOG_HOST: process.env.NEXT_PUBLIC_UI__POSTHOG_HOST,
  NEXT_PUBLIC_UI__POSTHOG_KEY: process.env.NEXT_PUBLIC_UI__POSTHOG_KEY,
  NEXT_PUBLIC_UI__SITE_SLUG_DOMAIN:
    process.env.NEXT_PUBLIC_UI__SITE_SLUG_DOMAIN,
  NEXT_PUBLIC_UI__STRIPE_PUBLIC_KEY:
    process.env.NEXT_PUBLIC_UI__STRIPE_PUBLIC_KEY,
  NEXT_PUBLIC_UI__ZENDESK_PROXY_API:
    process.env.NEXT_PUBLIC_UI__ZENDESK_PROXY_API,
  NEXT_PUBLIC_ZENDESK_PROXY_HOSTNAME:
    process.env.NEXT_PUBLIC_ZENDESK_PROXY_HOSTNAME,
  NEXT_PUBLIC_UI__UPLOAD_PROXY_API_URL:
    process.env.NEXT_PUBLIC_UI__UPLOAD_PROXY_API_URL,
  NEXT_PUBLIC_UI__INTERNAL_IPFS_STORAGE_HOSTNAME:
    process.env.NEXT_PUBLIC_UI__INTERNAL_IPFS_STORAGE_HOSTNAME,
  NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
  NEXT_PUBLIC_DASHBOARD_BASE_PATH: process.env.NEXT_PUBLIC_DASHBOARD_BASE_PATH,
  NEXT_PUBLIC_AGENTS_AI_PATH: process.env.NEXT_PUBLIC_AGENTS_AI_PATH,
  NEXT_PUBLIC_ALLOW_LANDING_PAGE_LOGIN:
    process.env.NEXT_PUBLIC_ALLOW_LANDING_PAGE_LOGIN,
  NEXT_PUBLIC_BILLING_FREE_PLAN_DEPRECATION_DATE:
    process.env.NEXT_PUBLIC_BILLING_FREE_PLAN_DEPRECATION_DATE,
  NEXT_PUBLIC_UI__COMMIT_HASH: process.env.NEXT_PUBLIC_UI__COMMIT_HASH,
};

export const getDefined = (key: keyof typeof defined): string => {
  const value = defined[key];

  if (value === undefined || value === null) {
    throw new Error(
      `Expected key "${key}" to be defined but got ${typeof value}`,
    );
  }

  if (typeof value !== 'string') {
    throw new Error(
      `Expected key "${key}" to be string but got ${typeof value}`,
    );
  }

  return value;
};

export const setDefined = (settings: Partial<Defined>) => {
  Object.keys(settings).forEach(key => {
    if (key in defined) {
      defined[key as keyof Defined] = settings[key as keyof Defined];
    }
  });
};

export const DEFINED_OVERRIDES_FILENAME = 'defined_overrides.json';
