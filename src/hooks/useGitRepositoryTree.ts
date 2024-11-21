import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import type { GitProvider } from '@/integrations/git/interfaces/GitProvider';

import { useGitProvider } from './useGitProvider';

export type UseGitRepositoryTreeArgs = {
  provider: GitProvider.Name;
  pause?: boolean;
  accessToken: string;
} & Partial<GitProvider.GetTreeArgs>;

export const useGitRepositoryTree = ({
  provider,
  pause,
  accessToken = '',
  ...args
}: UseGitRepositoryTreeArgs) => {
  const gitProvider = useGitProvider({ provider, accessToken });

  const queryFn = useCallback(async () => {
    if (
      !gitProvider ||
      accessToken.length === 0 ||
      !args.slug ||
      !args.repository ||
      !args.ref
    ) {
      return [];
    }

    return gitProvider.getTree({
      slug: args.slug,
      repository: args.repository,
      ref: args.ref,
    });
  }, [gitProvider, accessToken, args.slug, args.repository, args.ref]);

  return useQuery({
    queryKey: [
      'gitRepositoryTree',
      provider,
      accessToken,
      ...Object.values(args),
    ],
    queryFn,
    enabled: !pause,
  });
};
