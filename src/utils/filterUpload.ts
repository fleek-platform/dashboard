import { uuid } from 'uuidv4';

import { constants } from '@/constants';
import { Upload } from '@/types/Upload';

import { bytesToSize } from './fileSizeFormat';

type FilteredFilesResult = {
  acceptedFiles: Upload[];
  rejectedFiles: Upload[];
};

// util to remove hidden files and filter size
export const filterFiles = (files: File[], fileSizeLimit: number): FilteredFilesResult => {
  const fileReducer = (accumulator: FilteredFilesResult, file: File) => {
    if (file.size > fileSizeLimit) {
      accumulator.rejectedFiles.push({
        id: uuid(),
        name: file.name,
        type: 'file',
        status: 'error',
        size: file.size,
        errorMessage: `File limit size is ${bytesToSize(fileSizeLimit)}, this file will not be uploaded`,
      });
    } else if (constants.REGEX_HIDDEN_FILES.test(file.name)) {
      // it means it's not a hidden file so we upload it
      // we don't want to upload hidden files specially .DS_Store due to mac security https://buildthis.com/ds_store-files-and-why-you-should-know-about-them/
      accumulator.acceptedFiles.push({
        id: uuid(),
        file: file,
        name: file.name,
        type: 'file',
        size: file.size,
        status: 'uploading',
      });
    }

    return accumulator;
  };

  const initialReducerValue: FilteredFilesResult = { acceptedFiles: [], rejectedFiles: [] };
  const result = files.reduce(fileReducer, initialReducerValue);

  return result;
};

// eslint-disable-next-line fleek-custom/valid-argument-types
export const filterFolder = (files: FileList, folderSizeLimit: number): Upload => {
  let sizeFolder = 0;
  const mappedFiles: File[] = [];

  const folderName = files[0].webkitRelativePath.split('/')[0];

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];

    sizeFolder = sizeFolder + file.size;

    // need to not add .DS_Store files due to mac security https://buildthis.com/ds_store-files-and-why-you-should-know-about-them/
    // ignore hidden files
    if (constants.REGEX_HIDDEN_FILES.test(file.name)) {
      // This is needed cause the sdk is adding an extra directory when uploading wrapped as directory
      // Split the path into parts using '/'
      const pathParts = file.webkitRelativePath.split('/');

      // Remove the first part (the first folder)
      pathParts.shift();

      // Join the path parts back into a string without the first folder
      const modifiedRelativePath = pathParts.join('/');

      mappedFiles.push(new File([file], modifiedRelativePath));
    }
  }

  const isBiggerThanMaxSize = sizeFolder > folderSizeLimit;

  const folderToUpload: Upload = {
    id: uuid(),
    name: folderName,
    type: 'folder',
    files: mappedFiles,
    status: isBiggerThanMaxSize ? 'error' : 'uploading',
    size: sizeFolder,
    errorMessage: isBiggerThanMaxSize ? `Folder limit size is ${bytesToSize(folderSizeLimit)}, this folder will not be uploaded` : '',
  };

  return folderToUpload;
};
