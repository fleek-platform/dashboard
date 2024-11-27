import { SourceProvider } from '@/generated/graphqlClient';
import { GitProvider } from '@/integrations/git';

type ParseAPISourceProviderArgs = SourceProvider | null | undefined;

export const parseAPISourceProvider = (sourceProvider?: ParseAPISourceProviderArgs): GitProvider.Name | undefined => {
  switch (sourceProvider) {
    case SourceProvider.GITHUB:
      return 'github';
    case SourceProvider.GITLAB:
      return 'gitlab';
    case SourceProvider.BITBUCKET:
      return 'bitbucket';
    default:
      return undefined;
  }
};
