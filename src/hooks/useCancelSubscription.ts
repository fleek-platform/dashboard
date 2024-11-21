import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { BackendApiClient } from '@/integrations/new-be/BackendApi';
import { useCookies } from '@/providers/CookiesProvider';
import type { SubscriptionResponse } from '@/types/Billing';
import { Log } from '@/utils/log';

type UseCancelMockedMutationArgs = {
  subscriptionId?: string;
};

export const useCancelMockedMutation = ({
  subscriptionId,
}: UseCancelMockedMutationArgs) => {
  const cookies = useCookies();
  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });

  const cancelSubscription = useCallback(async () => {
    if (!subscriptionId) {
      return null;
    }

    try {
      const response = await backendApi.fetch({
        url: `/api/v1/subscriptions/${subscriptionId}`,
        method: 'DELETE',
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
  }, [subscriptionId]);

  return useMutation({
    mutationKey: ['cancel-plan'],
    mutationFn: cancelSubscription,
  });
};
