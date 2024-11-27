import { useUpload } from '@/hooks/useUpload';
import { useUploadSizeLimit } from '@/hooks/useUploadSizeLimit';
import { useUploadContext } from '@/providers/UploadProvider';
import { Input } from '@/ui';
import { filterFiles } from '@/utils/filterUpload';

type UploadFilesItemProps = {
  inputFilesRef: React.RefObject<HTMLInputElement>;
};

export const UploadFilesItem: React.FC<UploadFilesItemProps> = ({
  inputFilesRef,
}) => {
  const { setUploads, updateUpload } = useUploadContext();
  const upload = useUpload();
  const uploadSizeLimit = useUploadSizeLimit();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !upload) {
      return;
    }

    const { acceptedFiles, rejectedFiles } = filterFiles(
      Array.from(event.target.files) as File[],
      uploadSizeLimit,
    );

    Promise.all(
      acceptedFiles.map((file) =>
        upload.mutateAsync({
          upload: file,
          updateUpload: (file) => updateUpload(file),
        }),
      ),
    );

    setUploads((prevUploads) => {
      return [...rejectedFiles, ...acceptedFiles, ...prevUploads];
    });

    if (inputFilesRef.current) {
      // needed to reset cause otherwise user can't upload 2 files with same name
      inputFilesRef.current.value = '';
    }
  };

  return (
    <Input.Root className="hidden">
      <Input.Field
        hidden
        type="file"
        multiple
        ref={inputFilesRef}
        onChange={handleChange}
      />
    </Input.Root>
  );
};
