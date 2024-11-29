import { useMemo } from 'react';
import type { UseQueryExecute, UseQueryState } from 'urql';

import { SettingsBox } from '@/components';
import type { Site } from '@/types/Site';

import { ProviderDetails, type ProviderDetailsProps } from './ProviderDetails';

type UseSiteBuildSettingsGuardProps = {
  siteQuery?: UseQueryState<{ site: Site }, { where: { id: string } }>;
  refetchSiteQuery?: UseQueryExecute;
};

export const useSiteBuildSettingsGuard = ({
  siteQuery,
  refetchSiteQuery,
}: UseSiteBuildSettingsGuardProps) => {
  const gitIntegration = siteQuery?.data?.site?.gitIntegration;
  const gitProvider = gitIntegration?.gitProvider;
  const githubAppInstallation = gitIntegration?.githubAppInstallation;

  const hasSourceProvider = gitProvider?.enabled ?? false;
  const shouldInstall = !githubAppInstallation?.installationId;

  const ManageGitIntegrationComponent = useMemo(() => {
    if (
      !siteQuery ||
      siteQuery.error ||
      siteQuery.fetching ||
      !hasSourceProvider ||
      !gitProvider ||
      !shouldInstall
    ) {
      return null;
    }

    return (
      <ManageGitIntegration
        provider={gitProvider}
        refetchGitIntegration={() =>
          refetchSiteQuery
            ? refetchSiteQuery({ requestPolicy: 'network-only' })
            : undefined
        }
      />
    );
  }, [
    gitProvider,
    hasSourceProvider,
    refetchSiteQuery,
    shouldInstall,
    siteQuery,
  ]);

  return {
    gitProvider,
    shouldInstall,
    isLoading: siteQuery?.fetching,
    ManageGitIntegrationComponent,
    refetchGitIntegration: () =>
      refetchSiteQuery
        ? refetchSiteQuery({ requestPolicy: 'network-only' })
        : undefined,
  };
};

type ManageGitIntegrationProps = ProviderDetailsProps & {
  refetchGitIntegration: () => void;
};

const ManageGitIntegration = ({
  provider,
  refetchGitIntegration,
}: ManageGitIntegrationProps) => {
  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Site disconnected</SettingsBox.Title>
      <SettingsBox.Text>
        The Git integration for this site was disconnected. Please reconnect it
        to continue using it on Fleek.
      </SettingsBox.Text>
      <ProviderDetails provider={provider} onClose={refetchGitIntegration} />
    </SettingsBox.Container>
  );
};
