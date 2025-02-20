import { routes } from '@fleek-platform/utils-routes';

import { decodeAccessToken } from '@fleek-platform/utils-token';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useProjectsQuery } from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { ProjectList } from '@/types/Project';
import { createContext } from '@/utils/createContext';

import { useAuthContext } from './AuthProvider';
import { useCookies } from './CookiesProvider';
import { LoadingFullScreen } from '@/components/Loading';
import { getQueryParamsToObj } from '@/utils/url';

const LOADING_MIN_TIMEOUT = 400;

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
  const [isLoading, setIsLoading] = useState(true);
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

  const project = (() => {
    // WARNING: Unfortunately, app uses waterfall architecture
    // which causes data to have to be available
    // for this reason the lookup is in list of projects
    // instead of projectQuery.data.project
    return projectsQuery?.data?.projects?.data.find(
      (project) => project.id === cookies.values.projectId,
    );
  })();

  useEffect(() => {
    if (!pathname || !cookies.values.projectId) return;

    // TODO: AuthProvider already has a concurrent method?
    if (pathname.includes('[projectId]')) {
      const query = getQueryParamsToObj(window.location.search);
      router.replace({
        query,
        pathname: pathname.replace('[projectId]', cookies.values.projectId),
      });

      return;
    }

    if (
      pathname.startsWith('/projects') &&
      !pathname.includes('[projectId]') &&
      !pathname.includes(cookies.values.projectId)
    ) {
      setIsLoading(true);
      router.push({
        pathname: routes.project.home({
          projectId: cookies.values.projectId,
        }),
        query: router.query,
      });

      return;
    }
  }, [cookies.values.projectId, pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loading =
        !project && projectsQuery.fetching;
      setIsLoading(loading);
    }, LOADING_MIN_TIMEOUT);

    return () => clearTimeout(timer);
  }, [project, projectsQuery.data]);

  if (isLoading) return <LoadingFullScreen />;

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
