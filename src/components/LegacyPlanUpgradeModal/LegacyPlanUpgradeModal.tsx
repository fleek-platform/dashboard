import { Box, Button, Dialog, Text } from '@/ui';
import { Modal } from '../Modal/Modal';
import { CloseIcon } from '@dynamic-labs/sdk-react-core';
import { DividerElement } from '@/ui/Divider/Divider.styles';
import { FleekLogo } from '../FleekLogo/FleekLogo';
import { Link } from '../ftw/Link/Link';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/providers/AuthProvider';

const PERKS = [
  'Unlimited team members',
  'Unlimited custom domains',
  'Unlimited sites',
  'Email support',
] as const;

// TODO add link to blog post later
const LEARN_MORE_LINK = undefined;

export const LegacyPlanUpgradeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuthContext();
  const shownKey = `legacy_plan_modal_shown_${auth.accessToken}`;

  useEffect(() => {
    const shown = localStorage.getItem(shownKey);
    if (!shown) {
      setIsOpen(true);
    }
  }, [shownKey]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      localStorage.setItem(shownKey, 'true');
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Overlay />
      <Dialog.Portal>
        <Modal.Content>
          <Box className="gap-4">
            <Modal.Heading className="flex justify-between items-center">
              <Box>Upgrade your plan</Box>
              <Dialog.Close asChild>
                <Button size="xs" intent="ghost" className="size-6">
                  <CloseIcon className="size-4 shrink-0" />
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
              loading={false}
              disabled={false}
              intent="accent"
              size="md"
              className="px-8"
              onClick={() => {}}
            >
              Upgrade
            </Button>
          </Box>
        </Modal.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
