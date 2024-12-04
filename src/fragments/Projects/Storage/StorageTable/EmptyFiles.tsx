import { EmptyState } from '@/ui';

export const EmptyFiles: React.FC = () => {
  return (
    <EmptyState
      title="No files yet"
      description="Click `Upload` button to store your first file or folder on Fleek."
      section="storage"
    />
  );
};
