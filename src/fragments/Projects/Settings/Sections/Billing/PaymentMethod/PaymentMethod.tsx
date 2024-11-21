import { useEffect, useState } from 'react';

import { BadgeText, SettingsBox, SettingsListItem } from '@/components';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { useUpdatePaymentMethod } from '@/hooks/useUpdatePaymentMethod';
import { useBillingContext } from '@/providers/BillingProvider';
import type { LoadingProps } from '@/types/Props';
import { Box, Skeleton } from '@/ui';
import { getDiffInMoths } from '@/utils/getDiffInMoths';
import { firstLetterUpperCase } from '@/utils/stringFormat';

export const PaymentMethod: React.FC<LoadingProps> = ({ isLoading }) => {
  const toast = useToast();
  const router = useRouter();
  const { paymentMethod } = useBillingContext();

  const updatePaymentMutation = useUpdatePaymentMethod();
  const hasManageBillingPermission = usePermissions({
    action: [constants.PERMISSION.BILLING.MANAGE],
  });

  const [isUpdatingPlan, setIsUpdatingPlan] = useState(false);

  const paymentMethodData = paymentMethod.data;

  useEffect(() => {
    if (paymentMethod.error) {
      toast.error({
        message: 'Error fetching payment method data. Please try again',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod.error]);

  if (isLoading) {
    return <CardSkeleton />;
  }

  const onUpdatePayment = async () => {
    setIsUpdatingPlan(true);
    try {
      const response = await updatePaymentMutation.mutateAsync();

      router.replace(response.url);
    } catch (error) {
      toast.error({
        message: 'Failed to update payment method. Please try again',
      });
    } finally {
      setIsUpdatingPlan(false);
    }
  };

  const expirationDate = `${paymentMethodData?.expiryMonth}/${paymentMethodData?.expiryYear}`;
  const hasExpired = getDiffInMoths({ expirationDate }) < 0;

  if (paymentMethodData) {
    return (
      <SettingsBox.Container>
        <PaymentTitleContent />
        <SettingsListItem
          title={`${firstLetterUpperCase(paymentMethodData?.brand ?? '')} ending in ${paymentMethodData?.last4}`}
          subtitle={`Expires ${expirationDate}`}
          avatarIcon="credit-card"
        >
          <BadgeText colorScheme={hasExpired ? 'red' : 'green'}>
            {hasExpired ? 'Expired' : 'Active'}
          </BadgeText>
          <SettingsListItem.DropdownMenu
            isLoading={isUpdatingPlan}
            isDisabled={!hasManageBillingPermission}
            hasAccess={hasManageBillingPermission}
          >
            <SettingsListItem.DropdownMenuItem
              icon="pencil"
              onClick={onUpdatePayment}
            >
              Update card details
            </SettingsListItem.DropdownMenuItem>
          </SettingsListItem.DropdownMenu>
        </SettingsListItem>
      </SettingsBox.Container>
    );
  }

  return <EmptyMessage />;
};

const PaymentTitleContent: React.FC = () => (
  <>
    <SettingsBox.Title>Payment method</SettingsBox.Title>
    <SettingsBox.Text>
      The method you use to pay for your Fleek plan.
    </SettingsBox.Text>
  </>
);

const EmptyMessage: React.FC = () => (
  <SettingsBox.Container>
    <PaymentTitleContent />
    <Box variant="container" className="bg-transparent">
      <SettingsBox.EmptyContent
        title="No payment method added"
        description="Once you add one, it will appear here."
        showIcon={false}
      />
    </Box>
  </SettingsBox.Container>
);

export const CardSkeleton: React.FC = () => (
  <SettingsBox.Container>
    <Box>
      <Skeleton variant="text" className="w-1/3 h-[1.25rem]" />
    </Box>
    <Box>
      <Skeleton variant="text" className="w-1/2" />
    </Box>
    <SettingsListItem.Skeleton />
  </SettingsBox.Container>
);
