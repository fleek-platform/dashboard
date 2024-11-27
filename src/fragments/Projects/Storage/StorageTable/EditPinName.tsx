import { pinName } from '@fleek-platform/utils-validation';
import { useClient } from 'urql';
import * as zod from 'zod';

import { Form } from '@/components';
import {
  ListFolderDocument,
  ListFolderQuery,
  ListFolderQueryVariables,
  useUpdateFolderMutation,
  useUpdatePinMutation,
} from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';

import { UpdatePinModal } from '../Modals/UpdatePinModal';
import { modalType, useStorageContext } from '../Storage.context';

export const EditPinNameModal: React.FC = () => {
  const toast = useToast();
  const {
    closeModal,
    selectedItemName,
    selectedFolderId,
    selectedPinId,
    isEditPinModalOpen,
    isEditFolderModalOpen,
  } = useStorageContext();

  const router = useRouter();
  const parentFolderId = router.query.folderId;

  const [, updatePin] = useUpdatePinMutation();
  const [, updateFolder] = useUpdateFolderMutation();
  const client = useClient();

  const editPinNameForm = Form.useForm({
    values: {
      name: selectedItemName.split('.')[0],
      extension: selectedItemName.split('.')[1] ?? undefined,
    },
    schema: zod.object({ name: pinName }),
    extraValidations: {
      name: Form.createExtraValidation.pinName(
        client,
        parentFolderId,
        selectedItemName.split('.')[1] ?? undefined,
      ),
    },
    onSubmit: async (values) => {
      try {
        const updateResult = await updatePin({
          data: { filename: values.name.trimEnd() },
          where: { id: selectedPinId },
        });

        if (updateResult?.error) {
          throw updateResult?.error;
        }

        await client
          .query<ListFolderQuery, ListFolderQueryVariables>(
            ListFolderDocument,
            { where: { id: parentFolderId } },
            { requestPolicy: 'cache-and-network' },
          )
          .toPromise();
        toast.success({
          message: `"${selectedItemName}" renamed to "${values.name.trimEnd()}"`,
        });
        closeModal(modalType.UPDATE_PIN);
      } catch (error) {
        toast.error({ message: 'Error trying to edit name' });
      }
    },
  });

  const editFleekFolderNameForm = Form.useForm({
    values: {
      name: selectedItemName,
      extension: undefined,
    },
    schema: zod.object({ name: pinName }),
    extraValidations: {
      name: Form.createExtraValidation.folderName(client, parentFolderId),
    },
    onSubmit: async (values) => {
      try {
        const updateResult = await updateFolder({
          data: { name: values.name.trimEnd() },
          where: { id: selectedFolderId },
        });

        if (updateResult?.error) {
          throw updateResult?.error;
        }

        await client
          .query<ListFolderQuery, ListFolderQueryVariables>(
            ListFolderDocument,
            { where: { id: parentFolderId } },
            { requestPolicy: 'cache-and-network' },
          )
          .toPromise();
        toast.success({
          message: `"${selectedItemName}" renamed to "${values.name.trimEnd()}"`,
        });
        closeModal(modalType.UPDATE_FOLDER);
      } catch (error) {
        toast.error({ message: 'Error trying to edit name' });
      }
    },
  });

  const handlePinOpenChange = (open: boolean) => {
    if (isEditPinModalOpen) {
      closeModal(modalType.UPDATE_PIN);
    }

    if (!open) {
      editPinNameForm.resetForm();
    }
  };

  const handleFolderOpenChange = (open: boolean) => {
    if (isEditFolderModalOpen) {
      closeModal(modalType.UPDATE_FOLDER);
    }

    if (!open) {
      editFleekFolderNameForm.resetForm();
    }
  };

  return (
    <>
      <Form.Provider value={editPinNameForm}>
        <UpdatePinModal
          isEditModalOpen={isEditPinModalOpen}
          handleOpenChange={handlePinOpenChange}
        />
      </Form.Provider>
      <Form.Provider value={editFleekFolderNameForm}>
        <UpdatePinModal
          isEditModalOpen={isEditFolderModalOpen}
          handleOpenChange={handleFolderOpenChange}
        />
      </Form.Provider>
    </>
  );
};
