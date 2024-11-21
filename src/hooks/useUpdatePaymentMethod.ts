import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { BackendApiClient } from '@/integrations/new-be/BackendApi';
import { useCookies } from '@/providers/CookiesProvider';
import type { CheckoutResponse } from '@/types/Billing';
import { Log } from '@/utils/log';

import { useRouter } from './useRouter';

export const useUpdatePaymentMethod = () => {
  const router = useRouter();
  const projectId = router.query.projectId;

  const cookies = useCookies();
  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });

  const updatePaymentMethod = useCallback(async () => {
    try {
      const response = await backendApi.fetch({
        url: '/api/v1/payment-methods/manage',
        method: 'PUT',
        body: JSON.stringify({ projectId }),
      });

      if (!response.ok) {
        throw response.statusText;
      }

      const result: CheckoutResponse = await response.json();

      return result;
    } catch (error) {
      Log.error('Failed to update payment method data', error);

      throw error;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return useMutation({
    mutationKey: ['update-payment-method', projectId],
    mutationFn: updatePaymentMethod,
  });
};
