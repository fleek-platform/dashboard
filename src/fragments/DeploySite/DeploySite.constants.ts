import { SiteSourceProvider } from '@/types/Site';
import { IconName } from '@/ui';

export const sourceProviderLabel: Record<SiteSourceProvider, string> = {
  github: 'GitHub',
  gitlab: 'GitLab',
  bitbucket: 'Bitbucket',
  self: 'Self',
};

export const sourceProviderIcon: Record<SiteSourceProvider, IconName> = {
  github: 'github',
  gitlab: 'gitlab',
  bitbucket: 'bitbucket',
  self: 'person',
};
