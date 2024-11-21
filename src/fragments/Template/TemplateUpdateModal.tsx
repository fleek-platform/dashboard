import {
  createTemplateSchema,
  updateTemplateSchema,
} from '@fleek-platform/utils-validation';
import React, { useEffect, useState } from 'react';
import { useClient } from 'urql';

import { BannerField, Form, SettingsModal } from '@/components';
import {
  useTemplateQuery,
  useUpdateTemplateMutation,
} from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { ChildrenProps } from '@/types/Props';
import { Button, Text } from '@/ui';

export type TemplateUpdateModalProps = ChildrenProps<{ templateId: string }> &
  Omit<React.ComponentProps<typeof SettingsModal>, 'trigger'>;

export const TemplateUpdateModal: React.FC<TemplateUpdateModalProps> = ({
  children,
  templateId,
  onOpenChange,
  open,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const [templateQuery] = useTemplateQuery({
    variables: { where: { id: templateId } },
  });
  const [, updateTemplate] = useUpdateTemplateMutation();
  const toast = useToast();
  const client = useClient();

  const handleOpenChange = (state: boolean) => {
    if (state) {
      form.resetForm();
      form.validate().then((isValid) => {
        console.log(isValid);
      });
    }

    if (onOpenChange) {
      onOpenChange(state);
    }

    setIsOpen(state);
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const form = Form.useForm({
    options: {
      partial: true,
    },
    values: {
      name: templateQuery.data?.template.name,
      description: templateQuery.data?.template.description,
      banner: undefined as File | undefined,
    },
    schema: updateTemplateSchema.shape.data,
    extraValidations: {
      name: Form.createExtraValidation.templateName(client),
    },
    onSubmit: async (values) => {
      try {
        const updateTemplateResult = await updateTemplate({
          where: { id: templateId },
          data: {
            name: values.name,
            description: values.description,
            banner: values.banner,
          },
        });

        if (!updateTemplateResult.data) {
          throw (
            updateTemplateResult.error || new Error('Unable to update template')
          );
        }

        toast.success({ message: 'Template updated successfully.' });

        handleOpenChange(false);
      } catch (error) {
        toast.error({ error, log: 'Template updated failed' });
      }
    },
  });

  return (
    <Form.Provider value={form}>
      <SettingsModal
        trigger={children}
        {...props}
        open={isOpen}
        onOpenChange={handleOpenChange}
      >
        <SettingsModal.Heading>Edit Template Details</SettingsModal.Heading>

        <Text>
          Edit the details for your Template, these will be used in the Fleek
          Template Gallery.
        </Text>

        <Form.InputField
          name="name"
          placeholder="Template"
          label="Name"
          autoFocus
          isLoading={templateQuery.fetching}
        />

        <Form.InputField
          name="description"
          label="Description"
          fieldType="Textarea"
          placeholder="Describe your template, this will be public."
          charactersCounter={
            createTemplateSchema.shape.data.shape.description.maxLength ??
            undefined
          }
          isLoading={templateQuery.fetching}
          disableValidMessage
        />

        <BannerField
          name="banner"
          initialImage={templateQuery.data?.template.banner}
        />

        <SettingsModal.Footer>
          <SettingsModal.Close asChild>
            <Button intent="neutral">Cancel</Button>
          </SettingsModal.Close>

          <Form.SubmitButton partial>Save changes</Form.SubmitButton>
        </SettingsModal.Footer>
      </SettingsModal>
    </Form.Provider>
  );
};
