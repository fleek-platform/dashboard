import { useQuery } from '@tanstack/react-query';

import { GetCryptoPaymentOptionsResponse } from '@/pages/api/get-crypto-payment-options';

export const useCryptoPaymentOptions = () => {
  return useQuery({
    queryKey: ['get-crypto-payment-options'],
    queryFn: async () => {
      const response = await fetch('/api/get-crypto-payment-options');
      const data = await response.json();

      return data as GetCryptoPaymentOptionsResponse;
    },
    refetchOnMount: false,
  });
};
