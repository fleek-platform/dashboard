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
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const { billingPlanType } = useBillingContext();

  useEffect(() => {
    if (billingPlanType !== 'none' && billingPlanType !== 'free') return;
    const shown = localStorage.getItem(shownKey);
    if (shown) return;
    setIsOpen(true);
  }, [shownKey, billingPlanType]);

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
      window.location.href = response.url;
    } catch (error) {
      toast.error({ error, log: 'Error upgrading plan. Please try again' });
    }
    setLoading(false);
    flagAsShown();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Overlay />
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
              Your legacy Free Plan is being phased out. To continue hosting on
              Fleek without interruption, please upgrade your plan as soon as
              possible.
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
          <Box className="flex-row items-center justify-between">
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
            <Button
              loading={isLoading}
              intent="accent"
              size="md"
              className="min-w-[150px]"
              onClick={handleCheckout}
            >
              Upgrade
            </Button>
          </Box>
        </Modal.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
