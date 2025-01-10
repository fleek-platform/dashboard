import { useMemo } from 'react';

import { useUploadContext } from '@/providers/UploadProvider';
import { Box, Button, Icon, Text } from '@/ui';
import { cn } from '@/utils/cn';
import { convertToReadableTime } from '@/utils/getDurationUntilNow';

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
    <Box
      className={cn('bg-neutral-2 flex-row gap-2 items-center p-3 justify-between border-b border-neutral-6', {
        'bg-danger-2': isSuccessWithFailed || uploadStatus === 'error',
      })}
    >
      {uploadStatus === 'uploading' ? (
        <Text>{`${remainingText}`}</Text>
      ) : (
        <Box className="flex-row gap-2">
          <Icon name="alert-circled" className="text-danger-11 text-sm" />
          <Text className="text-danger-11">Choose Action</Text>
        </Box>
      )}
      <Box className="flex-row items-center gap-2">
        {(uploadStatus === 'error' || isSuccessWithFailed) && !hideRetryAll && <Button onClick={retryUpload}>Retry all</Button>}
        {uploadStatus !== 'uploading' && (
          <Button intent="neutral" onClick={cancelAll}>
            Cancel all
          </Button>
        )}
      </Box>
    </Box>
  );
};
