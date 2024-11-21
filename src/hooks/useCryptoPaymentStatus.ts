import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { CryptoPaymentStatus } from '@/types/Billing';

export const useCryptoPaymentStatus = ({
  variables,
  ...args
}: UseCryptoPaymentStatusArgs) => {
  return useQuery({
    queryKey: ['get-crypto-payment-status', variables],
    queryFn: async () => {
      const response = await fetch(
        `/api/get-crypto-payment-status/${variables.paymentUuid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = (await response.json()) as CryptoPaymentStatus;

      return data;
    },
    refetchInterval: 5000,
    ...args,
  });
};

export type UseCryptoPaymentStatusArgs = Omit<
  UseQueryOptions<CryptoPaymentStatus, Error>,
  'queryFn'
> & {
  variables: CryptoPaymentStatusQueryArgs;
};

export type CryptoPaymentStatusQueryArgs = {
  paymentUuid: string;
};
