import { AlertBox } from '@/components';

export const SelfManagedBanner: React.FC = () => {
  return (
    <AlertBox variant="warning">
      Use the below config files in your project, once your first deploy is done, this site will start propagating.
    </AlertBox>
  );
};
