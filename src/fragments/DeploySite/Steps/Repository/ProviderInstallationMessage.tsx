import { SourceProvider } from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { Box, Text } from '@/ui';
import { cn } from '@/utils/cn';
import { openPopUpWindow } from '@/utils/openPopUpWindow';

import { useDeploySiteContext } from '../../DeploySite.context';

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
          'Unexpected error finding installation url, please try again or contact support',
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
      <Box variant="container" className="inline text-sm">
        Missing Git repository?&nbsp;
        <Text
          as="span"
          className={cn('cursor-pointer', {
            'text-accent-9': providerState?.requirements?.installationUrl,
          })}
          onClick={handleOpenGithubAppInstallationUrl}
        >
          Adjust GitHub permissions
        </Text>
      </Box>
    );
  }

  return null;
};
