import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'react';

import { AlertBox, Billing, LearnMoreMessage, Link, PermissionsTooltip, SettingsBox } from '@/components';
import { constants } from '@/constants';
import { useCancelMockedMutation } from '@/hooks/useCancelSubscription';
import { useFleekCheckout } from '@/hooks/useFleekCheckout';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { useBillingContext } from '@/providers/BillingProvider';
import { Plan } from '@/types/Billing';
import { LoadingProps } from '@/types/Props';
import { Button } from '@/ui';
import { dateFormat } from '@/utils/dateFormats';

import { BillingPlanStyles as S } from './BillingPlan.styles';
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

  const endPeriodDate = useMemo(() => {
    if (subscription.data?.periodEndDate) {
      return dateFormat({ dateISO: subscription.data.periodEndDate, format: DateTime.DATE_FULL });
    }

    return '';
  }, [subscription.data?.periodEndDate]);

  return (
    <>
      <CancelPlanModal
        isOpen={isCancelModalOpen}
        onOpenChange={setIsCancelModalOpen}
        onCancelPlan={handleCancelPlan}
        dueDate={endPeriodDate}
      />
      {subscription.data?.endDate && !isLoading && (
        <AlertBox size="sm" className="font-medium">
          Your plan has been canceled. You will be converted to a Free plan on {endPeriodDate}.
        </AlertBox>
      )}
      <Billing.HorizontalPlanCard isLoading={isLoading} title={planData?.title} description={planData?.description} price={planData?.price}>
        <SettingsBox.ActionRow>
          <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_PRICING}>plans</LearnMoreMessage>

          <S.ActionsWrapper>
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
          </S.ActionsWrapper>
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
  const className = 'py-0 px-2-5 text-sm h-[2rem]';
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
        <Button
          intent="neutral"
          size="sm"
          className={className}
          onClick={onCancelPlan}
          loading={isLoading}
          disabled={!hasManageBillingPermission || isCanceled}
        >
          Cancel plan
        </Button>
      </PermissionsTooltip>
    );
  }

  return (
    <>
      <PermissionsTooltip hasAccess={hasManageBillingPermission}>
        <Link href="mailto:business@fleek.xyz">
          <Button intent="neutral" size="sm" className={className} disabled={!hasManageBillingPermission}>
            Contact Sales
          </Button>
        </Link>
      </PermissionsTooltip>
      <PermissionsTooltip hasAccess={hasManageBillingPermission}>
        <Button size="sm" className={className} onClick={handleUpgradePlan} loading={isLoading} disabled={!hasManageBillingPermission}>
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
