import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { GitProvider } from '@/integrations/git/interfaces/GitProvider';

import { useGitProvider } from './useGitProvider';

export type UseGitRepositoryBranchesArgs = {
  provider: GitProvider.Name;
  accessToken: string;
} & GitProvider.GetRepositoryBranchesArgs;

export const useGitRepositoryBranches = ({
  provider,
  accessToken = '',
  ...args
}: UseGitRepositoryBranchesArgs) => {
  const gitProvider = useGitProvider({ provider, accessToken });

  const queryFn = useCallback(async () => {
    if (!gitProvider || accessToken.length === 0) {
      return [];
    }

    return gitProvider.getBranches(args);
  }, [gitProvider, accessToken, args]);

  return useQuery({
    queryKey: ['gitRepositoryBranches', provider, args, accessToken],
    queryFn,
  });
};
