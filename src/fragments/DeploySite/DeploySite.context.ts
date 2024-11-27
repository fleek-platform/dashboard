import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { useClient } from 'urql';

import {
  GitAccessTokenDocument,
  GitAccessTokenQuery,
  GitAccessTokenQueryVariables,
  GithubAppInstallationsDocument,
  GithubAppInstallationsQuery,
  GithubAppInstallationsQueryVariables,
} from '@/generated/graphqlClient';
import { GitHub, GitProvider } from '@/integrations/git';
import { useSessionContext } from '@/providers/SessionProvider';
import { SiteSourceProvider } from '@/types/Site';
import { Stepper } from '@/ui';
import { createContext } from '@/utils/createContext';

export type DeploySiteContext = {
  mode: 'self' | 'managed' | 'template';

  title?: string;
  setTitle: (title: string) => void;
  handleBackClick?: MouseEventHandler<HTMLButtonElement>;
  setHandleBackClick: (handleBackClick: MouseEventHandler<HTMLButtonElement>) => void;

  sourceProvider?: SiteSourceProvider;
  setSourceProvider: (sourceProvider?: SiteSourceProvider) => void;

  gitProviderId?: string;
  setGitProviderId: (gitProviderId?: string) => void;

  // Git Data
  gitUser?: GitProvider.User;
  setGitUser: (gitUser?: GitProvider.User) => void;
  gitRepository?: GitProvider.Repository;
  setGitRepository: (gitRepository?: GitProvider.Repository) => void;
  gitBranch?: string;
  setGitBranch: (gitBranch?: string) => void;
  accessToken?: string;
  setAccessToken: (accessToken?: string) => void;

  // Template
  templateId?: string;
};

export const [DeploySiteProvider, useDeploySiteContext] = createContext<DeploySiteContext>({
  name: 'DeploySiteContext',
  hookName: 'DeploySite.useContext',
  providerName: 'DeploySite.Provider',
});

type UseStepSetupArgs = {
  title?: string;
  handleBackClick: MouseEventHandler<HTMLButtonElement>;
};
export const useStepSetup = ({ title, handleBackClick }: UseStepSetupArgs) => {
  const { setTitle, setHandleBackClick } = useDeploySiteContext();

  useEffect(() => {
    if (title) {
      setTitle(title);
    }

    setHandleBackClick(() => handleBackClick); // suppress react set state function

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useGitInstallationStep = () => {
  const client = useClient();
  const { gitProviderId, accessToken, setAccessToken } = useDeploySiteContext();

  const { nextStep } = Stepper.useContext();
  const session = useSessionContext();
  const projectId = session.project.id;

  const [isCheckingForInstallation, setIsCheckingForInstallation] = useState<boolean>();
  const [shouldInstall, setShouldInstall] = useState<boolean>();

  const checkWithGithub = useCallback(
    async (installationId: string) => {
      try {
        const gitAccessTokensResult = await client.query<GitAccessTokenQuery, GitAccessTokenQueryVariables>(
          GitAccessTokenDocument,
          {},
          { requestPolicy: 'network-only' }
        );

        const gitUserAccessTokens = gitAccessTokensResult.data?.user.gitUserAccessTokens;

        if (gitAccessTokensResult.error || !gitUserAccessTokens) {
          throw gitAccessTokensResult.error || new Error('Failed to get Git Access tokens');
        }

        const accessToken = gitUserAccessTokens.find((accessToken) => accessToken.gitProviderId === gitProviderId)?.token;

        if (!accessToken) {
          return false;
        }

        const github = new GitHub(accessToken);

        try {
          return await github.someAppsInstalled([installationId]);
        } catch {
          setAccessToken(accessToken);

          return false;
        }
      } catch {
        return false;
      }
    },
    [client, gitProviderId, setAccessToken]
  );

  const getInstallation = useCallback(async () => {
    const gitInstallationsResult = await client.query<GithubAppInstallationsQuery, GithubAppInstallationsQueryVariables>(
      GithubAppInstallationsDocument,
      {
        where: { gitProviderId },
      },
      { requestPolicy: 'network-only' }
    );

    const gitInstallations = gitInstallationsResult.data?.githubAppInstallations;

    if (gitInstallationsResult.error || !gitInstallations) {
      throw gitInstallationsResult.error || new Error('Failed to get Git Access tokens');
    }

    return gitInstallations;
  }, [client, gitProviderId]);

  const handleCheckInstallation = useCallback(async () => {
    setIsCheckingForInstallation(true);
    const gitInstallations = await getInstallation();
    const installationId = gitInstallations.find((gitInstallation) => gitInstallation.installationId)?.installationId;

    if (!installationId) {
      setShouldInstall(!installationId);
      setIsCheckingForInstallation(false);

      return;
    }

    const hasAppInstalled = await checkWithGithub(installationId);

    if (hasAppInstalled) {
      nextStep();
    }

    setShouldInstall(!hasAppInstalled);
    setIsCheckingForInstallation(false);
  }, [checkWithGithub, getInstallation, nextStep]);

  useEffect(() => {
    let active = true;

    if (shouldInstall !== undefined) {
      return;
    }

    handleCheckInstallation();

    return () => {
      active = false;
    };

    // eslint-disable-next-line no-restricted-syntax
    async function handleCheckInstallation() {
      setIsCheckingForInstallation(true);

      const gitInstallations = await getInstallation();
      const installationId = gitInstallations.find((gitInstallation) => gitInstallation.installationId)?.installationId;

      if (!active) {
        return;
      }

      if (!installationId) {
        setShouldInstall(!installationId);
        setIsCheckingForInstallation(false);

        return;
      }

      const hasAppInstalled = await checkWithGithub(installationId);

      if (!active) {
        return;
      }

      if (hasAppInstalled) {
        nextStep();
      }

      setShouldInstall(!hasAppInstalled);
      setIsCheckingForInstallation(false);
    }
  }, [client, gitProviderId, nextStep, projectId, accessToken, setAccessToken, getInstallation, checkWithGithub, shouldInstall]);

  return {
    isCheckingForInstallation,
    shouldInstall,

    handleCheckInstallation,
  };
};
