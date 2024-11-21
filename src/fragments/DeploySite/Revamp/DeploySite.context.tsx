import {
  type Dispatch,
  type MouseEventHandler,
  type SetStateAction,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { useClient } from 'urql';

import {
  GitProviderDocument,
  type GitProviderQuery,
  type GitProviderQueryVariables,
  GitProviderTags,
  SiteDeploymentRequirementsDocument,
  type SiteDeploymentRequirementsMutation,
  type SiteDeploymentRequirementsMutationVariables,
  SourceProvider,
} from '@/generated/graphqlClient';
import { useSessionContext } from '@/providers/SessionProvider';
import { Stepper } from '@/ui';
import { createContext } from '@/utils/createContext';
import { openPopUpWindow } from '@/utils/openPopUpWindow';

type ProviderRequirements = {
  authorizationUrl?: string | null;
  installationUrl?: string | null;
  shouldAuthenticate?: boolean;
  shouldInstall?: boolean;
};

export type GitRepository = {
  id: string;
  gitProviderId: string;
  defaultBranch: string;
  name: string;
  owner: string;
};

// Comes From page
type BaseDeploySiteContext = {
  mode: 'self' | 'managed' | 'template';

  title?: string;
  setTitle: (title: string) => void;
  handleBackClick?: MouseEventHandler<HTMLButtonElement>;
  setHandleBackClick: (
    handleBackClick: MouseEventHandler<HTMLButtonElement>,
  ) => void;
  gitUser?: GitUser;
  setGitUser: Dispatch<SetStateAction<GitUser | undefined>>;
  gitBranch?: string;
  setGitBranch: Dispatch<SetStateAction<string | undefined>>;
  gitRepository?: GitRepository;
  setGitRepository: Dispatch<SetStateAction<GitRepository | undefined>>;
  gitProviderId?: string;
  setGitProviderId: Dispatch<SetStateAction<string | undefined>>;

  sourceProvider?: SourceProvider;
  setSourceProvider: (sourceProvider?: SourceProvider) => void;

  // Template
  templateId?: string;
};

type ExtraDeploySiteContext = {
  providerState?: ProviderState;
  checkProviderRequirements: () => Promise<void>;
  handleGitProviderSelection: (sourceProvider: SourceProvider) => Promise<void>;
  isCurrentProviderLoading?: boolean;
  isPopUpOpen?: boolean;
  handleInstallation: () => void;
};

export type DeploySiteContext = BaseDeploySiteContext & ExtraDeploySiteContext;

const [BaseProvider, useContext] = createContext<DeploySiteContext>({
  name: 'DeploySiteContext',
  hookName: 'DeploySite.useContext',
  providerName: 'DeploySiteProvider',
});

export type ProviderState = {
  fetching: boolean;
  error: boolean;
  requirements?: ProviderRequirements;
  gitProviderId?: string;
  requirementsFetching: boolean;
  requirementsError: boolean;
};

type State = Record<SourceProvider, ProviderState>;

type ActionType = {
  type:
    | 'FETCH_START'
    | 'FETCH_SUCCESS'
    | 'FETCH_ERROR'
    | 'REQUIREMENTS_START'
    | 'REQUIREMENTS_SUCCESS'
    | 'REQUIREMENTS_ERROR';
  provider: SourceProvider;
  requirements?: ProviderRequirements;
  gitProviderId?: string;
};

const initialState: State = {
  GITHUB: {
    fetching: false,
    error: false,
    requirementsError: false,
    requirementsFetching: false,
  },
  GITLAB: {
    fetching: false,
    error: false,
    requirementsError: false,
    requirementsFetching: false,
  },
  BITBUCKET: {
    fetching: false,
    error: false,
    requirementsError: false,
    requirementsFetching: false,
  },
};

// eslint-disable-next-line fleek-custom/valid-argument-types
const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        [action.provider]: {
          ...state[action.provider],
          fetching: true,
          error: false,
        },
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        [action.provider]: {
          fetching: false,
          error: false,
          gitProviderId: action.gitProviderId,
        },
      };
    case 'FETCH_ERROR':
      return { ...state, [action.provider]: { fetching: false, error: true } };
    case 'REQUIREMENTS_START':
      return {
        ...state,
        [action.provider]: {
          ...state[action.provider],
          requirementsFetching: true,
          requirementsError: false,
        },
      };
    case 'REQUIREMENTS_SUCCESS':
      return {
        ...state,
        [action.provider]: {
          ...state[action.provider],
          requirementsFetching: false,
          requirementsError: false,
          requirements: action.requirements,
        },
      };
    case 'REQUIREMENTS_ERROR':
      return {
        ...state,
        [action.provider]: {
          ...state[action.provider],
          requirementsFetching: false,
          requirementsError: true,
        },
      };
    default:
      return state;
  }
};

const PREFETCH_SOURCE_PROVIDER = SourceProvider.GITHUB;

export const DeploySiteProvider: React.FC<
  React.PropsWithChildren<{ value: BaseDeploySiteContext }>
> = ({ children, value }) => {
  const client = useClient();
  const session = useSessionContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const stepper = Stepper.useContext();
  const prefetchProjectId = useRef<string>();
  const isPopUpOpen = useRef<boolean>();
  const hasSelectedProvider = useRef<boolean>();
  const pendingActionRef = useRef<
    ((currentProvider?: ProviderState) => void) | null
  >(null);
  const pendingRequirementsRef = useRef<{
    gitProviderId: string;
    sourceProvider: SourceProvider;
  }>();

  const fetchGitProviderRequirements = useCallback(
    async (gitProviderId: string, sourceProvider: SourceProvider) => {
      try {
        dispatch({ type: 'REQUIREMENTS_START', provider: sourceProvider });

        const gitProviderRequirementsMutation = await client.mutation<
          SiteDeploymentRequirementsMutation,
          SiteDeploymentRequirementsMutationVariables
        >(SiteDeploymentRequirementsDocument, { where: { gitProviderId } });

        const { data: providerRequirementsResult } =
          gitProviderRequirementsMutation;

        if (
          !providerRequirementsResult ||
          gitProviderRequirementsMutation.error
        ) {
          throw (
            gitProviderRequirementsMutation.error ||
            new Error('Unexpected error fetching site deployment requirements')
          );
        }

        const {
          authorizationUrl,
          installationUrl,
          shouldInstall,
          shouldAuthenticate,
        } = providerRequirementsResult.siteDeploymentRequirements;

        dispatch({
          type: 'REQUIREMENTS_SUCCESS',
          provider: sourceProvider,
          requirements: {
            authorizationUrl,
            installationUrl,
            shouldInstall,
            shouldAuthenticate,
          },
        });

        return providerRequirementsResult.siteDeploymentRequirements;
      } catch {
        dispatch({ type: 'REQUIREMENTS_ERROR', provider: sourceProvider });
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [client, session.project.id],
  );

  const fetchGitProvider = useCallback(
    async (prefetchSourceProvider?: SourceProvider) => {
      const sourceProvider = prefetchSourceProvider
        ? prefetchSourceProvider
        : value.sourceProvider;

      if (!sourceProvider) {
        return;
      }

      dispatch({ type: 'FETCH_START', provider: sourceProvider });

      const tag =
        value.mode === 'template'
          ? GitProviderTags.templates
          : GitProviderTags.sites;

      try {
        const gitProviderQueryResult = await client.query<
          GitProviderQuery,
          GitProviderQueryVariables
        >(
          GitProviderDocument,
          { where: { tag } },
          { requestPolicy: 'network-only' },
        );

        const gitProvider = gitProviderQueryResult.data?.gitProvider;

        if (gitProviderQueryResult.error || !gitProvider) {
          throw gitProviderQueryResult.error;
        }

        dispatch({
          type: 'FETCH_SUCCESS',
          provider: sourceProvider,
          gitProviderId: gitProvider.id,
        });

        await fetchGitProviderRequirements(gitProvider.id, sourceProvider);

        return gitProvider.id;
      } catch {
        dispatch({ type: 'FETCH_ERROR', provider: sourceProvider });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      client,
      fetchGitProviderRequirements,
      value.mode,
      value.sourceProvider,
      session.project.id,
    ],
  );

  useEffect(() => {
    if (prefetchProjectId.current === session.project.id) {
      return;
    }

    if (state[PREFETCH_SOURCE_PROVIDER].fetching) {
      return;
    }

    prefetchProjectId.current = session.project.id;
    fetchGitProvider(PREFETCH_SOURCE_PROVIDER);
  }, [fetchGitProvider, state, session.project.id]);

  useEffect(() => {
    const currentProviderState = value.sourceProvider
      ? state[value.sourceProvider]
      : undefined;

    if (!currentProviderState) {
      return;
    }

    const isCurrentFetching =
      currentProviderState.requirementsFetching ||
      currentProviderState.fetching;

    if (!isCurrentFetching && pendingActionRef.current) {
      pendingActionRef.current(currentProviderState);
      pendingActionRef.current = null;
    }
  }, [value.sourceProvider, state]);

  const currentGitProvider =
    value.sourceProvider && state[value.sourceProvider]
      ? state[value.sourceProvider]
      : undefined;

  // eslint-disable-next-line fleek-custom/valid-argument-types
  const checkProviderRequirements = async (
    currentRequirements?: ProviderRequirements,
  ) => {
    if (!pendingRequirementsRef.current) {
      return;
    }

    const { gitProviderId, sourceProvider } = pendingRequirementsRef.current;
    const requirements = currentRequirements
      ? currentRequirements
      : await fetchGitProviderRequirements(gitProviderId, sourceProvider);

    if (
      !requirements ||
      requirements.shouldInstall ||
      requirements.shouldAuthenticate
    ) {
      return;
    }

    stepper.nextStep();
  };

  const handleOpenPopUp = (url: string) => {
    isPopUpOpen.current = true;
    openPopUpWindow({
      url,
      onClose: () => {
        isPopUpOpen.current = false;
        checkProviderRequirements();
      },
    });
  };

  // eslint-disable-next-line fleek-custom/valid-argument-types
  const handleGitProviderSelection = async (sourceProvider: SourceProvider) => {
    value.setSourceProvider(sourceProvider);
    hasSelectedProvider.current = true;

    const proceed = async (currentProviderState = state[sourceProvider]) => {
      const requirements = currentProviderState.requirements;

      pendingRequirementsRef.current = {
        gitProviderId: currentProviderState.gitProviderId!,
        sourceProvider,
      };
      value.setGitProviderId(currentProviderState.gitProviderId);

      // Only handle authentication on button click
      if (requirements?.authorizationUrl && requirements?.shouldAuthenticate) {
        handleOpenPopUp(requirements.authorizationUrl);

        return;
      }

      checkProviderRequirements(requirements);
    };

    if (
      state[sourceProvider].fetching ||
      state[sourceProvider].requirementsFetching
    ) {
      pendingActionRef.current = proceed;
    } else {
      await proceed();
    }
  };

  const handleInstallation = async () => {
    try {
      if (
        !currentGitProvider?.requirements ||
        !currentGitProvider?.requirements?.shouldInstall ||
        !currentGitProvider.requirements.installationUrl
      ) {
        return;
      }

      pendingRequirementsRef.current = {
        gitProviderId: currentGitProvider.gitProviderId!,
        sourceProvider: value.sourceProvider!,
      };
      handleOpenPopUp(currentGitProvider.requirements.installationUrl);
    } catch {}
  };

  const isCurrentProviderLoading =
    (hasSelectedProvider.current && currentGitProvider?.requirementsFetching) ||
    currentGitProvider?.fetching;

  return (
    <BaseProvider
      value={{
        ...value,
        providerState: currentGitProvider,
        gitProviderId: currentGitProvider?.gitProviderId,
        isPopUpOpen: isPopUpOpen.current,
        isCurrentProviderLoading,
        checkProviderRequirements,
        handleGitProviderSelection,
        handleInstallation,
      }}
    >
      {children}
    </BaseProvider>
  );
};

export const useDeploySiteContext = useContext;

type UseStepSetupProps = {
  title?: string;
  handleBackClick: MouseEventHandler<HTMLButtonElement>;
};

export const useStepSetup = ({ title, handleBackClick }: UseStepSetupProps) => {
  const { setTitle, setHandleBackClick } = useDeploySiteContext();

  useEffect(() => {
    if (title) {
      setTitle(title);
    }

    setHandleBackClick(() => handleBackClick); // suppress react set state function

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export type GitUser = {
  name: string;
  avatar?: string;
  installationId?: string;
};
