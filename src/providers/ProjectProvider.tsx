import { routes } from '@fleek-platform/utils-routes';
import { decodeAccessToken } from '@fleek-platform/utils-token';
import { useEffect, useMemo, useState } from 'react';

import { constants } from '@/constants';
import {
  useCreateProjectMutation,
  useProjectsQuery,
} from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { ProjectList } from '@/types/Project';
import { createContext } from '@/utils/createContext';
import { Log } from '@/utils/log';

import { useAuthContext } from './AuthProvider';
import { useCookies } from './CookiesProvider';

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
  const cookies = useCookies();
  const [projectsQuery, refetchProjectsQuery] = useProjectsQuery({
    pause: !auth.token,
    variables: {},
  });
  const [, createProject] = useCreateProjectMutation();
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);

  useEffect(() => {
    const { data, fetching } = projectsQuery;
    const { token } = auth;

    if (!data || !token || fetching) {
      return;
    }

    const projects = data.projects.data;

    if (projects.length === 0) {
      const createInitialProject = async () => {
        try {
          await createProject({ data: { name: constants.FIRST_PROJECT_NAME } });
          refetchProjectsQuery({ requestPolicy: 'network-only' });
        } catch (error) {
          // TODO: handle error
          Log.error('Failed to create initial project', error);
        }
      };

      createInitialProject();

      return;
    }

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

        const isProjectRoute = router.pathname.includes('[projectId]');

        if (isProjectRoute) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { page, ...parsedProjectQueryRoute } = router.query;

          return router.replace({
            query: { ...parsedProjectQueryRoute, projectId: newProjectId },
          });
        }
      };

      const sameProject =
        decodeAccessToken({ token }).projectId === newProjectId;

      if (sameProject && allowedProject) {
        await redirect();

        return;
      }

      try {
        await auth.switchProjectAuth(newProjectId);
        await redirect();
        cookies.set('lastProjectId', newProjectId);
      } catch (error) {
        Log.error('Failed to switch project', error);
      }
    };

    changeProject(cookies.values.lastProjectId ?? projects[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.values.lastProjectId, projectsQuery]);

  useEffect(() => {
    if (router.query.projectId) {
      cookies.set('lastProjectId', router.query.projectId);
    }
    // Update cookie on first run if it is present in the url
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const project = useMemo(() => {
    const { data } = projectsQuery;
    const defaultProject = {
      id: router.query.projectId || '',
      name: 'Project',
      currentUserMembership: {
        permissionGroup: {
          id: '',
          name: '',
          permissions: [],
        },
      },
    };

    if (!data) {
      return defaultProject;
    }

    const projects = data.projects.data;

    return (
      projects.find((project) => project.id === cookies.values.lastProjectId) ||
      defaultProject
    );
  }, [cookies.values.lastProjectId, projectsQuery, router]);

  const isLoading = useMemo(() => {
    if (!cookies.values.authProviderToken) {
      delete projectsQuery.data; // this is forcing a cache clean for when it has logout

      return false;
    }

    if (cookies.values.authProviderToken && !auth.token) {
      return true;
    }

    return !projectsQuery.data?.projects.data.some(
      (listProject) => project.id === listProject.id,
    );
  }, [
    projectsQuery.data,
    project.id,
    auth.token,
    cookies.values.authProviderToken,
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
