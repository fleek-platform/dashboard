import { EmptyState } from '@/ui';

export const EmptyMessage: React.FC = () => {
  return (
    <EmptyState
      title="No sites yet"
      description="Use the `Add new` button or select a template to deploy your first site on Fleek."
      section="hosting"
    />
  );
};
