import { constants } from '@/constants';

export const useUploadSizeLimit = () => {
  const uploadSizeLimit = () => {
    return constants.MAX_FILE_FOLDER_SIZE;
  };

  return uploadSizeLimit();
};
