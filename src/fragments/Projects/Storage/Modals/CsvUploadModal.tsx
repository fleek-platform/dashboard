import { Dialog, Text } from '@/ui';

import { UploadModalStyles as S } from './Modals.styles';

type CSVUploadModalProps = {
  triggerRef: React.RefObject<HTMLButtonElement>;
};

export const CSVUploadModal: React.FC<CSVUploadModalProps> = ({
  triggerRef,
}) => {
  return (
    <Dialog.Root>
      <S.ModalUpload.Trigger ref={triggerRef} />
      <Dialog.Overlay />
      <Dialog.Content>
        <Text as="h1" variant="primary" size="3xl" weight={700}>
          Upload CSV
        </Text>
      </Dialog.Content>
    </Dialog.Root>
  );
};
