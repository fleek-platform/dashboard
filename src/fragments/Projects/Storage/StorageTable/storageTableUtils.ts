import { useToast } from '@/hooks/useToast';
import { Folder, Pin } from '@/types/StorageProviders';
import { copyToClipboard } from '@/utils/copyClipboard';
import { bytesToSize } from '@/utils/fileSizeFormt';
import { getLinkForIPFSGateway, getSubDomainResolutionIpfsGatewayUrl } from '@/utils/getLinkForIPFSGateway';

import { modalType, useStorageContext } from '../Storage.context';

type UseStorageTableUtilsArgs = { pin: Pin } | { folder: Folder } | Record<string, never>;

export const useStorageTableUtils = (args: UseStorageTableUtilsArgs) => {
  const toast = useToast();
  const { privateGatewayDomain, openModal } = useStorageContext();

  const isIpfsFolder = 'pin' in args && !args.pin?.extension;
  const isFilecoinDealPending = 'pin' in args && !args.pin?.filecoinPin?.deals[0]?.dealId;
  const isArweavePending = 'pin' in args && !args.pin?.arweavePin?.bundlrId;

  const getLink = () => {
    if ('folder' in args) {
      return privateGatewayDomain ? `https://${privateGatewayDomain}/${args.folder.path}` : null;
    }

    if ('pin' in args) {
      if (privateGatewayDomain && args.pin.pathInFolder) {
        return `https://${privateGatewayDomain}/${args.pin.pathInFolder}`;
      }

      return privateGatewayDomain
        ? getLinkForIPFSGateway({ cid: args.pin.cid, baseURL: privateGatewayDomain })
        : getSubDomainResolutionIpfsGatewayUrl({ cid: args.pin.cid });
    }

    return null;
  };

  const handleCopyLink = () => {
    const url = getLink();

    if (!url) {
      return;
    }

    try {
      copyToClipboard(url);

      toast.success({ message: `${'folder' in args ? 'Folder' : isIpfsFolder ? 'IPFS folder' : 'IPFS file'} URL copied` });
    } catch (error) {
      toast.error({ message: 'Failed to copy to clipboard' });
    }
  };

  const getSize = () => {
    if ('folder' in args) {
      return bytesToSize(Number(args.folder?.sizeBigInt));
    }

    if ('pin' in args) {
      return bytesToSize(args.pin.sizeBigInt ? Number(args.pin.sizeBigInt) : args.pin.size);
    }
  };

  const handleCopyCid = () => {
    if ('folder' in args) {
      return;
    }

    if ('pin' in args) {
      try {
        copyToClipboard(args.pin.cid);
        toast.success({ message: `Copied IPFS Hash to clipboard` });
      } catch (error) {
        toast.error({ message: 'Failed to copy IPFS Hash to clipboard' });
      }
    }
  };

  const handleCopyFilecoinDealId = () => {
    if ('folder' in args) {
      return;
    }

    if ('pin' in args && args.pin.filecoinPin?.deals[0]?.dealId) {
      try {
        copyToClipboard(`${args.pin.filecoinPin.deals[0].dealId}`);
        toast.success({ message: `Copied Filecoin ID to clipboard` });
      } catch (error) {
        toast.error({ message: 'Failed to copy Filecoin ID to clipboard' });
      }
    }
  };

  const handleCopyArweaveId = () => {
    if ('folder' in args) {
      return;
    }

    if ('pin' in args && args.pin.arweavePin?.bundlrId) {
      try {
        copyToClipboard(args.pin.arweavePin.bundlrId);
        toast.success({ message: `Copied Arweave ID to clipboard` });
      } catch (error) {
        toast.error({ message: 'Failed to copy Arweave ID to clipboard' });
      }
    }
  };

  const handleEdit = () => {
    if ('folder' in args) {
      openModal({ folderId: args.folder.id, modal: modalType.UPDATE_FOLDER, isFolder: true, pinName: args.folder.name });
    }

    if ('pin' in args) {
      const pinName = args.pin.extension ? [args.pin.filename, args.pin.extension].join('.') : args.pin.filename;

      openModal({ pinId: args.pin.id, modal: modalType.UPDATE_PIN, isFolder: false, pinName });
    }
  };

  const handleDelete = () => {
    if ('folder' in args) {
      openModal({ folderId: args.folder.id, modal: modalType.DELETE, isFolder: true, pinName: args.folder.name });
    }

    if ('pin' in args) {
      openModal({ pinId: args.pin.id, modal: modalType.DELETE, isFolder: false, pinName: args.pin.filename });
    }
  };

  return {
    isIpfsFolder,
    isFilecoinDealPending,
    isArweavePending,
    getLink,
    handleCopyLink,
    getSize,
    handleCopyCid,
    handleCopyFilecoinDealId,
    handleCopyArweaveId,
    handleEdit,
    handleDelete,
  };
};
