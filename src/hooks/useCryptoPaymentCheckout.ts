import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { CryptoPayment } from '@/types/Billing';

export const useCryptoPaymentCheckout = (args: CryptoPaymentCheckoutArgs = {}) => {
  return useMutation({
    mutationFn: async ({ planId, currency, network }: CryptoPaymentCheckoutMutationArgs) => {
      const response = await fetch('/api/create-crypto-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId, currency, network }),
      });

      const data = (await response.json()) as CryptoPayment;

      return data;
    },
    ...args,
  });
};

export type CryptoPaymentCheckoutArgs = Omit<UseMutationOptions<CryptoPayment, Error, CryptoPaymentCheckoutMutationArgs>, 'mutationFn'>;

export type CryptoPaymentCheckoutMutationArgs = {
  planId: string;
  currency: string;
  network: string;
};
