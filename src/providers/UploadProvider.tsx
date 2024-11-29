import { routes } from '@fleek-platform/utils-routes';
import { type Dispatch, type SetStateAction, useEffect, useMemo, useState } from 'react';

import { useRouter } from '@/hooks/useRouter';
import { useUpload } from '@/hooks/useUpload';
import type { ChildrenProps } from '@/types/Props';
import type { Upload, UploadStatus } from '@/types/Upload';
import { createContext } from '@/utils/createContext';

import { useSessionContext } from './SessionProvider';

export type ProjectFilesContext = {
  uploads: Upload[];
  setUploads: Dispatch<SetStateAction<Upload[]>>;

  parentFolderId: string | undefined;
  setParentFolderId: (
    folderId: string | undefined,
    path: string | undefined,
    isNavigating?: boolean,
  ) => void;

  absolutePath: string | undefined;

  folderHistory: { folderId: string; path: string }[];
  setFolderHistory: Dispatch<
    SetStateAction<{ folderId: string; path: string }[]>
  >;

  remainingTime?: number; //in milliseconds

  updateUpload: (upload: Upload) => void;

  uploadStatus: UploadStatus;

  cancelAll: () => void;
  retryUpload: () => void;
};

const [Provider, useContext] = createContext<ProjectFilesContext>({
  name: 'ProjectFilesContext',
  hookName: 'ProjectFiles.useContext',
  providerName: 'ProjectFiles.Provider',
});

export const UploadProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const upload = useUpload();
  const router = useRouter();
  const session = useSessionContext();
  const [folderHistory, setFolderHistory] = useState<
    { folderId: string; path: string }[]
  >([]);

  const parentFolderId = router.query.folderId;
  const absolutePath = router.query.path;

  const setFolder = (
    folderId: string | undefined,
    path: string | undefined,
    isNavigating = false,
  ) => {
    const page = isNavigating ? 1 : router.query.page;
    const folderParam = folderId ? `&folderId=${folderId}` : '';
    const pathParam = path ? `&path=${path}` : '';
    const query = `page=${page}${folderParam}${pathParam}`;

    router.replace(
      {
        pathname: routes.project.storage({ projectId: session.project.id }),
        query,
      },
      undefined,
      {
        shallow: true,
      },
    );
  };

  const remainingTime = useMemo(() => {
    const uploadsWithProgress = uploads.filter(
      (upload) => upload.status === 'uploading' && upload.remainingTime,
    );

    if (uploadsWithProgress.length === 0) {
      return undefined;
    }

    return getLowestPercentage(uploadsWithProgress);
  }, [uploads]);

  const overallUploadStatus = useMemo(() => {
    if (uploads.some((upload) => upload.status === 'uploading')) {
      return 'uploading';
    } else if (uploads.every((upload) => upload.status === 'error')) {
      return 'error';
    } else if (uploads.some((upload) => upload.status === 'canceled')) {
      return 'canceled';
    }

    return 'success';
  }, [uploads]);

  useEffect(() => {
    // eslint-disable-next-line fleek-custom/valid-argument-types
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (uploads.some((upload) => upload.status === 'uploading')) {
        event.preventDefault();
        event.returnValue = true; // Included for legacy support, e.g. Chrome/Edge < 119 https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [uploads]);

  // eslint-disable-next-line fleek-custom/valid-argument-types
  const updateUpload = (upload: Upload) => {
    setUploads((prevUploads) => {
      return prevUploads.map((prevUpload) => {
        if (prevUpload.id === upload.id) {
          return {
            ...prevUpload,
            ...upload,
          };
        }

        return prevUpload;
      });
    });
  };

  const retryUpload = async () => {
    const uplaodsWithError = uploads.filter(
      (upload) => upload.status === 'error' && !upload.errorMessage,
    );

    // TODO: should handle this gracefully, only meaningfull due to ssr
    if (!upload) {
      return;
    }

    Promise.all(
      uplaodsWithError.map((file) =>
        upload.mutateAsync({
          upload: file,
          updateUpload: (file) => updateUpload(file),
        }),
      ),
    );

    setUploads((prevUploads) => {
      return prevUploads.map((upload) => {
        return {
          ...upload,
          status: upload.status === 'error' ? 'uploading' : upload.status,
          remainingTime: undefined, // reset remaining time
        };
      });
    });
  };

  const cancelAll = () => {
    setUploads((prevUploads) => {
      return prevUploads.map((upload) => {
        return {
          ...upload,
          status: upload.status !== 'success' ? 'canceled' : upload.status,
        };
      });
    });
  };

  return (
    <Provider
      value={{
        uploads,
        setUploads,
        parentFolderId,
        setParentFolderId: setFolder,
        absolutePath,
        folderHistory,
        setFolderHistory,
        updateUpload,
        remainingTime,
        uploadStatus: overallUploadStatus,
        retryUpload,
        cancelAll,
      }}
    >
      {children}
    </Provider>
  );
};

const getLowestPercentage = (uploads: Upload[]): number => {
  const remainingTime = uploads.map((upload) => upload.remainingTime as number);

  return Math.max(...remainingTime);
};

export const useUploadContext = useContext;
