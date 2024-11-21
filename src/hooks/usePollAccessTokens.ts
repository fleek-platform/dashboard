import { useCallback } from 'react';
import { useClient } from 'urql';

import {
  GitAccessTokenDocument,
  GitAccessTokenQuery,
  GitAccessTokenQueryVariables,
} from '@/generated/graphqlClient';

import { usePolling } from './usePolling';

export type UsePollAccessTokensArgs = {
  gitProviderId?: string;
  onFinishedCallback?: (data?: string | null) => void;
  pause?: boolean;
};

export const usePollAccessTokens = ({
  pause,
  onFinishedCallback,
  gitProviderId,
}: UsePollAccessTokensArgs) => {
  const client = useClient();

  const queryFn = useCallback(async () => {
    if (pause || !gitProviderId) {
      return null;
    }

    console.log('Polled Query for access tokens');

    const gitAccessTokensResult = await client.query<
      GitAccessTokenQuery,
      GitAccessTokenQueryVariables
    >(GitAccessTokenDocument, {}, { requestPolicy: 'network-only' });

    const gitUserAccessTokens =
      gitAccessTokensResult.data?.user.gitUserAccessTokens;

    if (gitAccessTokensResult.error || !gitUserAccessTokens) {
      throw (
        gitAccessTokensResult.error ||
        new Error('Failed to get Git Access tokens')
      );
    }

    return (
      gitUserAccessTokens.find(
        (accessToken) => accessToken.gitProviderId === gitProviderId,
      )?.token || null
    );
  }, [client, gitProviderId, pause]);

  return usePolling({
    queryKey: ['pollAccessTokens', { gitProviderId, pause }],
    queryFn,
    stopCondition: (data) => {
      if (!data) {
        return false;
      }

      return true;
    },
    refetchInterval: 3_000,
    onFinishedCallback,
    options: {
      refetchIntervalInBackground: true,
    },
  });
};
