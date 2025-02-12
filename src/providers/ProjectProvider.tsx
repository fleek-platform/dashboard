import { routes } from '@fleek-platform/utils-routes';
import { decodeAccessToken } from '@fleek-platform/utils-token';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

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
import { useLogout } from '@/hooks/useLogout';

export type ProjectContext = {
  loading: boolean;
  project: ProjectList[0];
  accessTokenProjectId?: string;
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
  const pathname =usePathname();
  const cookies = useCookies();
  const [projectsQuery, refetchProjectsQuery] = useProjectsQuery({
    pause: !auth.accessToken,
    variables: {
      filter: {},
    },
  });
  const { logout } = useLogout();
  const [, createProject] = useCreateProjectMutation();
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);

  const accessTokenProjectId = useMemo(() => {
    if (!auth.accessToken) {
      return undefined;
    }

    try {
      return (
        decodeAccessToken({ token: auth.accessToken }).projectId ?? undefined
      );
    } catch {
      return undefined;
    }
  }, [auth.accessToken]);

  useEffect(() => {
    const { data, fetching } = projectsQuery;
    const { accessToken } = auth;

    if (!data || !accessToken || fetching) {
      return;
    }

    const projects = data.projects.data;

    // TODO: This should be removed?
    // given the introduction of the new endpoint
    // to replace loginWithDynamic
    // if (projects.length === 0) {
    //   const createInitialProject = async () => {
    //     try {
    //       await createProject({ data: { name: constants.FIRST_PROJECT_NAME } });
    //       refetchProjectsQuery({ requestPolicy: 'network-only' });
    //     } catch (error) {
    //       // TODO: handle error
    //       Log.error('Failed to create initial project', error);
    //     }
    //   };

    //   createInitialProject();

    //   return;
    // }

    const changeProject = async (newProjectId: string) => {
      console.log(`[debug] ProjectProvider: changeProject: 1`)
      
      const allowedProject = projects.find(
        (project) => project.id === newProjectId,
      );

      if (!allowedProject) {
        newProjectId = projects[0].id;
      }

      const redirect = async () => {
        console.log(`[debug] ProjectProvider: changeProject: redirect: 1: ${JSON.stringify({
          pathname,
          routesHome: routes.home(),
          routerPathname: router.pathname,
        })}`);

        const shouldRedirect = router.pathname === routes.home();

        console.log(`[debug] ProjectProvider: changeProject: redirect: shouldRedirect = ${shouldRedirect}`)

        if (shouldRedirect) {
          // keep query on redirect
          router.push({
            pathname: routes.project.home({ projectId: newProjectId }),
            query: router.query,
          });
        }

        const isProjectRoute = pathname.includes('[projectId]');

        if (isProjectRoute) {
                  console.log(`[debug] ProjectProvider: changeProject: redirect: isProjectRoute = ${isProjectRoute}`)

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
    if (router.query.projectId) {
      cookies.set('projectId', router.query.projectId);
    }
    // Update cookie on first run if it is present in the url
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!cookies.values.accessToken || !cookies.values.projectId) {
      return;
    }

    if (pathname === routes.home()) {
      console.log(`[debug] ProjectProvider: useEffect: cookie accessstoken+projectId: pathname equals home`)
      const { projectId } = cookies.values;
      // keep query on redirect
      router.push({
        pathname: routes.project.home({ projectId }),
        query: router.query,
      });
    }
  }, [cookies.values.accessToken, cookies.values.projectId]);

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
      updatedAt: '',
    };

    if (!data || !cookies.values.projectId) {
      return defaultProject;
    }

    const projects = data.projects.data;

    return (
      projects.find((project) => project.id === cookies.values.projectId) ||
      defaultProject
    );
  }, [cookies.values.projectId, projectsQuery, router]);

  const isLoading = useMemo(() => {
    if (!cookies.values.authToken) {
      delete projectsQuery.data; // this is forcing a cache clean for when it has logout

      return false;
    }

    if (cookies.values.authToken && !auth.accessToken) {
      return true;
    }

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
        accessTokenProjectId,
      }}
    >
      {children}
    </Provider>
  );
};

export const useProjectContext = useContext;
