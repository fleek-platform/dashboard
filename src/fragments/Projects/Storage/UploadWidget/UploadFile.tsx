import { BadgeText, CustomTooltip, IconTooltip } from '@/components';
import { Upload, UploadStatus } from '@/types/Upload';
import { Box, Icon, Image, Text } from '@/ui';

import { bytesToSize } from './UploadWidget.utils';

type UploadFileProps = {
  upload: Upload;
};

export const UploadFile: React.FC<UploadFileProps> = ({ upload }) => {
  return (
    <Box className="flex-row items-center justify-between gap-2 py-3 px-4 border-b border-neutral-6 last:border-none">
      <Box className="flex-row justify-between w-full max-w-[70%]">
        <Box className="flex-row items-center gap-2 max-w-[10rem]">
          {upload.type === 'folder' ? (
            <Icon name="archive" className="text-sm text-neutral-11" />
          ) : (
            <Image src={upload.thumbnail} alt="preview" className="text-sm p-0" />
          )}
          <Text className="truncate">{upload.name}</Text>
        </Box>
        <Text>{bytesToSize(upload.size)}</Text>
      </Box>
      <Status status={upload.status} errorMessage={upload.errorMessage} />
    </Box>
  );
};

type StatusProps = {
  status: UploadStatus;
  errorMessage?: string;
  percentageComplete?: number;
};

const Status: React.FC<StatusProps> = ({ status, errorMessage }) => {
  const Status = StatusMap[status];

  if (typeof Status === 'function') {
    return Status(errorMessage);
  }

  return Status;
};

const StatusMap: Record<UploadStatus, JSX.Element | ((errorMessage?: string) => JSX.Element)> = {
  canceled: <Text>Canceled</Text>,
  uploading: <Icon name="spinner" />,
  error: (errorMessage?: string) => {
    if (errorMessage) {
      return <IconTooltip side="left">{errorMessage}</IconTooltip>;
    }

    return <Icon name="alert-circled" className="text-danger-11" />;
  },
  success: <Icon name="check-circled" className="text-success-11" />,
  duplicate: (
    <CustomTooltip side="left" content="This file/folder is uploaded already">
      <BadgeText colorScheme="slate">
        Duplicate <Icon name="question" />
      </BadgeText>
    </CustomTooltip>
  ),
};
