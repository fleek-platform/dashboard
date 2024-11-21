import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { GitProvider } from '@/integrations/git/interfaces/GitProvider';

import { useGitProvider } from './useGitProvider';
import { useSiteFrameworks } from './useSiteFrameworks';

export type UseGitRepositoryBuildSettingsArgs = {
  provider: GitProvider.Name;
  accessToken: string;
  pause?: boolean;
} & Partial<GitProvider.GetRepositoryBuildSettingsArgs>;

export const useGitRepositoryBuildSettings = ({
  provider,
  accessToken,
  pause,
  ...args
}: UseGitRepositoryBuildSettingsArgs) => {
  const gitProvider = useGitProvider({ provider, accessToken });
  const siteFrameworks = useSiteFrameworks();

  const frameworks = useMemo(
    () => siteFrameworks.data || [],
    [siteFrameworks.data],
  );

  const queryFn = useCallback(async () => {
    if (!gitProvider || !args.slug || !args.repository) {
      return;
    }

    return gitProvider.getRepositoryBuildSettings({
      slug: args.slug,
      repository: args.repository,
      ref: args.ref,
      frameworks,
      baseDirectory: args.baseDirectory,
    });
  }, [gitProvider, args, frameworks]);

  return useQuery({
    queryKey: ['gitRepositoryBuildSettings', provider, ...Object.values(args)],
    queryFn,
    enabled: !pause && frameworks.length > 0,
  });
};
