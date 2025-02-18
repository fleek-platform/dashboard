import { routes } from '@fleek-platform/utils-routes';
import { useEffect, useMemo, useState } from 'react';

import { FolderNavigation } from '@/components/FolderNavigation/FolderNavigation';
import { constants } from '@/constants';
import { useFolderDetailsQuery, useListFolderQuery, usePrivateGatewaysQuery } from '@/generated/graphqlClient';
import { useQueryPagination } from '@/hooks/useQueryPagination';
import { useToast } from '@/hooks/useToast';
import { useCookies } from '@/providers/CookiesProvider';
import { useSessionContext } from '@/providers/SessionProvider';
import { useUploadContext } from '@/providers/UploadProvider';
import { Box, Button, Pagination } from '@/ui';
import { cn } from '@/utils/cn';
import { downloadPin } from '@/utils/downloadPin';
import { Log } from '@/utils/log';
import { sleep } from '@/utils/sleep';

import { DeletePinModal } from '../Modals/DeletePinModal';
import { useStorageContext } from '../Storage.context';
import { EditPinNameModal } from './EditPinName';
import { EmptyFiles } from './EmptyFiles';
import { StorageRow } from './StorageRow';
import { StorageSubheader } from './StorageSubheader';

export const StorageTable: React.FC = () => {
  const session = useSessionContext();
  const cookies = useCookies();

  const { parentFolderId, absolutePath, setParentFolderId, folderHistory } = useUploadContext();

  const { setPrivateGatewayDomain } = useStorageContext();

  const toast = useToast();
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  const folderParam = parentFolderId ? `&folderId=${parentFolderId}` : '';
  const pathParam = absolutePath ? `&path=${absolutePath}` : '';

  const extraSearchParams = `${folderParam}${pathParam}`;

  const { page, handlePageChange, setPageCount } = useQueryPagination({
    pathname: routes.project.storage({ projectId: session.project.id }),
    extraSearchParams,
  });

  const [folderDetailsQuery] = useFolderDetailsQuery({
    variables: { where: { id: parentFolderId, path: absolutePath } },
  });

  const [listFolderQuery, refetchListFolderQuery] = useListFolderQuery({
    variables: { where: { id: parentFolderId }, filter: { take: constants.FILES_PAGE_SIZE, page } },
    pause: !page,
  });

  const [privateGatewaysQuery, refetchPrivateGatewaysQuery] = usePrivateGatewaysQuery();

  const totalPages = listFolderQuery.data?.listFolder.pageCount;

  useEffect(() => {
    if (listFolderQuery.data?.listFolder.pageCount) {
      setPageCount(listFolderQuery.data?.listFolder.pageCount);
    }
  }, [listFolderQuery.data, setPageCount]);

  useEffect(() => {
    if (privateGatewaysQuery.data?.privateGateways.data && privateGatewaysQuery.data?.privateGateways.data?.length > 0) {
      const primaryDomain = privateGatewaysQuery.data?.privateGateways?.data[0].primaryDomain;

      if (primaryDomain && primaryDomain.isVerified) {
        // we should not have Primary Domain that are not Active but just to double check
        setPrivateGatewayDomain(primaryDomain.hostname);
      } else {
        // clean private gateway domain when user delete the primary domain
        setPrivateGatewayDomain(undefined);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privateGatewaysQuery.data]);

  useEffect(() => {
    refetchListFolderQuery({ requestPolicy: 'network-only' });
    refetchPrivateGatewaysQuery({ requestPolicy: 'network-only' });

    setPrivateGatewayDomain(undefined);
    setParentFolderId(undefined, undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.values.accessToken]);

  const isLoading = useMemo(
    () => session.loading || listFolderQuery.fetching || privateGatewaysQuery.fetching,
    [listFolderQuery.fetching, privateGatewaysQuery.fetching, session.loading]
  );

  useEffect(() => {
    if (listFolderQuery.error) {
      Log.error(listFolderQuery.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listFolderQuery.error]);

  useEffect(() => {
    if (folderDetailsQuery.data?.folder) {
      const path = folderDetailsQuery.data.folder.path;
      const folderId = folderDetailsQuery.data.folder.id;

      setParentFolderId(folderId, path);
    }
  }, [folderDetailsQuery.data?.folder]);

  const pins = listFolderQuery.data?.listFolder.data || [];

  const isFetchingFolderDetails = Boolean(parentFolderId && folderDetailsQuery.fetching && !absolutePath);

  const handleFolderNavigation = (path: string | undefined) => {
    const folderId = folderHistory.find((folder) => folder.path === path)?.folderId;
    setParentFolderId(folderId, path, true);
  };

  /** Downloads only pins from the current page. Folders are ignored. */
  const handleDownloadAllFiles = async () => {
    const DOWNLOAD_DELAY = 2000 as const;

    const pinsToDownload = pins.filter((pinOrFolder) => pinOrFolder.__typename === 'Pin');

    if (!pinsToDownload.length) {
      return;
    }

    setIsDownloadingAll(true);
    let successCount = 0;

    for (const pin of pinsToDownload) {
      let filename;

      try {
        filename = await downloadPin(pin);

        if (!filename) {
          continue;
        }

        successCount++;
      } catch (error) {
        toast.error({ message: `Error downloading ${filename}` });
      } finally {
        await sleep(DOWNLOAD_DELAY);
      }
    }

    setIsDownloadingAll(false);

    if (successCount > 0) {
      toast.success({ message: `${successCount} files download initialized successfully` });
    }
  };

  return (
    <>
      <DeletePinModal />
      <EditPinNameModal />
      <Box className="flex-row items-center justify-between flex-wrap gap-4">
        <FolderNavigation absolutePath={absolutePath} onFolderClick={handleFolderNavigation} isLoading={isFetchingFolderDetails} />
        <Button onClick={handleDownloadAllFiles} loading={isDownloadingAll} disabled={isDownloadingAll}>
          Download all
        </Button>
      </Box>
      <Box variant="container" className="gap-0 p-0 bg-transparent">
        <Box className={cn('overflow-auto', { 'min-h-[33rem]': !isLoading && pins.length === 0 })}>
          <table className="w-full border-collapse relative border-spacing-0">
            <colgroup>
              <col span={1} style={{ width: '25%' }} />
              <col span={1} style={{ width: '12%' }} />
              <col span={1} style={{ width: '13%' }} />
              <col span={1} style={{ width: '14%' }} />
              <col span={1} style={{ width: '18%' }} />
              <col span={1} style={{ width: '20%' }} />
            </colgroup>
            <thead className="bg-neutral-2 border-b border-neutral-6">
              <StorageSubheader />
            </thead>
            <tbody>
              {!isLoading && listFolderQuery.data
                ? pins.map((pinOrFolder, index) => {
                    const pin = pinOrFolder.__typename === 'Pin' ? pinOrFolder : undefined;
                    const folder = pinOrFolder.__typename === 'Folder' ? pinOrFolder : undefined;

                    return <StorageRow key={pinOrFolder.id || index} pin={pin} folder={folder} />;
                  })
                : Array.from(Array(10).keys()).map((_, index) => <StorageRow key={index} isLoading />)}
            </tbody>
          </table>
          {!isLoading && pins.length === 0 && <EmptyFiles />}
        </Box>
      </Box>

      {!isLoading && pins.length > 0 && totalPages && totalPages > 1 && (
        <Box className="mx-auto">
          <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
        </Box>
      )}
    </>
  );
};
