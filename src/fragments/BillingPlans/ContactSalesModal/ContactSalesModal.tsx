import { createSalesContactRequestSchema } from '@fleek-platform/utils-validation';
import { useEffect } from 'react';

import { Form, SettingsModal } from '@/components';
import { useCreateSalesContactRequestMutation } from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { Button, Text } from '@/ui';

export type ContactSalesModalProps = {
  children?: SettingsModal.Props['trigger'];
  initialEmail?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const ContactSalesModal: React.FC<ContactSalesModalProps> = ({ children, initialEmail = '', open, setOpen }) => {
  const toast = useToast();

  const [, createSalesContactRequest] = useCreateSalesContactRequestMutation();

  const form = Form.useForm({
    options: { validateNotDirty: true },
    values: {
      email: '',
      description: '',
    },
    schema: createSalesContactRequestSchema.shape.data,
    onSubmit: async (values) => {
      try {
        const { error } = await createSalesContactRequest({ data: values });

        if (error) {
          throw error;
        }

        toast.success({ message: 'We have received your message, we will be in contact shortly.' });
        setOpen(false);
      } catch (error) {
        toast.error({ error, log: 'Failed to create Sales Contact Request' });
      }
    },
  });

  useEffect(() => {
    form.resetForm();
    form.fields.email.setValue(initialEmail, true);
  }, [open, form, initialEmail]);

  return (
    <Form.Provider value={form}>
      <SettingsModal trigger={children} open={open} onOpenChange={setOpen}>
        <SettingsModal.Heading>Talk to our Sales team</SettingsModal.Heading>

        <Text>
          We&apos;ll find your business the plan and pricing you need, discuss your requirements, and give you a demonstration of Fleek and
          how it can provide the most value.
        </Text>

        <Form.InputField
          name="email"
          label="Contact Email"
          placeholder="your@mail.com"
          disableValidMessage
          autoFocus={initialEmail === ''}
        />

        <Form.InputField
          name="description"
          label="How can we help?"
          fieldType="Textarea"
          placeholder="I need to deploy X sites that usually takes Y minutes during each build run..."
          disableValidMessage
          autoFocus={initialEmail !== ''}
          charactersCounter={createSalesContactRequestSchema.shape.data.shape.description.maxLength ?? undefined}
        />

        <SettingsModal.Footer>
          <SettingsModal.Close asChild>
            <Button intent="neutral" className="flex-1">
              Cancel
            </Button>
          </SettingsModal.Close>

          <Form.SubmitButton className="flex-1">Submit form</Form.SubmitButton>
        </SettingsModal.Footer>
      </SettingsModal>
    </Form.Provider>
  );
};
