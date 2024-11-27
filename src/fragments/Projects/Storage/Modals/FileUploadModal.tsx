import { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';

import { Box, Dialog, Icon, Input, Text } from '@/ui';

import { UploadModalStyles as S } from './Modals.styles';

type FileUploadModalProps = {
  triggerRef: React.RefObject<HTMLButtonElement>;
};

export const FileUploadModal: React.FC<FileUploadModalProps> = ({
  triggerRef,
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('acceptedFiles', acceptedFiles);
    closeRef.current?.click();
  }, []);

  const dropzone = useDropzone({ onDrop, autoFocus: false });

  return (
    <Dialog.Root>
      <S.ModalUpload.Trigger ref={triggerRef} />
      <Dialog.Overlay />
      <Dialog.Content>
        <S.Title>
          <Text as="h2" variant="primary" size="xl" weight={700}>
            Upload File
          </Text>
          <Dialog.Close asChild ref={closeRef}>
            <Icon name="close-circle" />
          </Dialog.Close>
        </S.Title>
        <S.AlertBox size="sm">
          If you drop a folder we will upload all the files inside it.
        </S.AlertBox>
        <S.Dropzone {...dropzone.getRootProps()}>
          <Input.Field {...dropzone.getInputProps()} />
          <S.Container>
            <Icon name="cloud-upload" />
            <Box>
              <Text>Drag & drop your files here or</Text>
              <Text>browse files</Text>
            </Box>
          </S.Container>
        </S.Dropzone>
      </Dialog.Content>
    </Dialog.Root>
  );
};
