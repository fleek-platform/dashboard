import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import type { HostnameLookupResponse } from '@/pages/api/hostname-lookup';
import { Log } from '@/utils/log';

type UseHostnameLookupArgs = {
  hostname: string;
};

export const useHostnameLookup = ({ hostname }: UseHostnameLookupArgs) => {
  const queryFn = useCallback(async () => {
    Log.info('Fetching country for hostname:', hostname);
    try {
      const response = await fetch(`/api/hostname-lookup?hostname=${hostname}`);
      Log.info('Response received:', response);

      const body = (await response.json()) as HostnameLookupResponse;

      if (body && 'data' in body) {
        Log.info('Data found:', body.data);

        return body.data;
      }

      return null;
    } catch (error) {
      Log.error('Error fetching data:', error);

      return null;
    }
  }, [hostname]);

  return useQuery({
    queryKey: ['useDomainCountry', hostname],
    queryFn,
  });
};
