import { useEffect, useMemo } from 'react';

import { useToast } from '@/hooks/useToast';
import { createContext } from '@/utils/createContext';

import { type AuthContext, AuthProvider, useAuthContext } from './AuthProvider';
import { BillingProvider, useBillingContext } from './BillingProvider';
import { useCookies } from './CookiesProvider';
import {
  type PermissionsContext,
  PermissionsProvider,
  usePermissionsContext,
} from './PermissionsProvider';
import {
  type ProjectContext,
  ProjectProvider,
  useProjectContext,
} from './ProjectProvider';

type SessionContext = {
  loading: boolean;
  error?: any;

  auth: Pick<AuthContext, 'login' | 'logout' | 'token'>;
  project: ProjectContext['project'];
  permissions: PermissionsContext['permissions'];

  setProject: (newProjectId: string) => void;
};

const [Provider, useContext] = createContext<SessionContext>({
  name: 'SessionContext',
  hookName: 'useSessionContext',
  providerName: 'SessionProvider',
});

const InnerProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const auth = useAuthContext();
  const toast = useToast();
  const permissions = usePermissionsContext();
  const billing = useBillingContext();

  const project = useProjectContext();
  const cookies = useCookies();

  const loading = useMemo(
    () =>
      auth.loading || project.loading || permissions.loading || billing.loading,
    [auth.loading, billing.loading, permissions.loading, project.loading],
  );

  const error = useMemo(
    () => auth.error || project.error,
    [auth.error, project.error],
  );

  useEffect(() => {
    if (error) {
      toast.error({ error, log: 'Session Error' });
      auth.logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const setProject = (newProjectId: string) => {
    cookies.set('projectId', newProjectId);
  };

  return (
    <Provider
      value={{
        loading,
        error,
        auth,
        project: project.project,
        permissions: permissions.permissions,
        setProject,
      }}
    >
      {children}
    </Provider>
  );
};

export const SessionProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <ProjectProvider>
        <PermissionsProvider>
          <BillingProvider>
            <InnerProvider>{children}</InnerProvider>
          </BillingProvider>
        </PermissionsProvider>
      </ProjectProvider>
    </AuthProvider>
  );
};

export const useSessionContext = useContext;
