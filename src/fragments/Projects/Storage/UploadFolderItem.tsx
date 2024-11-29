import type { MutableRefObject } from 'react';

import { useUpload } from '@/hooks/useUpload';
import { useUploadSizeLimit } from '@/hooks/useUploadSizeLimit';
import { useUploadContext } from '@/providers/UploadProvider';
import { Input } from '@/ui';
import { filterFolder } from '@/utils/filterUpload';

type UploadFolderItemProps = {
  inputFolderRef: MutableRefObject<HTMLInputElement | null>;
};

export const UploadFolderItem: React.FC<UploadFolderItemProps> = ({
  inputFolderRef,
}) => {
  const { setUploads, updateUpload } = useUploadContext();
  const upload = useUpload();
  const uploadSizeLimit = useUploadSizeLimit();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !upload) {
      return;
    }

    const folderToUpload = filterFolder(
      event.target.files as FileList,
      uploadSizeLimit,
    );

    upload.mutateAsync({
      upload: folderToUpload,
      updateUpload: (folderToUpload) => updateUpload(folderToUpload),
    });

    setUploads((prevUploads) => {
      return [folderToUpload, ...prevUploads];
    });
  };

  return (
    <Input.Root className="hidden">
      <Input.Field
        hidden
        type="file"
        multiple
        ref={(node) => {
          inputFolderRef.current = node;

          if (node) {
            ['webkitdirectory', 'directory', 'mozdirectory'].forEach((attr) => {
              node.setAttribute(attr, '');
            });
          }
        }}
        onChange={handleChange}
      />
    </Input.Root>
  );
};
