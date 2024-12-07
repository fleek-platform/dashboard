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

export type Project = ProjectList[0];
export type ProjectContext = {
  loading: boolean;
  project: Project;
  error?: any;
  isCreateProjectModalOpen: boolean;
  setIsCreateProjectModalOpen: (open: boolean) => void;
};

const [Provider, useContext] = createContext<ProjectContext>({
  name: 'ProjectContext',
  hookName: 'useProjectContext',
  providerName: 'ProjectProvider',
});

// TODO: This should not be used
// used at the moment just for TIAS
// to replace the original author's
// Located where below the <Provider>{children}</Provider>
// is the `project` computed as it shouldn't
// the landing page should display immediately
// without page drilling
const emptyProject = {
  id: '',
  name: 'Project',
  currentUserMembership: {
    permissionGroup: {
      id: '',
      name: '',
      permissions: [],
    },
  },
};

export const ProjectProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const auth = useAuthContext();
  const router = useRouter();
  const cookies = useCookies();
  const [projectsQuery, refetchProjectsQuery] = useProjectsQuery({
    pause: !auth.accessToken,
    variables: {},
  });
  const [, createProject] = useCreateProjectMutation();
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);
  const [defaultProjectId, setDefaultProjectId] = useState('');
  const [project, setProject] = useState<Project>(emptyProject);

  useEffect(() => {
    console.log('[debug] ProjectProvider: useEffect: deps auth.accessToken, cookies.values.projecId, etc: 1');

    // TODO: Maybe move to the initProjectHandler useEffect
    const defaultProjectIdHandler = () => {
      console.log('[debug] ProjectProvider: useEffect: deps auth.accessToken, cookies.values.projecId, etc: defaultProjectIdHandler : 1');
    
      if (!auth.accessToken) {
        console.log('[debug] ProjectProvider: useEffect: defaultProjectIdHandler: deps auth.accessToken, cookies.values.projecId, etc: defaultProjectIdHandler : accessToken NOT');

        return;
      }

      if (projectsQuery.fetching) {
        console.log('[debug] ProjectProvider: useEffect: defaultProjectIdHandler: deps auth.accessToken, cookies.values.projecId, etc: defaultProjectIdHandler : projectsQuery fetching TRUE');

        return;
      }

      // TODO: Solve the optional chain assessment
      if (!Array.isArray(projectsQuery.data?.projects?.data) || !projectsQuery.data?.projects?.data.length) {
        console.log('[debug] ProjectProvider: useEffect: defaultProjectIdHandler: deps auth.accessToken, cookies.values.projecId, etc: defaultProjectIdHandler : projects.data NOT');

        return;
      }

      // TODO: Create utility to decide which project
      // when we don't know which is the user preference
      // we use the fallback
      // guess this should be set as user preference
      // in the service side
      const projects = projectsQuery.data.projects.data;
      const userProject = projects.find(item => item.id === cookies.values.projectId);

      if (!userProject) {
        console.log('[debug] ProjectProvider: useEffect: defaultProjectIdHandler: deps auth.accessToken, cookies.values.projecId, etc: defaultProjectIdHandler : projectId NOT; what to do in this case?', JSON.stringify(projects));

        setProject(projects[0]);

        return;
      }

      setProject(userProject);

      // TODO: This should be removed
      // for the moment just for TIAS
      // as we have the setProject
      // setDefaultProjectId(project.id);
    };

    defaultProjectIdHandler();
  }, [auth.accessToken, projectsQuery.fetching, projectsQuery.data?.projects?.data, cookies.values?.accessToken, cookies.values?.projectId, project?.id]);

  useEffect(() => {
    console.log('[debug] ProjectProvider: useEffect: auth.accessToken triggered')
  }, [auth.accessToken]);

  // Does something when a default
  // projectId is determined
  useEffect(() => {
    if (!project || !project.id) {
      console.log('[debug] ProjectProvider: defaultProjectId NOT');
      
      return;
    }

    console.log(`[debug] ProjectProvider: defaultProjectId = ${project.id}`);
    auth.gotoProjectHome(project.id);
  }, [project]);

  // Does something when the URL
  // which includes the projectId changes
  // e.g. main menu project selection
  useEffect(() => {
    console.log('[debug] ProjectProvider: useEffect: deps router.query.projectId: 1');

    if (!router.query.projectId || router.query.projectId === project.id) {
      console.log('[debug] ProjectProvider: useEffect: dep router.query.projectId: NOT projectid')

      return;
    }

    console.log(`[debug] ProjectProvider: useEffect dep router.query.projectId): ${router.query.projectId}`);

    const onProjectChange = async () => {
      // TODO: This should be set in a `project` change
      // not here
      // cookies.set('projectId', router.query.projectId);
      await (refetchProjectsQuery({ requestPolicy: 'network-only' }) as unknown as Promise<void>);
    }

    onProjectChange();
  }, [router.query.projectId]);

  useEffect(() => {
    console.log('[debug] ProjectProvider: useEffect: deps project: 1: should cookies.set project id')
    if (!project || project.id === cookies.values.projectId) {
      console.log('[debug] ProjectProvider: useEffect: deps project: project NOT')

      return;
    }
    console.log('[debug] ProjectProvider: useEffect: deps project: 2: should cookies.set project id', JSON.stringify({
      hasProject: !!project,
      project,
    }))
    cookies.set('projectId', project.id);
  }, [project]);

  useEffect(() => {
    const initProject = async () => {
      const { data, fetching } = projectsQuery;
      const { accessToken } = auth;

      if (fetching) {
        console.log('[debug] ProjectProvider: useEffect: deps cookies.values.projectId + projectsQuery.data.projects.data, etc: fetching TRUE');

        return;
      }

      if (!data || !accessToken) {
        console.log('[debug] ProjectProvider: useEffect: deps cookies.values.projectId + projectsQuery.data.projects.data, etc: doesnt have data or accessToken');

        return;
      }

      const projects = data.projects.data;

      if (!projects.length) {
        console.log('[debug] ProjectProvider: useEffect: dps cookies.values.projectId, projectsQuery?.fetching, projectsQuery.data?.projects?.data: projects.lenght NOT')
        // TODO: This should be awaited otherwise
        // it'll cause concurrency. The original author
        // failed to await, for this reason there
        // implementation issues elsewhere due to concurrency
        await createInitialProject({
          name: constants.FIRST_PROJECT_NAME,
          // TODO: Type this correctly
          createProject: createProject as unknown as CreateProject,
          refetchProjectsQuery: refetchProjectsQuery as RefetchProjectsQuery,
        });

        return;
      }

      const projectId = cookies.values.projectId;
      const hasChangedProject = changeProject({
        projectId,
        projects,
        accessToken,
      });

      if (hasChangedProject) {
        console.log(`[debug] ProjectProvider: hasChangedProject = ${hasChangedProject}, projectId = ${projectId}`);

        return;
      }

      console.log(`[debug] ProjectProvider: useEffect: dps cookies.values.projectId, projectsQuery?.fetching, projectsQuery.data?.projects?.data: hasChangedProject = ${hasChangedProject}`);

      redirect({
        projectId,
        router,
      });
    };

    initProject();
  }, [cookies.values.projectId, projectsQuery?.fetching, projectsQuery.data?.projects?.data]);

  // TODO: This is causing a concurrency issue
  // due to setting a project id on refresh.
  // If the user is logged in, the projectId
  // should already exist in the cookie.
  // // Update cookie on first run if it is present in the url
  // useEffect(() => {
  //   if (router.query.projectId) {
  //     cookies.set('projectId', router.query.projectId);
  //   }
  // }, []);

  // TODO: This should be replaced after the
  // change for setDefaultProjectId as setProject instead
  // const project = useMemo(() => {
  //   const { data } = projectsQuery;
  //   const defaultProject = {
  //     id: router.query.projectId || '',
  //     name: 'Project',
  //     currentUserMembership: {
  //       permissionGroup: {
  //         id: '',
  //         name: '',
  //         permissions: [],
  //       },
  //     },
  //   };

  //   if (!data) {
  //     return defaultProject;
  //   }

  //   const projects = data.projects.data;

  //   return (
  //     projects.find((project) => project.id === cookies.values.projectId) ||
  //     defaultProject
  //   );
  // }, [cookies.values.projectId, projectsQuery.data?.projects?.data, router, defaultProjectId]);

  const loading = projectsQuery.fetching || !project;

  if (!project) {
    console.log(`[debug] ProjectProvider: projectsQuery.fetching or !project ${JSON.stringify({
      fetching: projectsQuery.fetching,
      project,
    })}`);

    return;
  }

  return (
    <Provider
      value={{
        project,
        loading,
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

// TODO: Move as utility
// refactor to make it unit testable
const changeProject = ({
  projectId,
  projects,
  accessToken,
}: {
  projectId: string;
  projects: ProjectList;
  accessToken: string;
}): boolean => {
  const allowedProject = projects.find(
    (project) => project.id === projectId,
  );

  if (!allowedProject) {
    projectId = projects[0].id;
  }

  const sameProject =
    decodeAccessToken({ token: accessToken }).projectId === projectId;

  if (sameProject && allowedProject) {

    return false;
  }

  return true;
};

// TODO: Move as utility should be unit testable
const redirect = ({
  router,
  projectId,
}: {
  router: ReturnType<typeof useRouter>;
  projectId: string;
}) => {
  console.log(`[debug] ProjectProvider: redirect: 1`);
  const shouldRedirect = router.pathname === routes.home();
  console.log(`[debug] ProjectProvider: redirect: shouldRedirect = ${shouldRedirect}`);
  if (shouldRedirect) {
    // keep query on redirect
    router.push({
      pathname: routes.project.home({ projectId }),
      query: router.query,
    });
  }

  const isProjectRoute = router.pathname.includes('[projectId]');
  console.log(`[debug] ProjectProvider: redirect: isProjectRoute = ${isProjectRoute}`);

  if (isProjectRoute) {
    const { page, ...parsedProjectQueryRoute } = router.query;

    return router.replace({
      query: { ...parsedProjectQueryRoute, projectId },
    });
  }
};

// TODO: Type this correctly
type CreateProject = (args: { data: { name: string; }}) => Promise<void>;
// TODO: Type this correctly
type RefetchProjectsQuery = (args: { requestPolicy: string }) => Promise<void>;

const createInitialProject = async ({
  name,
  createProject,
  refetchProjectsQuery,
}: {
  name: string;
  createProject: CreateProject;
  refetchProjectsQuery: RefetchProjectsQuery;
}) => {
  try {
    await createProject({ data: { name } });
    await refetchProjectsQuery({ requestPolicy: 'network-only' });
  } catch (error) {
    // TODO: handle error
    Log.error('Failed to create initial project', error);
  }
};
