import { type UseQueryArgs, useClient } from 'urql';

import {
  EnsRecordsByIpnsIdDocument,
  type EnsRecordsByIpnsIdQuery,
  type EnsRecordsByIpnsIdQueryVariables,
  type Exact,
  useSiteIpnsRecordsQuery,
} from '@/generated/graphqlClient';
import type { SiteENSRecord } from '@/types/Site';

import { useQueryWithCallback } from './useQueryWithCallback';

type Data = SiteENSRecord[];

export type UseSiteEnsRecordsQueryArgs = Omit<
  UseQueryArgs<Exact<{ where: { id: string } }>, Data>,
  'query'
>;

export const useSiteEnsRecordsQuery = (args: UseSiteEnsRecordsQueryArgs) => {
  const client = useClient();

  return useQueryWithCallback({
    args,
    useQuery: useSiteIpnsRecordsQuery,
    callback: async (data) => {
      const { ipnsRecords } = data.site;

      if (ipnsRecords.length === 0) {
        return [];
      }

      const ensRecordsByIpnsId = await Promise.all(
        ipnsRecords.map((ipns) =>
          client
            .query<EnsRecordsByIpnsIdQuery, EnsRecordsByIpnsIdQueryVariables>(
              EnsRecordsByIpnsIdDocument,
              { where: { ipnsRecordId: ipns.id } },
              { requestPolicy: 'network-only' },
            )
            .toPromise(),
        ),
      );

      return ensRecordsByIpnsId
        .flatMap((item) => item.data?.ensRecordsByIpnsId.data)
        .filter(Boolean) as Data;
    },
  });
};
