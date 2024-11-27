import { SourceProvider } from '@/generated/graphqlClient';
import { SiteSourceProvider } from '@/types/Site';

type GetAPISourceProviderArgs = SiteSourceProvider;

export const getAPISourceProvider = (
  sourceProvider?: GetAPISourceProviderArgs,
): SourceProvider | undefined => {
  switch (sourceProvider) {
    case 'github':
      return SourceProvider.GITHUB;
    case 'gitlab':
      return SourceProvider.GITLAB;
    case 'bitbucket':
      return SourceProvider.BITBUCKET;
    default:
      return;
  }
};
