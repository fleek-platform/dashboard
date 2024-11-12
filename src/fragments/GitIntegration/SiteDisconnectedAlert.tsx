import { routes } from '@fleek-platform/utils-routes';
import { UseQueryState } from 'urql';

import { AlertBox } from '@/components';
import { useRouter } from '@/hooks/useRouter';
import { useSessionContext } from '@/providers/SessionProvider';
import { Site } from '@/types/Site';
import { Button } from '@/ui';

import { GitIntegrationStyles as S } from './GitIntegrationStyles.styles';

export const SiteDisconnectedAlert = ({ siteQuery }: { siteQuery?: UseQueryState<{ site: Site }, { where: { id: string } }> }) => {
  const router = useRouter();
  const { project } = useSessionContext();

  const gitIntegration = siteQuery?.data?.site.gitIntegration;
  const gitProvider = gitIntegration?.gitProvider;
  const githubAppInstallation = gitIntegration?.githubAppInstallation;

  const hasSourceProvider = gitProvider?.enabled ?? false;
  const shouldInstall = !githubAppInstallation?.installationId ?? true;

  if (hasSourceProvider && shouldInstall) {
    return (
      <AlertBox size="xs" variant="danger" outline>
        <S.Alert.Wrapper>
          The Fleek App GitHub integration was disconnected. Reconnect this Git integration to continue using it on Fleek.
          <Button
            size="sm"
            variant="outline"
            intent="danger"
            className="min-w-fit"
            onClick={() => router.push(routes.project.settings.gitIntegrations({ projectId: project.id }))}
          >
            Manage Git Integrations
          </Button>
        </S.Alert.Wrapper>
      </AlertBox>
    );
  }

  return null;
};
