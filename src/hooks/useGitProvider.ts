import { useMemo } from 'react';

import type { GitProvider } from '@/integrations/git/interfaces/GitProvider';
import { GitHub } from '@/integrations/git/providers/GitHub';
import { MockedGitProvider } from '@/integrations/git/providers/MockedGitProvider';

export const useGitProvider = ({
  provider,
  accessToken,
}: {
  provider: GitProvider.Name;
  accessToken?: string;
}): GitProvider | undefined => {
  const providerHook = useMemo(() => {
    switch (provider) {
      case 'github':
        return useGithub;
      case 'gitlab':
      case 'bitbucket':
      default:
        return useMockedGitProvider; // TODO: remove mocked provider
    }
  }, [provider]);

  return providerHook({ accessToken });
};

const useGithub = ({
  accessToken,
}: { accessToken?: string }): GitHub | undefined => {
  const github = useMemo(() => {
    return new GitHub(accessToken || '');
  }, [accessToken]);

  return github;
};

const useMockedGitProvider = (): MockedGitProvider | undefined => {
  return new MockedGitProvider();
};
