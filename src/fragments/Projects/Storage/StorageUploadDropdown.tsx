import { pinName } from '@fleek-platform/utils-validation';
import { useRef, useState } from 'react';
import { useClient } from 'urql';
import * as zod from 'zod';

import { Form } from '@/components';
import { constants } from '@/constants';
import { ListFolderDocument, ListFolderQuery, ListFolderQueryVariables, useCreateFolderMutation } from '@/generated/graphqlClient';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { forwardStyledRef } from '@/theme';
import { Button, Icon, IconName, Menu } from '@/ui';

import { CreateFolderModal } from './Modals/CreateFolderModal';
import { UploadFilesItem } from './UploadFilesItem';
import { UploadFolderItem } from './UploadFolderItem';

type DropdownItemProps = React.ComponentProps<typeof Menu.Item> & {
  text: string;
  icon: IconName;
};

export const DropdownItem = forwardStyledRef<HTMLDivElement, DropdownItemProps>(Menu.Item, ({ text, icon, ...props }, ref) => (
  <Menu.Item {...props} ref={ref}>
    {text} <Icon name={icon} />
  </Menu.Item>
));

export const StorageUploadDropdown: React.FC = () => {
  const hasUploadPermissions = usePermissions({ action: [constants.PERMISSION.STORAGE.UPLOAD] });
  const flags = useFeatureFlags();
  const toast = useToast();
  const router = useRouter();

  const client = useClient();
  const parentFolderId = router.query.folderId;

  const [, createFolder] = useCreateFolderMutation();

  const inputFolderRef = useRef<HTMLInputElement | null>(null);
  const inputFilesRef = useRef<HTMLInputElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadFile = () => {
    inputFilesRef.current?.click();
  };

  const handleUploadFolder = () => {
    inputFolderRef.current?.click();
  };

  const handleCreateFolder = () => {
    setIsModalOpen(true);
  };

  const createFolderForm = Form.useForm({
    values: {
      name: '',
    },
    schema: zod.object({ name: pinName }),
    extraValidations: {
      name: Form.createExtraValidation.folderName(client, parentFolderId),
    },
    onSubmit: async (values) => {
      try {
        const { data, error } = await createFolder({ data: { name: values.name }, where: { parentFolderId: router.query.folderId } });

        if (error || !data?.createFolder.id) {
          throw error;
        }

        toast.success({ message: `Folder "${values.name}" created` });

        await client
          .query<ListFolderQuery, ListFolderQueryVariables>(
            ListFolderDocument,
            { where: { id: parentFolderId }, filter: { take: constants.FILES_PAGE_SIZE, page: 1 } },
            { requestPolicy: 'network-only' }
          )
          .toPromise();

        handleOpenChange(false);
      } catch (error) {
        toast.error({ error, log: 'Error trying to create folder' });
      }
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    createFolderForm.resetForm({ name: '' });
    setIsModalOpen(isOpen);
  };

  if (!hasUploadPermissions) {
    return null;
  }

  return (
    <>
      <UploadFolderItem inputFolderRef={inputFolderRef} />
      <UploadFilesItem inputFilesRef={inputFilesRef} />
      <Form.Provider value={createFolderForm}>
        <CreateFolderModal open={isModalOpen} onOpenChange={handleOpenChange} />
      </Form.Provider>
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button iconRight="chevron-down">Add new</Button>
        </Menu.Trigger>
        <Menu.Content align="end">
          {flags.storageFoldersFeature && (
            <>
              <DropdownItem text="New folder" icon="add-circle" onClick={handleCreateFolder} />
              <Menu.Separator />
            </>
          )}
          <DropdownItem text="File(s) upload" icon="file" onClick={handleUploadFile} />
          <DropdownItem text="Folder upload" icon="archive" onClick={handleUploadFolder} />
        </Menu.Content>
      </Menu.Root>
    </>
  );
};
