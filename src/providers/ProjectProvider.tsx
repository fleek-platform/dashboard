import { routes } from '@fleek-platform/utils-routes';

import { decodeAccessToken } from '@fleek-platform/utils-token';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useProjectsQuery, useProjectQuery } from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { ProjectList } from '@/types/Project';
import { createContext } from '@/utils/createContext';

import { useAuthContext } from './AuthProvider';
import { useCookies } from './CookiesProvider';
import { LoadingFullScreen } from '@/components/Loading';

const LOADING_MIN_TIMEOUT = 800;

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
  const [projectQuery] = useProjectQuery({
    variables: { where: { id: router.query.projectId! } },
    pause: !router.query.projectId,
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

  useEffect(() => {
    if (!pathname || !cookies.values.projectId) return;

    if (pathname.includes('[projectId]')) {
      const { page, ...parsedProjectQueryRoute } = router.query;
      router.replace({
        query: {
          ...parsedProjectQueryRoute,
          projectId: cookies.values.projectId,
        },
      });
    }

    if (!pathname.includes('[projectId]') && !pathname.includes(cookies.values.projectId)) {
      router.push({
        pathname: routes.project.home({
          projectId: cookies.values.projectId,
        }),
        query: router.query,
      });
    }
  }, [cookies.values.projectId, pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(projectQuery.fetching || !projectQuery.data);
    }, LOADING_MIN_TIMEOUT);

    return () => clearTimeout(timer);
  }, [projectQuery.fetching, projectQuery.data]);

  const project = useMemo(() => {
    return projectQuery?.data?.project;
  }, [cookies.values.projectId, projectQuery]);

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
