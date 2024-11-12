import { HeadingFrame, Link, SettingsModal } from '@/components';
import { Button, Text } from '@/ui';

export type UpgradePlanModalProps = {
  children: SettingsModal.Props['trigger'];
};

export const UpgradePlanModal: React.FC<UpgradePlanModalProps> = ({
  children,
}) => {
  return (
    <SettingsModal trigger={children}>
      <SettingsModal.Heading>Create Project</SettingsModal.Heading>

      <HeadingFrame>Need more power? ⚡⚡⚡</HeadingFrame>

      <Text>
        To continue with creating your project, please review our plans and
        choose the one that best fits your needs.
      </Text>

      <Text>
        Each option is designed to cater to different requirements, ensuring you
        find the right match for your project.
      </Text>

      <SettingsModal.Footer>
        <SettingsModal.Close asChild>
          <Button intent="neutral" className="flex-1">
            Cancel
          </Button>
        </SettingsModal.Close>

        <Link href="/billing">
          <Button className="flex-1">Choose plan</Button>
        </Link>
      </SettingsModal.Footer>
    </SettingsModal>
  );
};
