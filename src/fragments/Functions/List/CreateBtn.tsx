import { functionName } from '@fleek-platform/utils-validation';
import { KeyboardEventHandler, useCallback, useState } from 'react';
import zod from 'zod';

import { Form, Modal, PermissionsTooltip } from '@/components';
import { constants } from '@/constants';
import { useCreateFleekFunctionMutation } from '@/generated/graphqlClient';
import { usePermissions } from '@/hooks/usePermissions';
import { useToast } from '@/hooks/useToast';
import { Button, Dialog } from '@/ui';

export const CreateBtn = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const hasCreateFunctionPermission = usePermissions({ action: [constants.PERMISSION.FUNCTIONS.CREATE] });

  const [createFleekFunctionMutation, createFleekFunction] = useCreateFleekFunctionMutation();
  const toast = useToast();

  const form = Form.useForm({
    values: { name: '' },
    schema: zod.object({ name: functionName }),
    onSubmit: async ({ name }) => {
      try {
        const result = await createFleekFunction({ data: { name } });

        if (!result.data || result.error) {
          throw result.error || new Error('Failed to create function');
        }

        toast.success({ message: 'Function created successfully!' });

        handleOpenChange(false);
      } catch (error) {
        toast.error({ error, log: 'Error trying to create function' });
      }
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    form.resetForm({ name: '' });
    setDialogOpen(isOpen);
  };

  const handleKeyDown = useCallback<KeyboardEventHandler>(({ key }) => key === 'Enter' && form.submit(), [form]);

  const loading = createFleekFunctionMutation.fetching;

  return (
    <>
      <PermissionsTooltip hasAccess={hasCreateFunctionPermission} asChild>
        <Button loading={loading} disabled={loading || !hasCreateFunctionPermission} onClick={() => handleOpenChange(true)}>
          Add new function
        </Button>
      </PermissionsTooltip>
      <Dialog.Root open={dialogOpen} onOpenChange={handleOpenChange}>
        <Dialog.Overlay />
        <Modal.Content>
          <Form.Provider value={form}>
            <Modal.Heading>Add new function</Modal.Heading>

            <Form.InputField label="Name" name="name" placeholder="Function" onKeyDown={handleKeyDown} />

            <Modal.CTARow>
              <Dialog.Close asChild>
                <Button intent="ghost" className="flex-1">
                  Cancel
                </Button>
              </Dialog.Close>
              <Form.SubmitButton className="flex-1">Create</Form.SubmitButton>
            </Modal.CTARow>
          </Form.Provider>
        </Modal.Content>
      </Dialog.Root>
    </>
  );
};
