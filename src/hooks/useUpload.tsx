import { DateTime } from 'luxon';
import { useClient } from 'urql';

import { constants } from '@/constants';
import {
  ListFolderDocument,
  ListFolderQuery,
  ListFolderQueryVariables,
} from '@/generated/graphqlClient';
import { Upload, UploadProgress, UploadStatus } from '@/types/Upload';
import { Log } from '@/utils/log';

import { useFleekSdk } from './useFleekSdk';
import { useRouter } from './useRouter';

import type { UploadPinResponse } from '@fleek-platform/sdk';

type MutateAsyncProps = {
  upload: Upload;
  updateUpload: (upload: Upload) => void;
};

export const useUpload = () => {
  const router = useRouter();
  const parentFolderId = router.query.folderId;

  const client = useClient();

  const fleekSdk = useFleekSdk();

  const mutateAsync = async ({ upload, updateUpload }: MutateAsyncProps) => {
    let status: UploadStatus = upload.status;

    if (!fleekSdk) {
      return;
    }

    try {
      const startedTime = DateTime.now();
      // eslint-disable-next-line fleek-custom/valid-argument-types
      const onUploadProgress = ({ loadedSize, totalSize }: UploadProgress) => {
        if (loadedSize > 0) {
          const currentTime = DateTime.now();
          const elapsedMillis = currentTime
            .diff(startedTime)
            .as('milliseconds');

          const bytesPerSecond = loadedSize / (elapsedMillis / 1000);
          const remainingBytes = (totalSize ?? loadedSize) - loadedSize;
          const remainingSeconds = remainingBytes / bytesPerSecond;

          updateUpload({ ...upload, remainingTime: remainingSeconds * 1000 });
        }
      };

      let uploadResult: UploadPinResponse | undefined;

      if (upload.type === 'file') {
        uploadResult = await fleekSdk.storage().uploadFile({
          file: upload.file as File,
          parentFolderId,
          onUploadProgress,
        });
      } else {
        uploadResult = await fleekSdk.storage().uploadVirtualDirectory({
          files: upload.files as File[],
          directoryName: upload.name,
          parentFolderId,
          onUploadProgress,
        });
      }

      if (uploadResult) {
        status = uploadResult.duplicate ? 'duplicate' : 'success';
      } else {
        throw new UploadToIPFSError(
          `Error uploading ${upload.type} ${upload.name}`,
        );
      }
    } catch (error) {
      Log.error(`Failed to upload ${upload.type}`, error);

      status = 'error';
    } finally {
      if (status === 'success') {
        await client
          .query<ListFolderQuery, ListFolderQueryVariables>(
            ListFolderDocument,
            {
              where: { id: parentFolderId },
              filter: { take: constants.FILES_PAGE_SIZE, page: 1 },
            },
            { requestPolicy: 'network-only' },
          )
          .toPromise();
      }

      updateUpload({ ...upload, status });
    }
  };

  return { mutateAsync };
};

class UploadToIPFSError extends Error {}
