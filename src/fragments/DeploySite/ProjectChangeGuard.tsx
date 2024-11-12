import { useEffect } from 'react';

import { useSessionContext } from '@/providers/SessionProvider';
import { Stepper } from '@/ui';

import { useDeploySiteContext } from './DeploySite.context';

export const ProjectChangeGuard: React.FC = () => {
  const { setGitBranch, setGitUser, setGitRepository, setSourceProvider } = useDeploySiteContext();
  const session = useSessionContext();
  const stepper = Stepper.useContext();

  useEffect(() => {
    stepper.setStep(1);

    setGitBranch(undefined);
    setGitUser(undefined);
    setGitRepository(undefined);
    setSourceProvider(undefined);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.project.id]);

  return null;
};
