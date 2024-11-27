import { SiteBuildSettings } from '@fleek-platform/utils-sites';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useClient } from 'urql';

import {
  SiteFrameworkRecognitionStrategy,
  SiteFrameworksDocument,
  SiteFrameworksQuery,
  SiteFrameworksQueryVariables,
} from '@/generated/graphqlClient';

export const useSiteFrameworks = () => {
  const client = useClient();

  const queryFn = useCallback(async () => {
    const result = await client.query<SiteFrameworksQuery, SiteFrameworksQueryVariables>(
      SiteFrameworksDocument,
      {},
      { requestPolicy: 'cache-first' }
    );

    if (result.error) {
      throw result.error;
    }

    return [
      ...(result.data?.siteFrameworks || []),
      {
        id: null,
        name: 'Other',
        avatar: '',
        buildScript: '',
        dockerImage: SiteBuildSettings.default.dockerImage,
        publishDirectory: SiteBuildSettings.default.publishDirectory,
        recognitionStrategy: SiteFrameworkRecognitionStrategy.FILES,
        recognitionArgument: '',
        slug: '',
      },
    ] as SiteFrameworksQuery['siteFrameworks'];
  }, [client]);

  return useQuery({
    queryKey: ['siteFrameworks'],
    queryFn,
  });
};
