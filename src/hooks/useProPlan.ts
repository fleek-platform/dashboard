import { BackendApiClient } from '@/integrations/new-be/BackendApi';
import { useCookies } from '@/providers/CookiesProvider';
import type { PlanResponse } from '@/types/Billing';
import { useQuery } from '@tanstack/react-query';
import { useCredits } from './useCredits';
import { useMemo } from 'react';

export const useProPlan = ({
  onError = () => {},
}: { onError?: () => void }) => {
  const cookies = useCookies();
  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });
  const { credits } = useCredits();

  const proPlanQuery = useQuery({
    queryKey: ['pro-plan'],
    onError,
    queryFn: async () => {
      const response = await backendApi.fetch({
        url: '/api/v1/plans',
      });

      if (!response.ok) {
        throw response.statusText;
      }

      const plans: PlanResponse[] = await response.json();

      const plan = plans.find((plan) => plan.name.toUpperCase() === 'PRO');

      const planId = plan?.id;

      if (!planId) {
        throw new Error('Plan not found');
      }

      return plan;
    },
  });

  const hasAvailableCredits = useMemo(() => {
    if (!proPlanQuery?.data?.price || !credits?.rawBalance) {
      return null;
    }

    return credits.rawBalance >= proPlanQuery.data.price;
  }, [credits, proPlanQuery.data]);

  return {
    proPlan: proPlanQuery.data,
    isFetching: proPlanQuery.isFetching,
    hasAvailableCredits,
  };
};
