import { Button } from '@/ui';

import { useDeploySiteContext } from './DeploySite.context';

export const BackButton: React.FC = () => {
  const { handleBackClick } = useDeploySiteContext();

  return (
    <Button iconLeft="arrow-left" intent="neutral" onClick={handleBackClick}>
      Go back
    </Button>
  );
};
