import { useMemo } from 'react';

import { useUploadContext } from '@/providers/UploadProvider';
import { Button, Text } from '@/ui';
import { convertToReadableTime } from '@/utils/getDurationUntilNow';

import { UploadFileStyles as FS, UploadingStateStyles as S } from './UploadWidget.styles';

export const UploadingSate: React.FC = () => {
  const { uploads, remainingTime, uploadStatus, retryUpload, cancelAll } = useUploadContext();
  const failedFiles = uploads.filter((upload) => upload.status === 'error').length;

  const isSuccessWithFailed = uploadStatus === 'success' && failedFiles;

  const shouldShowUploadingState =
    uploadStatus === 'error' ||
    isSuccessWithFailed || // if the current upload is success but we
    // still have failed files we should allow the uer to retry
    uploadStatus === 'uploading';

  const hideRetryAll = uploads.every((upload) => upload.errorMessage);

  const remainingText = useMemo(() => {
    if (remainingTime) {
      if (remainingTime > 0) {
        return `${convertToReadableTime(remainingTime)} left...`;
      }

      return 'Less than 5 seconds';
    }

    return 'Calculating...';
  }, [remainingTime]);

  if (!shouldShowUploadingState) {
    return null;
  }

  return (
    <S.Container status={isSuccessWithFailed ? 'error' : uploadStatus}>
      {uploadStatus === 'uploading' ? (
        <Text>{`${remainingText}`}</Text>
      ) : (
        <S.ErrorMessage>
          <FS.Icon name="alert-circled" status="error" /> Choose Action
        </S.ErrorMessage>
      )}
      <S.ButtonsContainer>
        {(uploadStatus === 'error' || isSuccessWithFailed) && !hideRetryAll && <Button onClick={retryUpload}>Retry all</Button>}
        {uploadStatus !== 'uploading' && (
          <Button intent="neutral" onClick={cancelAll}>
            Cancel all
          </Button>
        )}
      </S.ButtonsContainer>
    </S.Container>
  );
};
