import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { hostnameLookup } from '@/utils/hostnameLookup';
import { Log } from '@/utils/log';

type UseHostnameLookupArgs = {
  hostname: string;
};

type HostnameLookupData = {
  country: string;
  ip: string;
  hostname: string;
};

export const useHostnameLookup = ({ hostname }: UseHostnameLookupArgs) => {
  const queryFn = useCallback(async (): Promise<HostnameLookupData | null> => {
    Log.info('Fetching country for hostname:', hostname);
    
    try {
      const result = await hostnameLookup(hostname);
      
      if ('data' in result) {
        Log.info('Data found:', result.data);
        return result.data;
      }
      
      Log.error('Error in response:', result.error);
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
