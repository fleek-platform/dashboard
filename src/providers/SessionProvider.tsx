import { routes } from '@fleek-platform/utils-routes';
import { useEffect, useMemo } from 'react';

import { useToast } from '@/hooks/useToast';
import { createContext } from '@/utils/createContext';

import { AuthContext, AuthProvider, useAuthContext } from './AuthProvider';
import { BillingProvider, useBillingContext } from './BillingProvider';
import { PHIdentifier } from './PHProvider';
import {
  PermissionsContext,
  PermissionsProvider,
  usePermissionsContext,
} from './PermissionsProvider';
import {
  ProjectContext,
  ProjectProvider,
  useProjectContext,
} from './ProjectProvider';
import { useRouter } from '@/hooks/useRouter';

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
  const router = useRouter();
  const permissions = usePermissionsContext();
  const billing = useBillingContext();

  const project = useProjectContext();

  const loading = useMemo(
    () =>
      auth.isLoading ||
      project.loading ||
      permissions.loading ||
      billing.loading,
    [auth.isLoading, billing.loading, permissions.loading, project.loading],
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

  const handleProjectChange = async (newProjectId: string) => {
    if (auth.token) {
      auth.switchProjectAuth(newProjectId);
      const { _, ...parsedProjectQueryRoute } = router.query;
      router.push({
        query: { ...parsedProjectQueryRoute, projectId: newProjectId },
      });

      return;
    }
    // TODO: Determine isProjectRequired with Provider & HOC
    /*
    if (!isProjectRequired) {
    }

    if (router.query.siteId) {
      await router.push(routes.project.site.list({ projectId: newProjectId }));
      delete router.query.siteId;
    } else {
      const { _, ...parsedProjectQueryRoute } = router.query;
      router.push({ query: { ...parsedProjectQueryRoute, projectId: newProjectId } });
    }
    */
  };

  return (
    <Provider
      value={{
        loading,
        error,
        auth,
        project: project.project,
        permissions: permissions.permissions,
        setProject: handleProjectChange,
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
    <ProjectProvider>
      <PermissionsProvider>
        <BillingProvider>
          <InnerProvider>
            <PHIdentifier />
            {children}
          </InnerProvider>
        </BillingProvider>
      </PermissionsProvider>
    </ProjectProvider>
  );
};

export const useSessionContext = useContext;
