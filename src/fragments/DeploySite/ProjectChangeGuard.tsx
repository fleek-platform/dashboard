import { useEffect } from 'react';

import { useSessionContext } from '@/providers/SessionProvider';
import { Stepper } from '@/ui';

import { useDeploySiteContext } from './DeploySite.context';

export const ProjectChangeGuard: React.FC = () => {
  const { setSourceProvider } = useDeploySiteContext();
  const session = useSessionContext();
  const stepper = Stepper.useContext();

  useEffect(() => {
    stepper.setStep(1);

    setSourceProvider(undefined);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.project.id]);

  return null;
};
