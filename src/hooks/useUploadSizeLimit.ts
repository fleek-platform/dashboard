import { constants } from '@/constants';

import { useFeatureFlags } from './useFeatureFlags';

export const useUploadSizeLimit = () => {
  const flags = useFeatureFlags();

  const uploadSizeLimit = () => {
    if (flags.uploadFileLimit) {
      return flags.uploadFileLimit * 1024 * 1024 * 1024; // GB to bytes
    }

    // in case the flag is not available, we use the default value
    return constants.MAX_FILE_FOLDER_SIZE;
  };

  return uploadSizeLimit();
};
