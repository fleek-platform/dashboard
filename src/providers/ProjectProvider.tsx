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

    const isProjectRoute = pathname.includes('[projectId]');

    if (isProjectRoute) {
      const { page, ...parsedProjectQueryRoute } = router.query;
      router.replace({
        query: {
          ...parsedProjectQueryRoute,
          projectId: cookies.values.projectId,
        },
      });
    }
  }, [cookies.values.projectId, pathname]);

  const project = useMemo(() => {
    return projectQuery?.data?.project;
  }, [cookies.values.projectId, projectQuery]);

  const isLoading = projectQuery.fetching || !projectQuery.data;

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
