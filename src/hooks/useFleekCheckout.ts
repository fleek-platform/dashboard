/* eslint-disable fleek-custom/no-interface */
/* eslint-disable fleek-custom/no-default-error */
import { useMutation } from '@tanstack/react-query';

import { BackendApiClient } from '@/integrations/new-be/BackendApi';
import { useCookies } from '@/providers/CookiesProvider';
import type { CheckoutResponse, PlanResponse } from '@/types/Billing';

import { useRouter } from './useRouter';
import { sleep } from '../utils/timeout';
import { useCredits } from './useCredits';

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

type MutationResult =
  | {
      content: CheckoutResponse;
      type: 'CHECKOUT';
    }
  | { content: unknown; type: 'CREDITS' };

export const useFleekCheckout = () => {
  const router = useRouter();
  const projectId = router.query.projectId!;
  const { refetchCredits } = useCredits();
  const cookies = useCookies();
  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });

  const checkout = async (): Promise<MutationResult> => {
    let attempts = 0;

    while (attempts < FLEEK_CHECKOUT_MAX_RETRIES) {
      try {
        const plans = await backendApi.fetch({
          url: '/api/v1/plans',
        });

        if (!plans.ok) {
          throw plans.statusText;
        }

        const PlansResponse: PlanResponse[] = await plans.json();
        const plan = PlansResponse.find(
          (plan) => plan.name.toUpperCase() === 'PRO',
        );

        const planId = plan.id;

        if (!planId) {
          throw new Error('Plan not found');
        }

        const { rawBalance } = (await refetchCredits()).data;

        const referralId =
          window.tolt_referral || getCookie('tolt_referral') || '';

        // Create plan with credits
        if (rawBalance >= plan?.price) {
          const response = await backendApi.fetch({
            url: '/api/v1/subscriptions',
            method: 'POST',
            body: JSON.stringify({
              projectId,
              product: {
                id: planId,
                quantity: 1,
              },
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

          await refetchCredits();

          const result = await response.json();

          return {
            content: result,
            type: 'CREDITS',
          };
        }

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

        return {
          content: result,
          type: 'CHECKOUT',
        };
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
