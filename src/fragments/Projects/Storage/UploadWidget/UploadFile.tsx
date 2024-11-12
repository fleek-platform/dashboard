import { BadgeText, CustomTooltip, IconTooltip } from '@/components';
import { Upload, UploadStatus } from '@/types/Upload';
import { Box, Icon, Image, Text } from '@/ui';

import { UploadFileStyles as S } from './UploadWidget.styles';
import { bytesToSize } from './UploadWidget.utils';

type UploadFileProps = {
  upload: Upload;
};

export const UploadFile: React.FC<UploadFileProps> = ({ upload }) => {
  return (
    <S.Container>
      <S.NameContainer>
        {upload.type === 'folder' ? (
          <Icon name="archive" />
        ) : (
          <Image src={upload.thumbnail} alt="preview" />
        )}
        <Text className="truncate">{upload.name}</Text>
      </S.NameContainer>
      <S.DetailsContainer withErrorTooltip={Boolean(upload.errorMessage)}>
        {bytesToSize(upload.size)}
        <Box>
          <Status status={upload.status} errorMessage={upload.errorMessage} />
        </Box>
      </S.DetailsContainer>
    </S.Container>
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

const StatusMap: Record<
  UploadStatus,
  JSX.Element | ((errorMessage?: string) => JSX.Element)
> = {
  canceled: <Text>Canceled</Text>,
  uploading: <Icon name="spinner" />,
  error: (errorMessage?: string) => {
    if (errorMessage) {
      return <IconTooltip side="left">{errorMessage}</IconTooltip>;
    }

    return <S.Icon name="alert-circled" status="error" />;
  },
  success: <S.Icon name="check-circled" status="success" />,
  duplicate: (
    <CustomTooltip side="left" content="This file/folder is uploaded already">
      <BadgeText colorScheme="slate">
        Duplicate <Icon name="question" />
      </BadgeText>
    </CustomTooltip>
  ),
};
