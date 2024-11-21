import { SourceProvider } from '@/generated/graphqlClient';
import { IconName } from '@/ui';

type MixedSourceProvider = SourceProvider | 'self';

export const sourceProviderLabel: Record<MixedSourceProvider, string> = {
  [SourceProvider.GITHUB]: 'GitHub',
  [SourceProvider.GITLAB]: 'GitLab',
  [SourceProvider.BITBUCKET]: 'Bitbucket',
  self: 'Self',
};

export const sourceProviderIcon: Record<MixedSourceProvider, IconName> = {
  [SourceProvider.GITHUB]: 'github',
  [SourceProvider.GITLAB]: 'gitlab',
  [SourceProvider.BITBUCKET]: 'bitbucket',
  self: 'person',
};
