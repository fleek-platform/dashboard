import { routes } from '@fleek-platform/utils-routes';

import Package from '../package.json';
import { secrets } from './secrets';
import {
  StorageProvider,
  StorageProviderValue,
} from './types/StorageProviders';

export const constants = {
  VERSION: Package.version,

  FIRST_PROJECT_NAME: 'First Project',
  DEFAULT_PROJECT_ID: 'new-project',

  EXTERNAL_LINK: {
    ENS_DOMAIN: 'https://app.ens.domains',
    FLEEK_HOME: 'https://fleek.xyz',
    FLEEK_CAREERS: 'https://wellfound.com/company/fleekhq/',
    FLEEK_DOCS: 'https://fleek.xyz/docs/',
    FLEEK_DOCS_PLATFORM: 'https://fleek.xyz/docs/platform/',
    FLEEK_DOCS_INFRASTRUCTURE: 'https://fleek.xyz/docs/infrastructure/',
    FLEEK_SUPPORT: 'https://support.fleek.xyz/hc/en-us',
    FLEEK_SUPPORT_NEW_TICKET: 'https://support.fleek.xyz/hc/en-us/requests/new',
    FLEEK_SUPPORT_TICKET:
      'https://support.fleek.xyz/hc/en-us/requests/new?ticket_form_id=16049246996237',
    FLEEK_SUPPORT_ABUSE:
      'https://support.fleek.xyz/hc/en-us/requests/new?ticket_form_id=16807535390093',
    FLEEK_DOCS_CLI: 'https://fleek.xyz/docs/cli/',
    FLEEK_DOCS_BASE_TEMPLATES: 'https://fleek.xyz/templates/',
    FLEEK_DOCS_SDK: 'https://fleek.xyz/docs/sdk/',
    FLEEK_GUIDES: 'https://fleek.xyz/guides/',
    FLEEK_DOCS_PROJECTS: 'https://fleek.xyz/docs/platform/projects/',
    FLEEK_DOCS_SITE_NAME: 'https://fleek.xyz/docs/platform/hosting/',
    FLEEK_DOCS_DELETE_SITE:
      'https://fleek.xyz/docs/platform/deployments#deleting-a-site',
    FLEEK_DOCS_DELETE_ACCOUNT:
      'https://fleek.xyz/docs/platform/accounts#deleting-an-account',
    FLEEK_DOCS_PURGE_CACHE:
      'https://fleek.xyz/docs/platform/deployments#purging-the-cache',
    FLEEK_DOCS_PRIVATE_GATEWAYS: 'https://fleek.xyz/docs/platform/gateways/',
    FLEEK_DOCS_PROJECT_NAME:
      'https://fleek.xyz/docs/platform/projects#changing-project-name',
    FLEEK_DOCS_DELETE_PROJECT:
      'https://fleek.xyz/docs/platform/projects#deleting-a-project',
    FLEEK_DOCS_CUSTOM_DOMAIN:
      'https://fleek.xyz/docs/platform/domains#adding-a-custom-domain',
    FLEEK_DOCS_ENS_NAME: 'https://fleek.xyz/docs/platform/domains#ens',
    FLEEK_DOCS_BUILD_SETTINGS:
      'https://fleek.xyz/docs/platform/hosting#configure-your-build-settings',
    FLEEK_DOCS_TEAM_PROJECT_MEMBERS:
      'https://fleek.xyz/docs/platform/projects#invitations',
    FLEEK_DOCS_DEPLOY_CONTEXTS:
      'https://fleek.xyz/docs/platform/deployments#configure-your-build-settings',
    FLEEK_DOCS_USERNAME: 'https://fleek.xyz/docs/platform/accounts#usernames',
    FLEEK_DOCS_TEMPLATES:
      'https://fleek.xyz/docs/platform/frameworks#using-framework-templates-to-get-started',
    FLEEK_DOCS_EMAIL:
      'https://fleek.xyz/docs/platform/accounts#email-addresses',
    FLEEK_DOCS_PAT:
      'https://fleek.xyz/docs/platform/accounts#personal-access-tokens-pats',
    FLEEK_DOCS_CLOUD_STORAGE: 'https://fleek.xyz/docs/platform/storage/',
    FLEEK_DOCS_ENVIRONMENT_VARIABLES:
      'https://fleek.xyz/docs/platform/deployments#configure-your-build-settings',
    FLEEK_DOCS_TOS: 'https://fleek.xyz/legal/terms-of-service/',
    FLEEK_DOCS_PRIVACY: 'https://fleek.xyz/legal/privacy-policy',
    FLEEK_BLOG: 'https://fleek.xyz/blog/',
    FLEEK_DISCORD: 'https://discord.gg/fleek',
    FLEEK_TWITTER: 'https://x.com/fleek',
    FLEEK_GITHUB: 'https://github.com/fleek-platform',
    FLEEK_GET_DEMO:
      'https://support.fleek.xyz/hc/en-us/requests/new?ticket_form_id=16049464260109',
    FLEEK_STATUS: 'https://status.fleek.xyz/',
    FLEEK_PRICING: 'https://fleek.xyz/pricing/',
    FLEEK_NETWORK: 'https://fleek.network/',
    FLEEK_CHANGELOG: 'https://fleek.xyz/changelog/',
    FLEEK_DOCS_LOGIN_CONNECTIONS:
      'https://fleek.xyz/docs/platform/accounts#log-in-methods',
    FLEEK_DOCS_SELF_MANAGED_SITE:
      'https://fleek.xyz/docs/platform/hosting#self-managed-deployments',
    THREE_DNS_BUY_DOMAIN: 'https://app.3dns.box/',
    FLEEK_DOCS_APPLICATION_CREDENTIALS:
      'https://fleek.xyz/docs/sdk#applicationaccesstokenservice',
    FLEEK_DOCS_DNS_LINK: 'https://fleek.xyz/docs/platform/domains#dns',
    FLEEK_DOCS_2FA_EDIT:
      'https://fleek.xyz/docs/platform/security-with-2fa#managing-two-factor-authentication',
    FLEEK_DOCS_2FA_SETUP:
      'https://fleek.xyz/docs/platform/security-with-2fa#configuring-two-factor-authentication',
    FLEEK_DOCS_2FA_RECOVERY_CODES:
      'https://fleek.xyz/docs/platform/security-with-2fa#configuring-two-factor-authentication',
    FLEEK_DOCS_2FA_ACTIONS:
      'https://fleek.xyz/docs/platform/security-with-2fa#two-factor-authentication-settings',
    FLEEK_DOCS_FUNCTIONS_LEARN_MORE:
      'https://fleek.xyz/docs/platform/fleek-functions/',
    FLEEK_DOCS_FUNCTIONS_FUTURE:
      'https://fleek.xyz/docs/platform/fleek-functions#moving-fleek-functions-from-alpha-to-production',
    FLEEK_DOCS_GIT_INTEGRATIONS:
      'https://fleek.xyz/docs/platform/git_integrations/',
    FLEEK_DOCS_IPFS: 'https://docs.ipfs.tech/',
    MEDIA_KIT:
      'https://fleek.notion.site/Fleek-Brand-Kit-9a2bcf7eb40740a9b7e951fc951b478a',
  },

  ASSET_URL: {
    FRAMEWORK_LOGOS: {
      REACT: '/assets/framework-logos/react.svg',
      VUE: '/assets/framework-logos/vue.svg',
      SVELTE: '/assets/framework-logos/svelte.svg',
      HUGO: '/assets/framework-logos/hugo.svg',
      GATSBY: '/assets/framework-logos/gatsby.svg',
      GRIDSOME: '/assets/framework-logos/gridsome.svg',
      MKDOCS: '/assets/framework-logos/mkdocs.png',
      NEXT: '/assets/framework-logos/next.svg',
      WASMPACK: '/assets/framework-logos/wasm.svg',
      NUXT: '/assets/framework-logos/nuxt.svg',
      WORDPRESS: '/assets/framework-logos/wordpress.svg',
      SAPPER: '/assets/framework-logos/sapper.svg',
      JEKYLL: '/assets/framework-logos/jekyll.svg',
      VITE: '/assets/framework-logos/vite.svg',
      ASTRO: '/assets/framework-logos/astro.svg',
    },
    ETHEREUM_LOGO: '/assets/ethereum.svg',
    GITHUB: '/assets/github.svg',
    MAIL_LOGO: '/assets/mail.svg',
    VIDEOS: {
      FLASH_HEADER_SAFARI: '/assets/videos/flash-header-safari.mp4',
      FLASH_HEADER_CHROME: '/assets/videos/flash-header-chrome.webm',
    },
  },

  FLEEK_BLOG_API: {
    postsAPI: 'https://fleek.xyz/api/latestBlogPosts.json',
    baseUrl: 'https://fleek.xyz/blog/',
    imageBaseUrl: 'https://fleek.xyz/',
  },

  FLEEK_STATUS_API: 'https://status.fleek.xyz/api/v2/status.json',

  FILES_PAGE_SIZE: 50,
  DEPLOYMENTS_PAGE_SIZE: 20,
  SITES_PAGE_SIZE: 21,
  FUNCTIONS_PAGE_SIZE: 25,
  FUNCTIONS_MAX_DISPLAY_BYTES: 5000,
  AI_AGENTS_PAGE_SIZE: 20,

  DEFAULT_DATE_FORMAT_FALLBACK: '-',
  MAX_LOGO_SIZE: 5 * 1024 * 1024, // 5MB

  MAX_FILE_FOLDER_SIZE: 4 * 1024 * 1024 * 1024, // 4GB

  REGEX_HIDDEN_FILES: /^(?!\.).*/,

  ALREADY_IN_USE: 'already in use',

  FORM_STATUS: {
    VALIDATING: 'validating',
    INVALID: 'invalid',
  },

  IPFS_GATEWAYS: {
    IPFS_IO: 'ipfs.io',
    DWEB_LINK: 'dweb.link',
    FLEEK_COOL: 'fleek.cool',
    FLEEK_GW: 'flk-ipfs.xyz',
    FLEEK_TEST: 'fleek-test.network/services/0',
  },

  ENS_TEXTS: {
    AUTOMATIC_DISABLED: {
      DEFAULT:
        'Automatic ENS setup is disabled, login with the wallet that owns the ENS name to enable it.',
      WALLET_HAS_LINKED:
        'Automatic ENS setup is disabled, the current wallet connected does not own the ENS name',
    },
    WALLET_LOGGED_LINKED_WALLET:
      'You are currently connected to a wallet that does not own the ENS name. Another wallet linked to your Fleek account owns the ENS name, switch to that wallet to proceed.',
    WALLET_LOGGED_NO_LINKED_WALLET:
      'You are currently connected to a wallet that does not own the ENS name. Connect the wallet that owns the ENS name to proceed.',
    EMAIL_LOGGED_NO_LINKED_WALLET:
      'You are currently logged into Fleek with an email account that has no wallets connected. Connect the wallet that owns the ENS to proceed.',
    EMAIL_LOGGED_LINKED_WALLET:
      'You are currently logged into Fleek with an email account. A wallet linked to your Fleek account owns the ENS name, switch to that wallet to proceed.',
  },

  DNS_NAME: {
    DNS_LINK: '_dnslink',
    REGULAR: 'hostname',
  },

  AVATAR: {
    SIZE: 80,
  },

  CLI_COMMANDS: {
    INSTALL: 'npm install -g @fleek-platform/cli',
    LOGIN: 'fleek login',
    PROJECT_SWITCH: 'fleek projects switch',
    CD_SITE: 'cd <your-site>',
    CI: 'fleek sites ci',
    SITE_DEPLOY: 'fleek sites deploy',
  },

  PERMISSION: {
    PROJECT: {
      DELETE: 'PROJECT_DELETE',
      EDIT_NAME: 'PROJECT_EDIT_NAME',
      EDIT_AVATAR: 'PROJECT_EDIT_AVATAR',
      EDIT_ACCESS_FROM_OFAC_COUNTRIES:
        'PROJECT_EDIT_ACCESS_FROM_OFAC_COUNTRIES',
    },
    STORAGE: {
      UPLOAD: 'STORAGE_UPLOAD',
      EDIT_SETTINGS: 'STORAGE_EDIT_SETTINGS',
      EDIT_NAME: 'STORAGE_EDIT_NAME',
      DELETE: 'STORAGE_DELETE',
      VIEW_INFORMATION: 'STORAGE_VIEW_INFORMATION',
      VIEW_LIST: 'STORAGE_VIEW_LIST',
    },
    PRIVATE_GATEWAY: {
      CREATE: 'PRIVATE_GATEWAY_CREATE',
      UPDATE: 'PRIVATE_GATEWAY_UPDATE_NAME',
      DELETE: 'PRIVATE_GATEWAY_DELETE',
      ADD_AND_VERIFY_DOMAIN: 'PRIVATE_GATEWAY_ADD_AND_VERIFY_DOMAIN',
      CHANGE_PRIMARY_DOMAIN: 'PRIVATE_GATEWAY_CHANGE_PRIMARY_DOMAIN',
      REMOVE_DOMAIN: 'PRIVATE_GATEWAY_DELETE_DOMAIN',
      VIEW: 'PRIVATE_GATEWAY_VIEW',
    },
    APPLICATION_CREDENTIALS: {
      VIEW: 'APPLICATION_VIEW',
      CREATE: 'APPLICATION_CREATE',
      EDIT: 'APPLICATION_EDIT',
    },
    SITE: {
      CREATE: 'SITE_CREATE',
      DEPLOY: 'SITE_DEPLOY',
      VIEW_OVERVIEW: 'SITE_VIEW_OVERVIEW',
      VIEW_BUILD_SETTINGS: 'SITE_VIEW_BUILD_SETTINGS',
      EDIT_BUILD_SETTINGS: 'SITE_EDIT_BUILD_SETTINGS',
      VIEW_ENV_VARIABLES: 'SITE_VIEW_ENV_VARIABLES',
      EDIT_ENV_VARIABLES: 'SITE_EDIT_ENV_VARIABLES',
      VIEW_DEPLOYMENTS: 'SITE_VIEW_DEPLOYMENTS',
      VIEW_ANALYTICS: 'SITE_VIEW_ANALYTICS',
      EDIT_NAME: 'SITE_EDIT_NAME',
      EDIT_SLUG: 'SITE_EDIT_SLUG',
      EDIT_AVATAR: 'SITE_EDIT_AVATAR',
      PURGE_CACHE: 'SITE_PURGE_CACHE',
      DELETE: 'SITE_DELETE',
      ADD_AND_VERIFY_DOMAIN: 'SITE_ADD_AND_VERIFY_DOMAIN',
      CHANGE_PRIMARY_DOMAIN: 'SITE_CHANGE_PRIMARY_DOMAIN',
      DELETE_DOMAIN: 'SITE_DELETE_DOMAIN',
      ADD_AND_VERIFY_ENS: 'SITE_ADD_AND_VERIFY_ENS',
      DELETE_ENS: 'SITE_DELETE_ENS',
      ADD_GIT_INTEGRATION: 'SITE_ADD_GIT_INTEGRATION',
      REMOVE_GIT_INTEGRATION: 'SITE_REMOVE_GIT_INTEGRATION',
    },
    FUNCTIONS: {
      CREATE: 'FUNCTION_CREATE',
      DEPLOY: 'FUNCTION_DEPLOY',
      EDIT_SETTINGS: 'FUNCTION_EDIT_SETTINGS',
      DELETE: 'FUNCTION_DELETE',
      VIEW: 'FUNCTION_VIEW',
    },
    BILLING: {
      VIEW: 'BILLING_VIEW',
      MANAGE: 'BILLING_MANAGE',
    },
    TEAM: {
      VIEW: 'MEMBER_TEAM_VIEW',
      INVITE: 'MEMBER_INVITE',
      CHANGE_PERMISSIONS: 'MEMBER_CHANGE_PERMISSIONS',
      ASSIGN_OWNER: 'MEMBER_ASSIGN_OWNER',
      DELETE_EXCEPT_OWNER: 'MEMBER_DELETE_OTHERS',
    },
    TEMPLATE: {
      CREATE: 'TEMPLATE_CREATE',
    },
    AGENTS_AI: {
      CREATE: 'AGENT_CREATE',
      LIST: 'AGENT_VIEW_LIST',
      VIEW: 'AGENT_VIEW',
      EDIT: 'AGENT_UPDATE',
      DELETE: 'AGENT_DELETE',
    },
  },

  NO_PERMISSION_MESSAGE:
    "You don't have permission to do this, contact an owner to adjust your permissions",

  CONTRACTS: {
    ENS_REGISTAR_CONTROLLER:
      '0x253553366Da8546fC250F225fe3d25d0C782303b' as `0x${string}`,
  },

  BILLING: {
    DEFAULT_CRYPTO_TOKEN: 'USDC',
  },

  STORAGE_PROVIDERS: {
    arweave: {
      value: 'arweave',
      label: 'Arweave',
      icons: ['arweave'],
    },
    filecoin: {
      value: 'filecoin',
      label: 'Filecoin',
      icons: ['filecoin'],
      disclaimer:
        'Filecoin Deal ID’s can take up to 48 hours to propagate and display per file.',
    },
    all: {
      value: 'all',
      label: 'Filecoin & Arweave',
      icons: ['filecoin', 'arweave'],
      disclaimer:
        'Filecoin Deal ID’s can take up to 48 hours to propagate and display per file.',
    },
  } satisfies Record<StorageProviderValue, StorageProvider>,

  PUBLIC_ROUTES: [
    routes.paymentCallback(),
    routes.githubCallback(),
    routes.home(),
    routes.template.list(),
    routes.template.indexed({ templateId: '[templateId]' }),
    routes.migration(),
    routes.ipfsPropagation.index(),
    routes.billing.plans(),
    routes.login.cli({ verificationSessionId: '[verificationSessionId]' }),
  ],
  ZENDESK: {
    PROXY_BASE: secrets.ZENDESK_PROXY_API,
    ROUTES: {
      HEALTH: '/health',
    },
  },

  IPFS_PROPAGATION_TOOL: {
    GATEWAY_TEST_TIMEOUT: 60000,
    DEFAULT_IPFS_HASHES: [
      'bafybeic3nmuprwqqgbpzskmihjyjcbojz7phir47rdwcknklixcbppp7e4',
      'bafybeibmf5fyj72h5puxu6eonhh4gsjjbzwehssusjymtf4bhk7jctp7ki',
      'bafybeig5yg5pribf5zhzfoey5xosgae4rhqocesbluxjt6ssnaber3bqay',
    ],
    DEFAULT_PUBLIC_GATEWAYS: [
      'flk-ipfs.xyz',
      'gateway.pinata.cloud',
      'dweb.link',
      'ipfs.eth.aragon.network',
      'nftstorage.link',
      'ipfs.io',
      'gateway.ipfs.io',
      'w3s.link',
    ],
  },

  ANNOUNCEMENT_BANNER: {
    LOCAL_STORAGE_KEY: 'announcementDismissed',
    ID: 'fleek-eliza',
    MESSAGE: 'Introducing Fleek AI agent creation and hosting',
    HREF: 'https://fleek.xyz/docs/ai-agents/',
  },
};
