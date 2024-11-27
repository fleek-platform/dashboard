import { updateApplicationSchemaNext } from '@fleek-platform/utils-validation';
import { useEffect, useMemo } from 'react';

import { Form, Modal, SettingsBox } from '@/components';
import { SettingsItemModal } from '@/fragments/Site/Settings/Elements/SettingsItemModal';
import {
  useApplicationQuery,
  useUpdateApplicationMutation,
} from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { Dialog, Text } from '@/ui';
import { parseWhitelistDomains } from '@/utils/whitelistDomains';

import { useApplicationCredentialsContext } from './ApplicationCredentials.context';
import { NameField } from './NameField';
import { WhitelistDomains } from './WhitelistDomains';

export const ApplicationCredentialsEditModal: React.FC = () => {
  const toast = useToast();
  const { isModalOpen, selectedId, closeModal } =
    useApplicationCredentialsContext();

  const [applicationQuery] = useApplicationQuery({
    variables: { where: { id: selectedId } },
    requestPolicy: 'network-only',
  });
  const [, updateApplication] = useUpdateApplicationMutation();

  const whiteListedDomains = useMemo(() => {
    if (!applicationQuery?.data) {
      return;
    }

    const applicationQueryData = applicationQuery.data.application;
    const data = parseWhitelistDomains({ applicationQueryData });

    if (!data.length) {
      return;
    }

    return data.map((domain) => domain.hostname);
  }, [applicationQuery.data]);

  useEffect(() => {}, [applicationQuery.data]);

  const form = Form.useForm({
    options: { partial: true },
    values: {
      name: applicationQuery.data?.application.name,
      whitelistDomains: whiteListedDomains,
    },
    schema: updateApplicationSchemaNext.shape.data,
    onSubmit: async (values) => {
      try {
        if (!values.whitelistDomains || !values.whitelistDomains.length) {
          return;
        }

        const updateApplicationResult = await updateApplication({
          where: { id: selectedId },
          data: {
            name: values.name,
            whitelistDomains: values.whitelistDomains,
            // Warning: the whiteLabelDomains is deprecated
            // its only declared here as the urql uses the type
            // for the cache declaration. The graphql client
            // does copy values from whitelist to whitelabel.
            // otherwise wouldn't be required.
            whiteLabelDomains: [...values.whitelistDomains],
          },
        });

        if (!updateApplicationResult.data) {
          throw (
            updateApplicationResult.error ||
            new Error('Error trying to update application credentials')
          );
        }

        toast.success({ message: 'Application credentials updated' });
        handleOpenChange(false);
      } catch (error) {
        toast.error({
          error,
          log: 'Error trying to update application credentials',
        });
      }
    },
  });

  const handleOpenChange = (state: boolean) => {
    if (!state) {
      form.resetForm();
    }

    closeModal();
  };

  useEffect(() => {
    if (isModalOpen) {
      form.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  return (
    <Form.Provider value={form}>
      <Dialog.Root open={isModalOpen} onOpenChange={handleOpenChange}>
        <Dialog.Overlay />
        <Modal.Content>
          <Modal.Heading>Edit Application Credentials</Modal.Heading>
          <Text>Edit the below inputs for your application credentials.</Text>

          <NameField isLoading={applicationQuery.fetching} />

          {applicationQuery.fetching ? (
            <SettingsBox.Skeleton variant="input" />
          ) : (
            <WhitelistDomains whiteListedDomains={whiteListedDomains} />
          )}

          <Modal.CTARow>
            <SettingsItemModal.CloseButton />
            <Form.SubmitButton
              loading={applicationQuery.fetching}
              className="flex-1"
            >
              Save
            </Form.SubmitButton>
          </Modal.CTARow>
        </Modal.Content>
      </Dialog.Root>
    </Form.Provider>
  );
};
