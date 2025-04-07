import type { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useGetPaymentMethod } from '@/hooks/useGetPaymentMethod';
import { useGetSubscription } from '@/hooks/useGetSubscription';
import { useGetTeam } from '@/hooks/useGetTeam';
import type {
  PaymentMethodResponse,
  BillingPlanType,
  PlanRestriction,
  SubscriptionResponse,
  TeamResponse,
} from '@/types/Billing';
import type { ChildrenProps } from '@/types/Props';
import { createContext } from '@/utils/createContext';
import { DateTime } from 'luxon';
import { getDefined } from '@/defined';

export type BillingContext = {
  loading: boolean;
  billingPlanType: BillingPlanType | undefined;
  team: UseQueryResult<TeamResponse | null, unknown>;
  subscription: UseQueryResult<SubscriptionResponse | null, unknown>;
  paymentMethod: UseQueryResult<PaymentMethodResponse | null, unknown>;

  hasReachedLimit: (
    resource: keyof PlanRestriction,
    currentResourceCount: number,
  ) => { hasReachedLimit: boolean; restrictionMessage: string | undefined };
};

const [Provider, useContext] = createContext<BillingContext>({
  name: 'BillingContext',
  hookName: 'useBillingContext',
  providerName: 'BillingProvider',
});

export const BillingProvider: React.FC<ChildrenProps> = ({ children }) => {
  const team = useGetTeam({});
  const paymentMethod = useGetPaymentMethod({
    paymentMethodId: team.data?.paymentMethodId ?? undefined,
  });
  const subscription = useGetSubscription({
    subscriptionId: team.data?.subscriptionId ?? undefined,
  });

  const billingPlanType = useMemo(() => {
    if (subscription.isLoading) {
      return 'none';
    }

    if (subscription.data?.status === 'Active') {
      return 'pro';
    }

    if (subscription.data?.status === 'Trialing') {
      return 'trial';
    }

    if (
      DateTime.now() <
      DateTime.fromISO(
        getDefined('NEXT_PUBLIC_BILLING_FREE_PLAN_DEPRECATION_DATE'),
      )
    ) {
      return 'free';
    }

    return 'none';
  }, [subscription.isLoading, subscription.data]);

  const hasReachedLimit = (
    resource: keyof PlanRestriction,
    currentResourceCount: number,
  ) => {
    if (billingPlanType) {
      const restrictions = PlanRestrictions[billingPlanType];

      return {
        hasReachedLimit: currentResourceCount >= restrictions[resource].limit,
        restrictionMessage:
          currentResourceCount >= restrictions[resource].limit
            ? restrictionMessage(restrictions[resource].resource)
            : undefined,
      };
    }

    return {
      hasReachedLimit: false,
      restrictionMessage: undefined,
    };
  };

  const isLoading = useMemo(() => {
    return team.isLoading || paymentMethod.isLoading || subscription.isLoading;
  }, [paymentMethod.isLoading, subscription.isLoading, team.isLoading]);

  return (
    <Provider
      value={{
        loading: isLoading,
        billingPlanType,
        team,
        subscription,
        paymentMethod,
        hasReachedLimit,
      }}
    >
      {children}
    </Provider>
  );
};

export const useBillingContext = useContext;

const restrictionMessage = (resource: string) =>
  `To add additional ${resource}, you need to upgrade your plan.`;

const PlanRestrictions: Record<BillingPlanType, PlanRestriction> = {
  pro: {
    sites: {
      limit: 1000,
      resource: 'sites',
    },
    customDomains: {
      limit: 1000,
      resource: 'domains',
    },
    members: {
      limit: 1000,
      resource: 'members',
    },
  },
  trial: {
    sites: {
      limit: 1000,
      resource: 'sites',
    },
    customDomains: {
      limit: 1000,
      resource: 'domains',
    },
    members: {
      limit: 1000,
      resource: 'members',
    },
  },
  free: {
    sites: {
      limit: 3,
      resource: 'sites',
    },
    customDomains: {
      limit: 1,
      resource: 'domains',
    },
    members: {
      limit: 1,
      resource: 'members',
    },
  },
  none: {
    sites: {
      limit: 0,
      resource: 'sites',
    },
    customDomains: {
      limit: 0,
      resource: 'domains',
    },
    members: {
      limit: 0,
      resource: 'members',
    },
  },
};
