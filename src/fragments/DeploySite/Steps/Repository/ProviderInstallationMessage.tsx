import { useClient } from 'urql';

import { ExternalLink } from '@/components';
import {
  CreateGithubAppInstallationUrlDocument,
  CreateGithubAppInstallationUrlMutation,
  CreateGithubAppInstallationUrlMutationVariables,
} from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { useSessionContext } from '@/providers/SessionProvider';
import { Text } from '@/ui';
import { openPopUpWindow } from '@/utils/openPopUpWindow';

import { useDeploySiteContext } from '../../DeploySite.context';
import { DeploySiteStepsStyles as S } from '../Steps.styles';

type ProviderInstallationMessageProps = {
  onRefetch?: () => void;
};

export const ProviderInstallationMessage: React.FC<
  ProviderInstallationMessageProps
> = ({ onRefetch }) => {
  const { sourceProvider, gitProviderId } = useDeploySiteContext();
  const session = useSessionContext();
  const toast = useToast();
  const client = useClient();

  const handleOpenGithubAppInstallationUrl = async () => {
    const projectId = session.project.id;

    if (!projectId || !gitProviderId) {
      toast.error({
        message: 'Unexpected error when generating url, please try again',
      });

      return;
    }

    try {
      const createInstallationUrlResult = await client.mutation<
        CreateGithubAppInstallationUrlMutation,
        CreateGithubAppInstallationUrlMutationVariables
      >(CreateGithubAppInstallationUrlDocument, {
        where: { projectId, gitProviderId: gitProviderId },
      });

      if (
        createInstallationUrlResult.error ||
        !createInstallationUrlResult.data?.createGithubAppInstallationUrl
      ) {
        throw (
          createInstallationUrlResult.error ||
          new Error('Failed to create GithubApp Installation Url')
        );
      }

      openPopUpWindow({
        width: 1200, // special case where it opens github settings page
        url: createInstallationUrlResult.data.createGithubAppInstallationUrl,
        onClose: onRefetch,
      });
    } catch (error) {
      toast.error({
        error,
        log: 'Failed to create GithubApp Installation Url',
      });
    }
  };

  if (sourceProvider === 'github') {
    return (
      <S.Message>
        <Text variant="primary" size="md">
          Missing Git repository?&nbsp;
          <ExternalLink
            href="#"
            variant="accent"
            onClick={handleOpenGithubAppInstallationUrl}
            className="hover:underline"
          >
            Adjust GitHub App Permissions
          </ExternalLink>
        </Text>
      </S.Message>
    );
  }

  return null;
};
