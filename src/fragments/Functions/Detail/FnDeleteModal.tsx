import zod from 'zod';

import { Form, SettingsDeleteModal } from '@/components';
import { Text } from '@/ui';

import { useDeleteFunction } from './Context';

export type FnDeleteModalProps = {
  fnName: string;
  fnId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export const FnDeleteModal: React.FC<FnDeleteModalProps> = ({
  fnName,
  fnId,
  isOpen,
  onOpenChange,
}) => {
  const [, handleDelete] = useDeleteFunction({ id: fnId });
  const form = Form.useForm({
    values: { name: '' },
    schema: zod.object({
      name: zod.literal(fnName, {
        errorMap: () => ({ message: 'Incorrect function name' }),
      }),
    }),
    onSubmit: handleDelete,
  });

  const handleOpenChange = (open: boolean) => {
    form.resetForm();
    onOpenChange(open);
  };

  return (
    <Form.Provider value={form}>
      <SettingsDeleteModal open={isOpen} onOpenChange={handleOpenChange}>
        <SettingsDeleteModal.Heading>
          Confirm Function Deletion
        </SettingsDeleteModal.Heading>

        <Text>
          If you are positive you want to delete your function, use the field
          below to confirm and click &quot;Delete function&quot;.
        </Text>

        <Form.InputField
          name="name"
          label={
            <>
              Enter the function name <b>{fnName}</b> to continue
            </>
          }
          placeholder={fnName}
          disableValidMessage
        />

        <SettingsDeleteModal.Warning />

        <SettingsDeleteModal.Footer>
          <SettingsDeleteModal.CancelButton />
          <Form.SubmitButton intent="danger" className="flex-1">
            Delete function
          </Form.SubmitButton>
        </SettingsDeleteModal.Footer>
      </SettingsDeleteModal>
    </Form.Provider>
  );
};
