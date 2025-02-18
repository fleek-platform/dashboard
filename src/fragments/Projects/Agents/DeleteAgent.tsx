import zod from 'zod';

import { Form, SettingsDeleteModal } from '@/components';
import { CodeBlock, Text } from '@/ui';

type DeleteAgentModalProps = {
  agentName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteConfirm?: () => void | Promise<void>;
};

export const DeleteAgentModal: React.FC<DeleteAgentModalProps> = ({ agentName, open, onOpenChange, onDeleteConfirm }) => {
  const form = Form.useForm({
    values: { name: '' },
    schema: zod.object({
      name: zod.literal(agentName, {
        errorMap: () => ({ message: 'Incorrect agent name' }),
      }),
    }),
    onSubmit: async () => {
      if (onDeleteConfirm) {
        await onDeleteConfirm();
      }

      handleOpenChange(false);
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);

    if (!isOpen) {
      form.resetForm();
    }
  };

  return (
    <Form.Provider value={form}>
      <SettingsDeleteModal open={open} onOpenChange={handleOpenChange}>
        <SettingsDeleteModal.Heading>Confirm Agent Deletion</SettingsDeleteModal.Heading>

        <Text>
          If you are positive you want to delete this agent, use the field below to confirm and then click{' '}
          <CodeBlock>Delete agent</CodeBlock>.
        </Text>

        <Form.InputField
          name="name"
          label={
            <>
              Enter the agent name <b>{agentName}</b> to continue
            </>
          }
          placeholder={agentName}
          disableValidMessage
        />

        <SettingsDeleteModal.Warning />

        <SettingsDeleteModal.Footer>
          <SettingsDeleteModal.CancelButton />
          <Form.SubmitButton intent="danger" className="flex-1">
            Delete agent
          </Form.SubmitButton>
        </SettingsDeleteModal.Footer>
      </SettingsDeleteModal>
    </Form.Provider>
  );
};
