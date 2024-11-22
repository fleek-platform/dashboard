import { ExternalLink } from '@/components';
import { SourceProvider } from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { openPopUpWindow } from '@/utils/openPopUpWindow';

import { useDeploySiteContext } from '../../DeploySite.context';
import { DeploySiteStepsStyles as S } from '../Steps.styles';

type ProviderInstallationMessageProps = {
  onRefetch: () => void;
};

export const ProviderInstallationMessage: React.FC<
  ProviderInstallationMessageProps
> = ({ onRefetch }) => {
  const toast = useToast();
  const { sourceProvider, providerState } = useDeploySiteContext();

  const handleOpenGithubAppInstallationUrl = async () => {
    if (!providerState?.requirements?.installationUrl) {
      toast.error({
        message:
          'Unexpected error finding installation url, please contact support',
      });

      return;
    }

    openPopUpWindow({
      width: 1200,
      url: providerState.requirements.installationUrl,
      onClose: onRefetch,
    });
  };

  if (sourceProvider === SourceProvider.GITHUB) {
    return (
      <S.Message>
        Missing Git repository?&nbsp;
        <ExternalLink
          href="#"
          variant="accent"
          onClick={handleOpenGithubAppInstallationUrl}
        >
          Adjust GitHub permissions
        </ExternalLink>
      </S.Message>
    );
  }

  return null;
};
