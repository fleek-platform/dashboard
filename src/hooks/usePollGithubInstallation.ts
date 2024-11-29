import { useCallback } from 'react';
import { useClient } from 'urql';

import {
  GithubAppInstallationsDocument,
  type GithubAppInstallationsQuery,
  type GithubAppInstallationsQueryVariables,
  type GitUserAccessToken,
  type GithubAppInstallation,
} from '@/generated/graphqlClient';

import { usePolling } from './usePolling';

export type UsePollGithubInstallationArgs = {
  gitProviderId?: string;
  onFinishedCallback?: (
    data: Pick<GitUserAccessToken, 'gitProviderId' & 'token'>[] | null,
  ) => void;
  pause?: boolean;
};

export const usePollGithubInstallation = ({
  pause,
  onFinishedCallback,
  gitProviderId,
}: UsePollGithubInstallationArgs) => {
  const client = useClient();

  const queryFn = useCallback(async () => {
    if (pause || !gitProviderId) {
      return null;
    }

    const gitInstallationsResult = await client.query<
      GithubAppInstallationsQuery,
      GithubAppInstallationsQueryVariables
    >(
      GithubAppInstallationsDocument,
      {
        where: { gitProviderId },
      },
      { requestPolicy: 'network-only' },
    );

    const gitInstallations =
      gitInstallationsResult.data?.githubAppInstallations;

    if (gitInstallationsResult.error || !gitInstallations) {
      throw (
        gitInstallationsResult.error ||
        new Error('Failed to get Git Access tokens')
      );
    }

    return gitInstallations;
  }, [client, gitProviderId, pause]);

  return usePolling({
    queryKey: ['pollGithubInstallation', { gitProviderId, pause }],
    queryFn,
    stopCondition: (data) => {
      if (!data) {
        return false;
      }

      // TODO: Why the inferred type's not correct?
      return data.some(
        (gitHubAppInstallation: GithubAppInstallation) =>
          gitHubAppInstallation.installationId,
      );
    },
    refetchInterval: 3_000,
    onFinishedCallback,
    options: {
      refetchIntervalInBackground: true,
    },
  });
};
