import { routes } from '@fleek-platform/utils-routes';
import { decodeAccessToken } from '@fleek-platform/utils-token';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

import {
  useProjectsQuery,
} from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { ProjectList } from '@/types/Project';
import { createContext } from '@/utils/createContext';
import { Log } from '@/utils/log';

import { useAuthContext } from './AuthProvider';
import { useCookies } from './CookiesProvider';
import { useLogout } from '@/hooks/useLogout';

export type ProjectContext = {
  loading: boolean;
  project: ProjectList[0];
  error?: any;
  isCreateProjectModalOpen: boolean;
  setIsCreateProjectModalOpen: (open: boolean) => void;
};

const [Provider, useContext] = createContext<ProjectContext>({
  name: 'ProjectContext',
  hookName: 'useProjectContext',
  providerName: 'ProjectProvider',
});

export const ProjectProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const auth = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const cookies = useCookies();
  const [projectsQuery] = useProjectsQuery({
    pause: !auth.accessToken,
    variables: {
      filter: {},
    },
  });
  const { logout } = useLogout();
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);

  useEffect(() => {
    const { data, fetching } = projectsQuery;
    const { accessToken } = auth;

    if (!data || !accessToken || fetching) {
      return;
    }

    const projects = data.projects.data;

    const changeProject = async (newProjectId: string) => {
      const allowedProject = projects.find(
        (project) => project.id === newProjectId,
      );

      if (!allowedProject) {
        newProjectId = projects[0].id;
      }

      const redirect = async () => {
        const shouldRedirect = router.pathname === routes.home();

        if (shouldRedirect) {
          // keep query on redirect
          router.push({
            pathname: routes.project.home({ projectId: newProjectId }),
            query: router.query,
          });
        }

        const isProjectRoute = pathname.includes('[projectId]');

        if (isProjectRoute) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { page, ...parsedProjectQueryRoute } = router.query;

          return router.replace({
            query: { ...parsedProjectQueryRoute, projectId: newProjectId },
          });
        }
      };

      const sameProject =
        decodeAccessToken({ token: accessToken }).projectId === newProjectId;

      if (sameProject && allowedProject) {
        await redirect();

        return;
      }

      try {
        await auth.switchProjectAuth(newProjectId);
        await redirect();
        cookies.set('projectId', newProjectId);
      } catch (error) {
        Log.error('Failed to switch project', error);
      }
    };

    // TODO: This seem to be more appropriate to change on:
    // - drop down menu item selection
    // - router project id switch
    // changeProject(cookies.values.projectId ?? projects[0].id);

    if (!cookies.values.projectId) {
      logout();
    }

    changeProject(cookies.values.projectId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.values.projectId, projectsQuery]);

  useEffect(() => {
    if (!cookies || !router.query.projectId) return;
        
    cookies.set('projectId', router.query.projectId);
  }, [router.query.projectId]);

  // TODO: Querying the project by id seems wiser
  const project = useMemo(() => {
    if (!cookies.values.projectId || projectsQuery.data) return;

    const projects = projectsQuery.data.projects.data;

    return (
      projects.find((project) => project.id === cookies.values.projectId)
    );
  }, [cookies.values.projectId, projectsQuery.data.projects.data]);

  const isLoading = useMemo(() => {
    if (!cookies.values.authToken) return false;

    if ((cookies.values.authToken && !auth.accessToken) && (cookies.values.authToken && !cookies.values.accessToken)) return true;
    
    return !projectsQuery.data?.projects.data.some(
      (listProject) => project.id === listProject.id,
    );
  }, [
    projectsQuery.data,
    project.id,
    auth.accessToken,
    cookies.values.authToken,
  ]);

  return (
    <Provider
      value={{
        project,
        loading: isLoading,
        error: projectsQuery.error,
        isCreateProjectModalOpen,
        setIsCreateProjectModalOpen,
      }}
    >
      {children}
    </Provider>
  );
};

export const useProjectContext = useContext;
