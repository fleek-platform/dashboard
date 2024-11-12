import { useCallback } from 'react';
import { useClient } from 'urql';

import { MigrationRequest } from '@/fragments';
import {
  MigrationRequestsDocument,
  MigrationRequestsQuery,
  MigrationRequestsQueryVariables,
} from '@/generated/graphqlClient';

import { usePolling } from './usePolling';

export type UsePollMigrationRequestsArgs = {
  migrationRequestIds: string[];
  onFinishedCallback?: (data: MigrationRequest[] | null) => void;
  pause?: boolean;
};

export const usePollMigrationRequests = ({
  pause,
  migrationRequestIds,
  onFinishedCallback,
}: UsePollMigrationRequestsArgs) => {
  const client = useClient();

  const queryFn = useCallback(async () => {
    if (pause || !migrationRequestIds) {
      return null;
    }

    const result = await client.query<
      MigrationRequestsQuery,
      MigrationRequestsQueryVariables
    >(MigrationRequestsDocument, {}, { requestPolicy: 'cache-and-network' });
    const migrationRequests = result.data?.migrationRequests.data;

    const filteredMigrationRequests =
      migrationRequests?.filter(
        (migrationRequest) =>
          migrationRequest && migrationRequestIds.includes(migrationRequest.id),
      ) || [];
    const reducedMigrationRequest = filteredMigrationRequests.reduce<
      Record<string, MigrationRequest>
    >((acc, current) => {
      const { teamId } = current;

      if (
        !acc[teamId] ||
        Date.parse(acc[teamId].createdAt) < Date.parse(current.createdAt)
      ) {
        acc[teamId] = current;
      }

      return acc;
    }, {});

    return Object.values(reducedMigrationRequest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, migrationRequestIds, pause]);

  return usePolling({
    queryKey: ['pollSiteForDeployment', { migrationRequestIds, pause }],
    queryFn,
    stopCondition: (data) => {
      if (
        data?.some(
          (migrationRequest) => migrationRequest.status === 'IN_PROGRESS',
        )
      ) {
        return false;
      }

      return true;
    },
    refetchInterval: 1_000,
    onFinishedCallback,
    options: {
      refetchIntervalInBackground: true,
    },
  });
};
