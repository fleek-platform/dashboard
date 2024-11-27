import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { GitProvider } from '@/integrations/git/interfaces/GitProvider';

import { useGitProvider } from './useGitProvider';

export type UseGitUserAndOrganizationsArgs = {
  provider: GitProvider.Name;
  accessToken: string;
};

export const useGitUserAndOrganizations = ({ provider, accessToken }: UseGitUserAndOrganizationsArgs) => {
  const gitProvider = useGitProvider({ provider, accessToken });

  const queryFn = useCallback(async () => {
    if (!gitProvider) {
      return;
    }

    return gitProvider.getUserAndOrganizations();
  }, [gitProvider]);

  return useQuery({ queryKey: ['gitUserAndOrganizations', provider], queryFn });
};
