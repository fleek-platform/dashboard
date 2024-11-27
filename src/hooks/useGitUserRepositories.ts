import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { GitProvider } from '@/integrations/git';

import { useGitProvider } from './useGitProvider';

export type UseGitUserRepositoriesArgs = {
  provider: GitProvider.Name;
  accessToken: string;
} & Partial<GitProvider.GetUserRepositoriesArgs>;

export const useGitUserRepositories = ({ provider, installationId, accessToken }: UseGitUserRepositoriesArgs) => {
  const gitProvider = useGitProvider({ provider, accessToken });

  const queryFn = useCallback(async () => {
    if (!gitProvider) {
      return;
    }

    if (!installationId) {
      return [];
    }

    return gitProvider.getUserRepositories({ installationId });
  }, [gitProvider, installationId]);

  return useQuery({ queryKey: ['gitUserRepositories', { provider, installationId, accessToken }], queryFn });
};
