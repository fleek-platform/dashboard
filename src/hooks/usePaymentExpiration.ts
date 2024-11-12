import { useBillingContext } from '@/providers/BillingProvider';
import { getDiffInMoths } from '@/utils/getDiffInMoths';

export const usePaymentExpiration = () => {
  const { paymentMethod } = useBillingContext();

  const expirationDate = `${paymentMethod.data?.expiryMonth}/${paymentMethod.data?.expiryYear}`;

  const hasExpired =
    paymentMethod.data?.expiryMonth && paymentMethod.data.expiryYear && getDiffInMoths({ expirationDate: expirationDate }) < 0;

  // one month before expiration
  const isAboutToExpire =
    paymentMethod.data?.expiryMonth && paymentMethod.data.expiryYear && getDiffInMoths({ expirationDate }) <= 1 && !hasExpired;

  return { hasExpired, isAboutToExpire };
};
