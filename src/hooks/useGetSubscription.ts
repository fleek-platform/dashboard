import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { BackendApiClient } from '@/integrations/new-be/BackendApi';
import { useCookies } from '@/providers/CookiesProvider';
import { SubscriptionResponse } from '@/types/Billing';
import { Log } from '@/utils/log';

type UseGetSubscriptionArgs = {
  subscriptionId?: string;
  pause?: boolean;
};

export const useGetSubscription = ({
  subscriptionId,
  pause = false,
}: UseGetSubscriptionArgs) => {
  const cookies = useCookies();

  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });

  const getSubscription = useCallback(async () => {
    if (!subscriptionId || pause) {
      return null;
    }

    try {
      const response = await backendApi.fetch({
        url: `/api/v1/subscriptions/${subscriptionId}`,
      });

      if (!response.ok) {
        throw response.statusText;
      }

      const result: SubscriptionResponse = await response.json();

      return result;
    } catch (error) {
      Log.error('Failed to fetch subscription data', error);

      throw error;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pause, subscriptionId]);

  return useQuery({
    queryKey: ['subscription', subscriptionId],
    queryFn: getSubscription,
  });
};
