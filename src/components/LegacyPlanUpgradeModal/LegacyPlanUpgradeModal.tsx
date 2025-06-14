import { Box, Button, Dialog, Text } from '@/ui';
import { Modal } from '../Modal/Modal';
import { DividerElement } from '@/ui/Divider/Divider.styles';
import { FleekLogo } from '../FleekLogo/FleekLogo';
import { Link } from '../ftw/Link/Link';
import { useEffect, useState } from 'react';
import { useFleekCheckout } from '@/hooks/useFleekCheckout';
import { useToast } from '@/hooks/useToast';
import { Icon } from '@/ui';
import { useBillingContext } from '@/providers/BillingProvider';
import { useSessionContext } from '@/providers/SessionProvider';
import { getDefined } from '@/defined';
import { useCreditsCheckout } from '@/hooks/useCredits';
import { useProPlan } from '@/hooks/useProPlan';

const PERKS = [
  'Unlimited team members',
  'Unlimited custom domains',
  'Unlimited sites',
  'Email support',
] as const;

// TODO add link to blog post later
const LEARN_MORE_LINK = undefined;

const SHOWN_KEY_PREFIX = 'fleek-xyz-legacy_plan_modal_shown_';

export const LegacyPlanUpgradeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSessionContext();
  const shownKey = `${SHOWN_KEY_PREFIX}${session.project.id}`;
  const checkout = useFleekCheckout();

  const isFreeTierDeprecated =
    Date.now() >=
    Date.parse(getDefined('NEXT_PUBLIC_BILLING_FREE_PLAN_DEPRECATION_DATE'));

  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const { hasAvailableCredits } = useProPlan({
    onError: () =>
      toast.error({
        message: 'Unexpected error fetching pro plan, please try again later.',
      }),
  });
  const { handleAddCredits, isCreatingCheckout } = useCreditsCheckout();
  const {
    billingPlanType,
    loading: billingPlanTypeLoading,
    subscription,
    team,
  } = useBillingContext();

  useEffect(() => {
    if (billingPlanTypeLoading) return;

    if (isFreeTierDeprecated && !['pro', 'trial'].includes(billingPlanType)) {
      setIsOpen(true);
      return;
    }

    if (billingPlanType !== 'none' && billingPlanType !== 'free') return;

    const shown = localStorage.getItem(shownKey);

    if (shown) return;

    setIsOpen(true);
  }, [shownKey, billingPlanType, isFreeTierDeprecated, billingPlanTypeLoading]);

  const flagAsShown = () => {
    localStorage.setItem(shownKey, 'true');
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      flagAsShown();
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await checkout.mutateAsync();

      if (response.type === 'CHECKOUT') {
        window.location.href = response.content.url;
      }

      await Promise.all([subscription.refetch(), team.refetch()]);
      setIsOpen(false);
      toast.success({ message: 'Subscribed successfully!' });
    } catch (error) {
      toast.error({ error, log: 'Error upgrading plan. Please try again' });
    }
    setLoading(false);
    flagAsShown();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Overlay className="opacity-80" />
      <Dialog.Portal>
        <Modal.Content
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <Box className="gap-4">
            <Modal.Heading className="flex justify-between items-center">
              <Box>Upgrade your plan</Box>
              <Dialog.Close asChild>
                <Button size="xs" intent="ghost" className="size-6">
                  <Icon name="close" className="size-4 shrink-0" />
                </Button>
              </Dialog.Close>
            </Modal.Heading>
            <Text variant="secondary">
              {`${!isFreeTierDeprecated ? 'Your legacy Free Plan is being phased out. ' : ''}To continue hosting on
              Fleek without interruption, please upgrade your plan as soon as
              possible.
              `}
              {LEARN_MORE_LINK && (
                <>
                  {' '}
                  <Link href="" variant="accent">
                    Learn more
                  </Link>
                </>
              )}
            </Text>
          </Box>
          <DividerElement />
          <Box className="gap-3">
            <Text variant="primary">What you get:</Text>
            <ul className="flex flex-col gap-3 font-medium">
              {PERKS.map((li) => (
                <li key={li} className="flex gap-3 items-center">
                  <FleekLogo showTypography={false} />
                  {li}
                </li>
              ))}
            </ul>
          </Box>
          <DividerElement />
          <Box className="flex-row items-start justify-between">
            <Box>
              <Box className="flex-row items-center gap-1">
                <Text variant="primary" size="lg" weight={700}>
                  $20
                </Text>
                <Text className="secondary mt-[2px]" size="xs">
                  /mo
                </Text>
              </Box>
              <Text className="secondary" size="xs">
                + resource usage
              </Text>
            </Box>
            <Box className="items-end gap-2">
              <Button
                loading={isLoading || isCreatingCheckout}
                intent="accent"
                size="md"
                className="min-w-[150px]"
                onClick={handleCheckout}
              >
                {hasAvailableCredits ? 'Continue with credits' : 'Upgrade'}
              </Button>
              {!hasAvailableCredits && (
                <Text className="flex items-center">
                  Want to pay with crypto?&nbsp;
                  <Text
                    className="hover:underline text-accent-9 cursor-pointer"
                    variant="primary"
                    onClick={handleAddCredits as () => void}
                  >
                    Add credits
                  </Text>
                  .
                </Text>
              )}
            </Box>
          </Box>
        </Modal.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
