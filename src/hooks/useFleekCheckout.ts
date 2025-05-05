/* eslint-disable fleek-custom/no-interface */
/* eslint-disable fleek-custom/no-default-error */
import { useMutation } from '@tanstack/react-query';

import { BackendApiClient } from '@/integrations/new-be/BackendApi';
import { useCookies } from '@/providers/CookiesProvider';
import { CheckoutResponse, PlanResponse } from '@/types/Billing';

import { useRouter } from './useRouter';
import { sleep } from '../utils/timeout';

declare global {
  interface Window {
    tolt_referral: string | undefined;
  }
}

const getCookie = (name: string): string | null => {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];

  return cookie ? decodeURIComponent(cookie) : null;
};

const FLEEK_CHECKOUT_MAX_RETRIES = 3;
const FLEEK_CHECKOUT_RETRY_DELAY_MS = 1800;

export const useFleekCheckout = () => {
  const router = useRouter();
  const projectId = router.query.projectId!;
  const cookies = useCookies();
  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });

  const checkout = async () => {
    let attempts = 0;

    while (attempts < FLEEK_CHECKOUT_MAX_RETRIES) {
      try {
        const plan = await backendApi.fetch({
          url: '/api/v1/plans',
        });

        if (!plan.ok) {
          throw plan.statusText;
        }

        const PlansResponse: PlanResponse[] = await plan.json();
        const planId = PlansResponse.find(
          (plan) => plan.name.toUpperCase() === 'PRO',
        )?.id;

        if (!planId) {
          throw new Error('Plan not found');
        }

        const referralId =
          window.tolt_referral || getCookie('tolt_referral') || '';

        const response = await backendApi.fetch({
          url: '/api/v1/subscriptions/checkout',
          method: 'POST',
          redirect: 'follow',
          body: JSON.stringify({
            projectId,
            planId,
            metadata: {
              referralId,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(
            'There was an error trying to upgrade your plan. Please try again.',
          );
        }

        const result: CheckoutResponse = await response.json();

        return result;
      } catch (error) {
        attempts++;

        if (attempts >= FLEEK_CHECKOUT_MAX_RETRIES) {
          console.error(`Checkout failed after ${attempts} attempts:`, error);
          throw error;
        }

        await sleep(FLEEK_CHECKOUT_RETRY_DELAY_MS);
      }
    }
  };

  return useMutation({
    mutationKey: ['upgrade-plan', projectId],
    mutationFn: checkout,
  });
};
