import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { constants } from '@/constants';

export const useSystemStatus = () => {
  const queryFn = useCallback(async () => {
    const response = await fetch(constants.FLEEK_STATUS_API);
    const data = (await response.json()) as SystemStatusResponse;

    return data;
  }, []);

  return useQuery({
    queryKey: ['systemStatus'],
    queryFn,
    refetchInterval: 60000, // every minute
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });
};

type SystemStatusResponse = {
  status: {
    indicator: 'none' | 'minor' | 'major' | 'critical';
    description: string;
  };
};
