import { useCallback } from 'react';
import { useClient } from 'urql';

import {
  DeploymentDocument,
  DeploymentQuery,
  DeploymentQueryVariables,
  SiteDocument,
  SiteQuery,
  SiteQueryVariables,
} from '@/generated/graphqlClient';
import { type DeploymentStatus } from '@/types/Deployment';
import { parseAPIDeploymentStatus } from '@/utils/parseAPIDeploymentStatus';

import { REFETCH_INTERVAL_TIMEOUT, usePolling } from './usePolling';

export type UseDeploymentPollArgs = {
  deploymentId?: string;
  pause?: boolean;
  siteId: string;
};

export const useDeploymentPoll = ({
  deploymentId,
  pause = false,
  siteId,
}: UseDeploymentPollArgs) => {
  const client = useClient();
  const siteClient = useClient();

  const queryFn = useCallback(async () => {
    if (!deploymentId || pause) {
      return null;
    }

    const deploymentResult = await client.query<
      DeploymentQuery,
      DeploymentQueryVariables
    >(
      DeploymentDocument,
      {
        where: { id: deploymentId },
      },
      {
        requestPolicy: 'cache-and-network',
      },
    );

    if (!deploymentResult.data) {
      throw new DeploymentStatusError('Invalid data response');
    }

    return deploymentResult.data.deployment;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, deploymentId]);

  return usePolling({
    queryKey: ['siteDeploymentPoll', { deploymentId }],
    queryFn,
    // TODO: What is this trying to do?
    // notice it sets to false on a previewImageUrl
    stopCondition: (data) => {
      const status = parseAPIDeploymentStatus(data?.status);
      const hasStatus = COMPLETED_STATUSES.has(status);

      // TODO: This is suspicious, why would a "stopCondition"
      // have an early return if "previewImageUrl" is falsely?
      // if (!data?.previewImageUrl) {
      //   return false;
      // }

      return hasStatus;
    },
    onStoppedPolling: async (data) => {
      if (data && parseAPIDeploymentStatus(data.status) === 'success') {
        await siteClient.query<SiteQuery, SiteQueryVariables>(
          SiteDocument,
          { where: { id: siteId } },
          {
            requestPolicy: 'cache-and-network',
          },
        );
      }
    },
    refetchInterval: REFETCH_INTERVAL_TIMEOUT,
    options: {
      refetchIntervalInBackground: true,
    },
  });
};

const COMPLETED_STATUSES = new Set<DeploymentStatus>([
  'cancelled',
  'failed',
  'success',
]);

class DeploymentStatusError extends Error {}
