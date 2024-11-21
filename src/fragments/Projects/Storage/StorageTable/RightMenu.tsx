import { routes } from '@fleek-platform/utils-routes';
import { useState } from 'react';

import { BadgeText, SettingsListItem as Menu } from '@/components';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { useToast } from '@/hooks/useToast';
import type { Folder, Pin } from '@/types/StorageProviders';
import { Icon } from '@/ui';
import { getLinkForIPFSDownload } from '@/utils/getLinkForIPFSdownload';

import { StorageRowStyles as S } from './StorageTable.styles';
import { useStorageTableUtils } from './storageTableUtils';

type RightMenuProps = {
  pin?: Pin;
  folder?: Folder; // folder with navigation
};

export const RightMenu: React.FC<RightMenuProps> = ({ pin, folder }) => {
  const toast = useToast();
  const {
    getLink,
    isFilecoinDealPending,
    isArweavePending,
    handleCopyLink,
    handleCopyCid,
    handleCopyFilecoinDealId,
    handleCopyArweaveId,
    handleEdit,
    handleDelete,
  } = useStorageTableUtils(pin ? { pin } : folder ? { folder } : {});

  const publicUrl = getLink();

  const [isDownloading, setIsDownloading] = useState(false);

  const hasEditPermission = usePermissions({
    action: [constants.PERMISSION.STORAGE.EDIT_NAME],
  });
  const hasViewPermission = usePermissions({
    action: [constants.PERMISSION.STORAGE.VIEW_INFORMATION],
  });
  const hasDeletePermission = usePermissions({
    action: [constants.PERMISSION.STORAGE.DELETE],
  });

  const handleDownloadPin = async () => {
    if (pin) {
      const filename = `${pin.filename}.${pin.extension}`;
      const fileUrl = getLinkForIPFSDownload({
        cid: pin.cid,
        filename,
        isFolder: !pin.extension,
      });

      setIsDownloading(true);

      try {
        const response = await fetch(fileUrl);

        if (response.status !== 200) {
          throw response.statusText;
        }

        const blob = await response.blob();

        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success({ message: `Download complete ${filename}` });
      } catch (error) {
        toast.error({ message: `Error downloading ${filename}` });
      } finally {
        setIsDownloading(false);
      }
    }
  };

  if (!folder && !pin) {
    return (
      <S.RightMenu.Container>
        <Menu.DropdownMenu side="left" align="center" isDisabled={true} />
      </S.RightMenu.Container>
    );
  }

  return (
    <S.RightMenu.Container>
      {isDownloading && (
        <BadgeText colorScheme="slate">
          Downloading <Icon name="spinner" />
        </BadgeText>
      )}

      <Menu.DropdownMenu side="left" align="center">
        {publicUrl && (
          <Menu.DropdownMenuItem icon="arrow-up-right" href={publicUrl}>
            View public URL
          </Menu.DropdownMenuItem>
        )}

        {pin?.cid && (
          <Menu.DropdownMenuItem
            icon="arrow-up-right"
            href={routes.ipfsPropagation.withHash({ hash: pin?.cid })}
          >
            View on IPFS
          </Menu.DropdownMenuItem>
        )}
        <Menu.DropdownMenuSeparator />

        {hasEditPermission && (
          <>
            <Menu.DropdownMenuItem icon="pencil" onClick={handleEdit}>
              Edit Name
            </Menu.DropdownMenuItem>
            <Menu.DropdownMenuSeparator />
          </>
        )}

        {hasViewPermission && (
          <>
            {pin && (
              <Menu.DropdownMenuItem icon="copy" onClick={handleCopyCid}>
                Copy IPFS Hash
              </Menu.DropdownMenuItem>
            )}
            {pin?.storedOnArweave && (
              <Menu.DropdownMenuItem
                icon={isArweavePending ? null : 'copy'}
                onClick={handleCopyArweaveId}
                disabled={isArweavePending}
              >
                Copy Arweave Hash
                {isArweavePending && (
                  <BadgeText colorScheme="slate">Pending</BadgeText>
                )}
              </Menu.DropdownMenuItem>
            )}
            {pin?.storedOnFilecoin && (
              <Menu.DropdownMenuItem
                icon={isFilecoinDealPending ? null : 'copy'}
                onClick={handleCopyFilecoinDealId}
                disabled={isFilecoinDealPending}
              >
                Copy FIL Deal ID
                {isFilecoinDealPending && (
                  <BadgeText colorScheme="slate">Pending</BadgeText>
                )}
              </Menu.DropdownMenuItem>
            )}

            {publicUrl && (
              <>
                <Menu.DropdownMenuItem icon="copy" onClick={handleCopyLink}>
                  Copy public URL
                </Menu.DropdownMenuItem>
                <Menu.DropdownMenuSeparator />
              </>
            )}

            {pin && (
              <>
                <Menu.DropdownMenuItem
                  icon="download"
                  onClick={handleDownloadPin}
                >
                  Download {!pin?.extension ? 'IPFS Folder' : 'File'}
                </Menu.DropdownMenuItem>
                <Menu.DropdownMenuSeparator />
              </>
            )}

            {hasDeletePermission && (
              <Menu.DropdownMenuItem icon="trash" onClick={handleDelete}>
                Delete
              </Menu.DropdownMenuItem>
            )}
          </>
        )}
      </Menu.DropdownMenu>
    </S.RightMenu.Container>
  );
};
