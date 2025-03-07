import { useCallback, useEffect, useRef, useState } from 'react';

import { BadgeText, SettingsListItem } from '@/components';
import {
  GitProvidersQuery,
  GitProviderTags,
  SiteDeploymentRequirements,
  useSiteDeploymentRequirementsMutation,
} from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { Button, Icon } from '@/ui';
import { openPopUpWindow } from '@/utils/openPopUpWindow';

const DESCRIPTION_MAP: Record<GitProviderTags, string> = {
  [GitProviderTags.sites]: 'Publishes sites for your repositories',
  [GitProviderTags.templates]: 'Allows template creation',
};

export type ProviderDetailsProps = {
  provider: Pick<
    GitProvidersQuery['gitProviders'][0],
    'id' | 'enabled' | 'name' | 'tags'
  >;
  onClose?: () => void;
};

export const ProviderDetails: React.FC<ProviderDetailsProps> = ({
  provider,
  onClose,
}) => {
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const [errorFetching, setErrorFetching] = useState<boolean>(false);
  const [status, setStatus] = useState<SiteDeploymentRequirements>();
  const isFetching = useRef(false);

  const [, siteDeploymentRequirements] =
    useSiteDeploymentRequirementsMutation();

  const fetchStatus = useCallback(async () => {
    isFetching.current = true;
    setLoading(true);

    try {
      const result = await siteDeploymentRequirements({
        where: { gitProviderId: provider.id },
      });

      if (result.error || !result.data?.siteDeploymentRequirements) {
        throw (
          result.error ||
          new Error('Unexpected error getting provider requirements')
        );
      } else {
        setStatus((prevStatus) => {
          if (prevStatus !== result.data?.siteDeploymentRequirements) {
            return result.data?.siteDeploymentRequirements;
          }

          return prevStatus;
        });
      }
    } catch (error) {
      setErrorFetching(true);

      toast.error({
        error,
        log: 'Unexpected error happened when getting provider requirements',
      });
    }

    isFetching.current = false;
    setLoading(false);
  }, [siteDeploymentRequirements, provider.id, toast]);

  useEffect(() => {
    if (isFetching.current || status) {
      return;
    }

    fetchStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStatus]);

  const handleInstallationButtonClick = async () => {
    setLoading(true);

    try {
      if (!status || !status.installationUrl) {
        // eslint-disable-next-line fleek-custom/no-default-error
        throw Error("Requirements doesn't have a installation Url");
      }

      openPopUpWindow({
        width: 1200,
        url: status.installationUrl,
        onClose: () => {
          fetchStatus();

          if (onClose) {
            onClose();
          }
        },
      });
    } catch (error) {
      setLoading(false);
      toast.error({
        error,
        log: 'Unexpected error happened when trying to install',
      });
    }
  };

  const handleAuthenticationButtonClick = async () => {
    setLoading(true);
    try {
      if (!status || !status.authorizationUrl) {
        // eslint-disable-next-line fleek-custom/no-default-error
        throw Error("Requirements doesn't have a authentication Url");
      }

      openPopUpWindow({
        width: 1200,
        url: status.authorizationUrl,
        onClose: () => {
          fetchStatus();

          if (onClose) {
            onClose();
          }
        },
      });
    } catch (error) {
      setLoading(false);
      toast.error({
        error,
        log: 'Unexpected error happened when trying to authenticate',
      });
    }
  };

  const renderContent = () => {
    if (errorFetching) {
      return (
        <Button
          size="sm"
          iconLeft="refresh"
          intent="danger"
          onClick={fetchStatus}
          loading={isLoading}
        >
          Retry
        </Button>
      );
    }

    if (isLoading || !status) {
      return (
        <BadgeText colorScheme="slate">
          <Icon name="spinner" />
        </BadgeText>
      );
    }

    if (status.shouldAuthenticate && status.authorizationUrl) {
      return (
        <Button size="sm" onClick={handleAuthenticationButtonClick}>
          Authorize app
        </Button>
      );
    }

    if (status.shouldInstall && status.installationUrl) {
      return (
        <Button size="sm" onClick={handleInstallationButtonClick}>
          Install app
        </Button>
      );
    }

    return (
      <>
        <BadgeText colorScheme="green">Active</BadgeText>
        <SettingsListItem.DropdownMenu>
          <SettingsListItem.DropdownMenuItem
            className="items-center gap-4"
            icon="pencil"
            onSelect={handleInstallationButtonClick}
          >
            Edit integration permissions
          </SettingsListItem.DropdownMenuItem>
        </SettingsListItem.DropdownMenu>
      </>
    );
  };

  return (
    <SettingsListItem
      title={provider.name}
      subtitle={DESCRIPTION_MAP[provider.tags as GitProviderTags] || ''}
      avatarIcon="github"
      leftBoxClassName="mr-auto"
    >
      {renderContent()}
    </SettingsListItem>
  );
};
