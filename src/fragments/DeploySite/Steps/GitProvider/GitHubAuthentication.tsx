import { useEffect } from 'react';

import { useCreateGithubAppInstallationUrlMutation } from '@/generated/graphqlClient';
import { useSessionContext } from '@/providers/SessionProvider';
import { Button, Icon, Text } from '@/ui';
import { openPopUpWindow } from '@/utils/openPopUpWindow';

import { useDeploySiteContext, useGitInstallationStep, useStepSetup } from '../../DeploySite.context';
import { GitProviderStyles as S } from './GitProvider.styles';

export const GitHubAuthentication: React.FC = () => {
  const session = useSessionContext();
  const projectId = session.project.id;

  const { setSourceProvider, gitProviderId, mode } = useDeploySiteContext();
  const { isCheckingForInstallation, handleCheckInstallation, shouldInstall } = useGitInstallationStep();
  const [createGithubAppInstallationUrlMutation, createGithubAppInstallationUrl] = useCreateGithubAppInstallationUrlMutation();

  useStepSetup({
    handleBackClick: () => setSourceProvider(undefined),
  });

  useEffect(() => {
    if (shouldInstall && !createGithubAppInstallationUrlMutation.data && !createGithubAppInstallationUrlMutation.fetching) {
      createGithubAppInstallationUrl({ where: { gitProviderId, projectId } });
    }
  }, [createGithubAppInstallationUrl, createGithubAppInstallationUrlMutation, gitProviderId, projectId, shouldInstall]);

  const handleContinue = async () => {
    if (createGithubAppInstallationUrlMutation.data?.createGithubAppInstallationUrl) {
      openPopUpWindow({
        width: 1200,
        url: createGithubAppInstallationUrlMutation.data.createGithubAppInstallationUrl,
        onClose: handleCheckInstallation,
      });
    }
  };

  const textMessage =
    mode === 'template'
      ? 'In order to deploy a Fleek Template, you will need to have installed the Fleek Templates App on GitHub. This app requests admin permissions in order to enable Fleek to create the repository for your template. Use the button below to begin the installation.'
      : 'In order to surface your GitHub repositories, you will need to have installed the Fleek App on GitHub. Use the button below to begin the installation.';

  return (
    <S.Container>
      <Text as="h2" variant="primary" size="xl" weight={700} className="self-start">
        GitHub Installation
      </Text>

      <S.InstallProviderMessage>
        <Icon name="github" />
        <Text as="h3" variant="primary" weight={500}>
          Connect GitHub Account or Org
        </Text>
        <Text>{textMessage}</Text>
      </S.InstallProviderMessage>

      <Button
        disabled={isCheckingForInstallation}
        loading={isCheckingForInstallation || createGithubAppInstallationUrlMutation.fetching}
        onClick={handleContinue}
      >
        Install Fleek {mode === 'template' ? 'Templates' : ''} app on GitHub
      </Button>
    </S.Container>
  );
};
