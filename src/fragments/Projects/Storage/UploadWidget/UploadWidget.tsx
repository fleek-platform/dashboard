import { useUploadContext } from '@/providers/UploadProvider';
import type { Upload } from '@/types/Upload';
import { Box } from '@/ui';

import { UploadFile } from './UploadFile';
import { UploadWidgetStyles as S } from './UploadWidget.styles';
import { UploadingSate } from './UploadingState';

export type UploadWidgetProps = {
  uploads: Upload[];
};

export const UploadWidget: React.FC<UploadWidgetProps> = ({ uploads }) => {
  return (
    <S.Accordion.Root
      type="single"
      collapsible
      defaultValue="upload"
      hidden={uploads.length === 0}
      id="upload-widget"
    >
      <S.Accordion.Item value="upload">
        <WidgetHeader />
        <S.Accordion.Content asChild>
          <Box>
            <UploadingSate />
            {uploads.map((upload) => (
              <UploadFile key={upload.id} upload={upload} />
            ))}
          </Box>
        </S.Accordion.Content>
      </S.Accordion.Item>
    </S.Accordion.Root>
  );
};

const WidgetHeader: React.FC = () => {
  const { uploads, uploadStatus } = useUploadContext();
  const failedFiles = uploads.filter((file) => file.status === 'error').length;

  const getMessage = () => {
    switch (uploadStatus) {
      case 'uploading':
        return `Uploading ${uploads.filter((file) => file.status === 'uploading').length} Items`;
      case 'canceled':
        return 'Upload Canceled';
      case 'error':
        return 'Upload Failed';
      case 'duplicate':
      case 'success':
        if (failedFiles) {
          return `Upload Complete (${uploads.filter((file) => file.status === 'error').length} Failed)`;
        }

        return 'Upload Complete';
      default:
        return '';
    }
  };

  return <S.Accordion.Header>{getMessage()}</S.Accordion.Header>;
};
