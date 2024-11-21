import { routes } from '@fleek-platform/utils-routes';

import { useSessionContext } from '@/providers/SessionProvider';
import { ChildrenProps } from '@/types/Props';
import { Box, Button, Dialog, Divider, Icon, Text } from '@/ui';

import { Link } from '../Link/Link';
import { Modal } from '../Modal/Modal';

export type RestrictionModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  shouldShowUpgradePlan: boolean;
};

export const RestrictionModal: React.FC<RestrictionModalProps> = ({
  isOpen,
  shouldShowUpgradePlan,
  onOpenChange,
}) => {
  const session = useSessionContext();

  const projectId = session.project.id;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Overlay />
      <Dialog.Content className="w-[26.5rem] p-0">
        <Box className="gap-4 p-6 pb-0 items-center">
          <Box className="gap-2.5 items-center">
            <Icon name="fleek" className="text-[2.375rem]" />
            <Dialog.Title>
              <Text as="h1" variant="primary" weight={700} size="lg">
                Upgrade your plan
              </Text>
            </Dialog.Title>

            <Text className="text-center">
              You&apos;ve reached the limits of your Free plan. To continue
              without interruption, upgrade your plan.
            </Text>
          </Box>
          <Box className="flex-row gap-2 items-baseline">
            <Text variant="primary" size="lg" weight={700}>
              $
            </Text>
            <Text variant="primary" size="3xl" weight={700}>
              19
            </Text>
            <Text variant="primary" size="lg" weight={700}>
              /mo
            </Text>
          </Box>
        </Box>
        <Divider />

        <Box className="p-4 gap-3 pt-0">
          <Box className=" gap-3">
            <Text variant="primary" weight={700}>
              What you get
            </Text>
            <Item>Unlimited sites</Item>
            <Item>Invite 10+ team members</Item>
            <Item>Add 20+ custom domains</Item>
            <Item>
              And <u>much more</u>
            </Item>
          </Box>

          <Divider />
          <Modal.CTARow>
            <Dialog.Close asChild>
              {/* TODO remove py-0 px-2-5 text-sm h-[2rem] once new designs for button are done */}
              <Button
                intent="ghost"
                className="flex-1 py-0 px-2-5 text-sm h-[2rem] rounded-lg"
              >
                No thanks
              </Button>
            </Dialog.Close>

            {shouldShowUpgradePlan && (
              // TODO remove py-0 px-2-5 text-sm h-[2rem] once new designs for button are done
              <Link
                href={routes.project.settings.billing({ projectId })}
                className="flex-1"
              >
                <Button className="w-full py-0 px-2-5 text-sm h-[2rem] rounded-lg">
                  Upgrade plan
                </Button>
              </Link>
            )}
          </Modal.CTARow>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
};

const Item: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <Box className="flex-row gap-2">
      <Icon name="check-circled" className="text-accent-11" />
      <Text variant="primary" weight={500}>
        {children}
      </Text>
    </Box>
  );
};
