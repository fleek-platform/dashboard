type Theme = 'dark' | 'light';

const sections = [
  'hosting',
  'storage',
  'functions',
  'billing',
  'team',
] as const;
export type Section = (typeof sections)[number];

type EmptyStateIllustrationsProps = {
  [T in Theme]: Record<
    Section,
    `/assets/static/${T}/empty-state/${Section}.webp`
  >;
};

export const emptyStateIllustrations: EmptyStateIllustrationsProps = {
  light: {
    hosting: '/assets/static/light/empty-state/hosting.webp',
    storage: '/assets/static/light/empty-state/storage.webp',
    functions: '/assets/static/light/empty-state/functions.webp',
    billing: '/assets/static/light/empty-state/billing.webp',
    team: '/assets/static/light/empty-state/team.webp',
  },
  dark: {
    hosting: '/assets/static/dark/empty-state/hosting.webp',
    storage: '/assets/static/dark/empty-state/storage.webp',
    functions: '/assets/static/dark/empty-state/functions.webp',
    billing: '/assets/static/dark/empty-state/billing.webp',
    team: '/assets/static/dark/empty-state/team.webp',
  },
} as const;
