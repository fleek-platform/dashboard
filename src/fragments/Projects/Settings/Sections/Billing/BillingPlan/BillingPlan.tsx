import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'react';

import { AlertBox, Billing, ExternalLink, LearnMoreMessage, PermissionsTooltip, SettingsBox } from '@/components';
import { constants } from '@/constants';
import { useCancelMockedMutation } from '@/hooks/useCancelSubscription';
import { useFleekCheckout } from '@/hooks/useFleekCheckout';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { useBillingContext } from '@/providers/BillingProvider';
import { Plan } from '@/types/Billing';
import { LoadingProps } from '@/types/Props';
import { Box, Button } from '@/ui';
import { dateFormat } from '@/utils/dateFormats';

import { CancelPlanModal } from './CancelPlanModal';

export const BillingPlan: React.FC<LoadingProps> = ({ isLoading }) => {
  const toast = useToast();
  const router = useRouter();
  const { subscription } = useBillingContext();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const checkout = useFleekCheckout();
  // eslint-disable-next-line fleek-custom/valid-gql-hooks-destructuring
  const cancelPlanMutation = useCancelMockedMutation({ subscriptionId: subscription.data?.id ?? undefined });

  useEffect(() => {
    if (subscription.error) {
      toast.error({ message: 'Error fetching subscription data. Please try again' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscription.error]);

  const handleCheckout = async () => {
    try {
      const response = await checkout.mutateAsync();

      router.replace(response.url);
    } catch (error) {
      toast.error({ error, log: 'Error upgrading plan. Please try again' });
    }
  };

  const handleCancelPlan = async () => {
    try {
      await cancelPlanMutation.mutateAsync();
      await subscription.refetch();
      setIsCancelModalOpen(false);

      toast.success({ message: 'Plan canceled successfully' });
    } catch (error) {
      toast.error({ error, log: 'Error canceling plan. Please try again' });
    }
  };

  const currentPlan = subscription.data?.id ? 'pro' : 'free';

  const planData = plansData[currentPlan as Plan];

  const endPlanDate = useMemo(() => {
    if (subscription.data?.endDate) {
      return dateFormat({ dateISO: subscription.data.endDate, format: DateTime.DATE_FULL });
    }

    return '';
  }, [subscription.data?.endDate]);

  const endPeriodDate = useMemo(() => {
    if (subscription.data?.periodEndDate) {
      return dateFormat({ dateISO: subscription.data.periodEndDate, format: DateTime.DATE_FULL });
    }

    return '';
  }, [subscription.data?.periodEndDate]);

  const shouldShowCancellationBanner = useMemo(() => {
    if (subscription.data?.endDate) {
      const targetTime = DateTime.fromISO(subscription.data.endDate);
      const currentTime = DateTime.now();
      const diff = targetTime.diff(currentTime);

      return Math.floor(diff.as('months')) <= 1;
    }

    return null;
  }, [subscription.data?.endDate]);

  const { title, description, price } = planData;

  const auxDescription = useMemo(
    () => (endPlanDate ? `${description} Your Pro Plan expires on ${endPlanDate}.` : description),
    [endPlanDate, description]
  );

  return (
    <>
      <CancelPlanModal
        isOpen={isCancelModalOpen}
        onOpenChange={setIsCancelModalOpen}
        onCancelPlan={handleCancelPlan}
        dueDate={endPeriodDate}
      />
      {shouldShowCancellationBanner && !isLoading && (
        <AlertBox size="sm" className="font-medium">
          Your Pro Plan is expiring. You will be converted to a Free plan on {endPlanDate}.
        </AlertBox>
      )}
      <Billing.HorizontalPlanCard isLoading={isLoading} title={title} description={auxDescription} price={price}>
        <SettingsBox.ActionRow>
          <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_PRICING}>plans</LearnMoreMessage>
          <Box className="flex-row gap-3">
            {isLoading ? (
              <SettingsBox.Skeleton variant="button" className="h-[2rem] w-[7rem] rounded-lg" />
            ) : (
              <ButtonsContainer
                currentPlan={currentPlan}
                onUpgradePlan={handleCheckout}
                onCancelPlan={() => setIsCancelModalOpen(true)}
                isCanceled={Boolean(subscription.data?.endDate)}
              />
            )}
          </Box>
        </SettingsBox.ActionRow>
      </Billing.HorizontalPlanCard>
    </>
  );
};

type ButtonsContainerProps = {
  currentPlan?: string;
  isCanceled?: boolean;
  onUpgradePlan: () => void;
  onCancelPlan: () => void;
};

const ButtonsContainer: React.FC<ButtonsContainerProps> = ({ currentPlan, isCanceled, onUpgradePlan, onCancelPlan }) => {
  const [isLoading, setIsLoading] = useState(false);
  const hasManageBillingPermission = usePermissions({ action: [constants.PERMISSION.BILLING.MANAGE] });

  const handleUpgradePlan = async () => {
    setIsLoading(true);
    await onUpgradePlan();
    setIsLoading(false);
  };

  if (currentPlan === 'pro') {
    return (
      <PermissionsTooltip hasAccess={hasManageBillingPermission}>
        <Button intent="neutral" size="sm" onClick={onCancelPlan} loading={isLoading} disabled={!hasManageBillingPermission || isCanceled}>
          Cancel plan
        </Button>
      </PermissionsTooltip>
    );
  }

  return (
    <>
      <PermissionsTooltip hasAccess={hasManageBillingPermission}>
        <ExternalLink href="https://fleek.typeform.com/fleekinterest?typeform-source=fleek.xyz">
          <Button intent="neutral" size="sm" disabled={!hasManageBillingPermission}>
            Contact Sales
          </Button>
        </ExternalLink>
      </PermissionsTooltip>
      <PermissionsTooltip hasAccess={hasManageBillingPermission}>
        <Button size="sm" onClick={handleUpgradePlan} loading={isLoading} disabled={!hasManageBillingPermission}>
          Upgrade to Pro
        </Button>
      </PermissionsTooltip>
    </>
  );
};

type PlanData = {
  title: string;
  description: string;
  price: string;
};

const plansData: Record<Plan, PlanData> = {
  free: {
    title: 'Free Plan',
    description: 'Our most popular plan for hobby developers.',
    price: '0',
  },
  pro: {
    title: 'Pro Plan',
    description: 'Our most popular plan for professional developers.',
    price: '20',
  },
};
