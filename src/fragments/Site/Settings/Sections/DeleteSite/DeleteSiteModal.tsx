import { Form, SettingsDeleteModal } from '@/components';
import type { ChildrenProps } from '@/types/Props';
import { Text } from '@/ui';

export type DeleteSiteModalProps = ChildrenProps<{
  siteName?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>;

export const DeleteSiteModal: React.FC<DeleteSiteModalProps> = ({
  children,
  siteName,
  setIsOpen,
  isOpen,
}) => {
  return (
    <SettingsDeleteModal
      trigger={children}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SettingsDeleteModal.Heading>
        Confirm Site Deletion
      </SettingsDeleteModal.Heading>

      <Text>
        If you are positive you want to delete your Site, use the field below to
        confirm and click delete site.
      </Text>

      <Form.InputField
        name="name"
        label={
          <>
            Enter the site name <b>{siteName}</b> to continue
          </>
        }
        placeholder={siteName}
        disableValidMessage
      />

      <SettingsDeleteModal.Warning />

      <SettingsDeleteModal.Footer>
        <SettingsDeleteModal.CancelButton />
        <Form.SubmitButton intent="danger" className="flex-1">
          Delete site
        </Form.SubmitButton>
      </SettingsDeleteModal.Footer>
    </SettingsDeleteModal>
  );
};
