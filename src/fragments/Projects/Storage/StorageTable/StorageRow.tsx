import { DateTime } from 'luxon';
import React from 'react';

import { BadgeText, ExternalLink } from '@/components';
import { useUploadContext } from '@/providers/UploadProvider';
import { TEST_ID } from '@/test/testId';
import { ChildrenProps, LoadingProps } from '@/types/Props';
import { Folder, Pin } from '@/types/StorageProviders';
import { Box, Icon, Image, Skeleton, Text } from '@/ui';
import { cn } from '@/utils/cn';
import { dateFormat } from '@/utils/dateFormats';
import { shortStringFormat } from '@/utils/stringFormat';

import { RightMenu } from './RightMenu';
import { useStorageTableUtils } from './storageTableUtils';

type StorageCellProps = React.TdHTMLAttributes<HTMLTableCellElement> &
  ChildrenProps;

const StorageCell: React.FC<StorageCellProps> = ({ children, className }) => {
  return (
    <td
      className={cn(
        'border-t border-neutral-6 pl-6 text-left h-8 whitespace-nowrap',
        className,
      )}
    >
      {children}
    </td>
  );
};

type StorageRowProps = LoadingProps<{ pin?: Pin; folder?: Folder }>;

export const StorageRow: React.FC<StorageRowProps> = ({
  isLoading,
  pin,
  folder,
}) => {
  const { setParentFolderId, setFolderHistory } = useUploadContext();
  const {
    isIpfsFolder,
    isFilecoinDealPending,
    isArweavePending,
    getLink,
    getSize,
    handleCopyCid,
    handleCopyArweaveId,
    handleCopyFilecoinDealId,
  } = useStorageTableUtils(pin ? { pin } : folder ? { folder } : {});

  const onClickFolder = () => {
    if (folder) {
      setFolderHistory((prev) => [
        ...prev,
        { folderId: folder.id, path: folder.path },
      ]);
      setParentFolderId(folder.id, folder.path, true);
    }
  };

  if (isLoading) {
    return <SkeletonRow />;
  }

  const publicUrl = getLink();

  return (
    <tr data-testid={TEST_ID.TABLE_ROW_STORAGE} className="overflow-hidden">
      <StorageCell>
        <Box className="flex-row gap-2 items-center">
          {folder || isIpfsFolder ? (
            <Icon name="archive" className="text-sm text-neutral-11" />
          ) : (
            <Image alt="preview" className="p-0 text-sm" />
          )}
          <Box className="w-full max-w-[12rem]">
            {folder ? (
              <Text
                variant="primary"
                className="truncate cursor-pointer"
                onClick={onClickFolder}
              >
                {folder.name}
              </Text>
            ) : publicUrl ? (
              <ExternalLink href={publicUrl} className="flex max-w-full">
                <Text variant="primary" className="truncate">
                  {pin?.filename}
                </Text>
                <Text variant="primary">
                  {pin?.extension && `.${pin?.extension}`}
                </Text>
              </ExternalLink>
            ) : (
              <>
                <Text variant="primary" className="truncate">
                  {pin?.filename}
                </Text>
                <Text variant="primary">
                  {pin?.extension && `.${pin?.extension}`}
                </Text>
              </>
            )}
          </Box>
        </Box>
      </StorageCell>
      <StorageCell>
        <Text variant="primary">{getSize()}</Text>
      </StorageCell>
      <StorageCell>
        <Text variant="primary">
          {dateFormat({
            dateISO: pin?.createdAt || folder?.createdAt,
            format: DateTime.DATE_MED,
          })}
        </Text>
      </StorageCell>
      <StorageCell>
        {pin && (
          <BadgeText hoverable colorScheme="slate" onClick={handleCopyCid}>
            <Box className="bg-monochrome-reverse rounded-full size-5 items-center justify-center">
              <Icon name="ipfs-colored" />
            </Box>
            <Text size="xs">{`${shortStringFormat({ str: pin.cid })}`}</Text>
          </BadgeText>
        )}
      </StorageCell>
      <StorageCell>
        <Box className="flex-row gap-2.5">
          {pin && pin.storedOnArweave && (
            <BadgeText
              colorScheme="slate"
              onClick={handleCopyArweaveId}
              className="group cursor-pointer p-1"
            >
              <Icon name="arweave" />
              <Text size="xs" className="hidden group-hover:block">
                {isArweavePending
                  ? 'Pending...'
                  : shortStringFormat({ str: pin?.arweavePin?.bundlrId || '' })}
              </Text>
            </BadgeText>
          )}

          {pin && pin.storedOnFilecoin && (
            <BadgeText
              colorScheme="slate"
              onClick={handleCopyFilecoinDealId}
              className="group cursor-pointer p-1"
            >
              <Icon name="filecoin" />
              <Text size="xs" className="hidden group-hover:block">{`${
                isFilecoinDealPending
                  ? 'Pending...'
                  : pin?.filecoinPin?.deals[0].dealId
              }`}</Text>
            </BadgeText>
          )}
        </Box>
      </StorageCell>
      <StorageCell>
        <RightMenu pin={pin} folder={folder} />
      </StorageCell>
    </tr>
  );
};

const SkeletonRow: React.FC = () => (
  <tr>
    <StorageCell>
      <Skeleton variant="text" />
    </StorageCell>
    <StorageCell>
      <Skeleton variant="text" />
    </StorageCell>
    <StorageCell>
      <Skeleton variant="text" />
    </StorageCell>
    <StorageCell>
      <Skeleton variant="text" />
    </StorageCell>
    <StorageCell>
      <Skeleton variant="text" />
    </StorageCell>
    <StorageCell className="pr-6">
      <Skeleton variant="text" className="size-6 place-self-end" />
    </StorageCell>
  </tr>
);
