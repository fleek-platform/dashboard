import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { BackendApiClient } from '@/integrations/new-be/BackendApi';
import { useCookies } from '@/providers/CookiesProvider';
import { PaymentMethodResponse } from '@/types/Billing';
import { Log } from '@/utils/log';

type UseGetPaymentMethodArgs = {
  paymentMethodId?: string;
  pause?: boolean;
};

export const useGetPaymentMethod = ({ paymentMethodId, pause = false }: UseGetPaymentMethodArgs) => {
  const cookies = useCookies();

  const backendApi = new BackendApiClient({ accessToken: cookies.values.accessToken });

  const getPaymentMethod = useCallback(async () => {
    if (!paymentMethodId || pause) {
      return null;
    }

    try {
      const response = await backendApi.fetch({ url: `/api/v1/payment-methods/${paymentMethodId}` });

      if (!response.ok) {
        throw response.statusText;
      }

      const result: PaymentMethodResponse = await response.json();

      return result;
    } catch (error) {
      Log.error('Failed to fetch payment method data', error);

      throw error;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pause, paymentMethodId]);

  return useQuery({
    queryKey: ['payment-method', paymentMethodId],
    queryFn: getPaymentMethod,
  });
};
