import { useUploadContext } from '@/providers/UploadProvider';

import { UploadWidget } from './UploadWidget/UploadWidget';

export const Widget: React.FC = () => {
  const { uploads } = useUploadContext();

  return <UploadWidget uploads={uploads} />;
};
