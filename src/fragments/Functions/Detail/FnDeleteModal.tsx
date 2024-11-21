import { useState } from 'react';
import zod from 'zod';

import { Form, SettingsDeleteModal } from '@/components';
import type { ChildrenProps } from '@/types/Props';
import { Text } from '@/ui';

import { useDeleteFunction } from './Context';

export type FnDeleteModalProps = ChildrenProps<{
  fnName: string;
  fnId: string;
}>;

export const FnDeleteModal: React.FC<FnDeleteModalProps> = ({
  children,
  fnName,
  fnId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <Form.Provider value={form}>
      <SettingsDeleteModal
        trigger={children}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <SettingsDeleteModal.Heading>
          Confirm Function Deletion
        </SettingsDeleteModal.Heading>

        <Text>
          If you are positive you want to delete your Function, use the field
          below to confirm and click delete.
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
