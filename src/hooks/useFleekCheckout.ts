/* eslint-disable fleek-custom/no-default-error */
import { useMutation } from '@tanstack/react-query';

import { BackendApiClient } from '@/integrations/new-be/BackendApi';
import { useCookies } from '@/providers/CookiesProvider';
import type { CheckoutResponse, PlanResponse } from '@/types/Billing';

import { useRouter } from './useRouter';

export const useFleekCheckout = () => {
  const router = useRouter();
  const projectId = router.query.projectId!;
  const cookies = useCookies();
  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });

  const checkout = async () => {
    try {
      const plan = await backendApi.fetch({
        url: '/api/v1/plans',
      });

      if (!plan.ok) {
        throw plan.statusText;
      }

      const PlansResponse: PlanResponse[] = await plan.json();

      // always keep the plan name aligned with what's on stripe plan name
      const planId = PlansResponse.find(
        (plan) => plan.name.toUpperCase() === 'PRO',
      )?.id;

      if (!planId) {
        throw new Error('Plan not found');
      }

      const response = await backendApi.fetch({
        url: '/api/v1/subscriptions/checkout',
        method: 'POST',
        redirect: 'follow',
        body: JSON.stringify({
          projectId,
          planId,
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
      throw error;
    }
  };

  return useMutation({
    mutationKey: ['upgrade-plan', projectId],
    mutationFn: checkout,
  });
};
