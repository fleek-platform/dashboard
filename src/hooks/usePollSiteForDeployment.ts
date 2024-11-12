import { useCallback } from 'react';
import { useClient } from 'urql';

import {
  SiteDocument,
  SiteQuery,
  SiteQueryVariables,
} from '@/generated/graphqlClient';

import { usePolling } from './usePolling';

export type UsePollSiteForDeploymentArgs = {
  siteId: string;
  pause?: boolean;
};

export const usePollSiteForDeployment = ({
  pause,
  siteId,
}: UsePollSiteForDeploymentArgs) => {
  const client = useClient();

  const queryFn = useCallback(async () => {
    if (pause) {
      return null;
    }

    const siteResult = await client.query<SiteQuery, SiteQueryVariables>(
      SiteDocument,
      {
        where: { id: siteId },
      },
      {
        requestPolicy: 'network-only',
      },
    );

    return siteResult.data?.site;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, siteId]);

  return usePolling({
    queryKey: ['pollSiteForDeployment', { siteId }],
    queryFn,
    stopCondition: (data) => {
      return !!data?.currentDeployment;
    },
    refetchInterval: 2_00,
    options: {
      refetchIntervalInBackground: true,
    },
  });
};
