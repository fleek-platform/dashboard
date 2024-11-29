import { Form, SettingsDeleteModal } from '@/components';
import type { ChildrenProps } from '@/types/Props';
import { CodeBlock, Text } from '@/ui';

export type DeleteProjectModalProps = ChildrenProps<{
  projectName?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>;

export const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  children,
  projectName,
  isOpen,
  setIsOpen,
}) => {
  const form = Form.useContext();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    form.resetForm();
  };

  return (
    <SettingsDeleteModal
      trigger={children}
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <SettingsDeleteModal.Heading>
        Confirm Project Deletion
      </SettingsDeleteModal.Heading>

      <Text>
        If you are positive you want to delete your project, use the field below
        to confirm and click <CodeBlock>Delete project</CodeBlock>.
      </Text>

      <Form.InputField
        name="name"
        label={
          <>
            Enter the project name <b>{projectName}</b> to continue
          </>
        }
        placeholder={projectName}
        disableValidMessage
      />

      <SettingsDeleteModal.Warning />

      <SettingsDeleteModal.Footer>
        <SettingsDeleteModal.CancelButton />
        <Form.SubmitButton
          intent="danger"
          onSubmit={() => handleOpenChange(false)}
          className="flex-1"
        >
          Delete project
        </Form.SubmitButton>
      </SettingsDeleteModal.Footer>
    </SettingsDeleteModal>
  );
};
