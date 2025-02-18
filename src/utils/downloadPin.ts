import { Pin } from '@/types/StorageProviders';
import { getLinkForIPFSDownload } from '@/utils/getLinkForIPFSdownload';

type DownloadPinArgs = Pin;

// can throw
export const downloadPin = async (
  pin: DownloadPinArgs,
): Promise<string | undefined> => {
  if (!pin) {
    return;
  }

  const filename = `${pin.filename}.${pin.extension}`;
  const fileUrl = getLinkForIPFSDownload({
    cid: pin.cid,
    filename,
    isFolder: !pin.extension,
  });

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

  return filename;
};
