import { useEffect } from 'react';

import { useSessionContext } from '@/providers/SessionProvider';
import { Stepper } from '@/ui';

import { useDeploySiteContext } from './DeploySite.context';

export const ProjectChangeGuard: React.FC = () => {
  const { setSourceProvider } = useDeploySiteContext();
  const session = useSessionContext();
  const stepper = Stepper.useContext();

  useEffect(() => {
    if (!session.project.id) return;

    stepper.setStep(1);

    setSourceProvider(undefined);
  }, [stepper.setStep, session.project.id, setSourceProvider]);

  return null;
};
