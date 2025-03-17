import { AlertBox, LearnMoreMessage, SettingsBox } from '@/components';
import { constants } from '@/constants';
import { Projects } from '@/fragments';
import { GitIntegration } from '@/fragments';
import { useGitProvidersQuery } from '@/generated/graphqlClient';
import { Page } from '@/types/App';
import { Button } from '@/ui';
import { withAccess } from '@/utils/withAccess';

const GitProviders: Page = () => {
  const [gitProvidersQuery, refetchGitProvidersQuery] = useGitProvidersQuery({
    requestPolicy: 'cache-and-network',
  });
  const { data, fetching, error, stale } = gitProvidersQuery;

  if (error || (!fetching && !stale && !data?.gitProviders)) {
    return (
      <SettingsBox.Container>
        <SettingsBox.Title>Git Integrations</SettingsBox.Title>
        <SettingsBox.Text>
          View the status or install Git integrations for your projects.
        </SettingsBox.Text>

        <AlertBox variant="danger" outline>
          <SettingsBox.ActionRow>
            An unexpected error happened when retreiving Git Providers
            <Button
              intent="danger"
              variant="outline"
              iconLeft="refresh"
              size="sm"
              onClick={refetchGitProvidersQuery}
              disabled={fetching}
            >
              Retry
            </Button>
          </SettingsBox.ActionRow>
        </AlertBox>

        <SettingsBox.ActionRow>
          <LearnMoreMessage
            href={constants.EXTERNAL_LINK.FLEEK_DOCS_GIT_INTEGRATIONS}
          >
            Git integrations
          </LearnMoreMessage>
        </SettingsBox.ActionRow>
      </SettingsBox.Container>
    );
  }

  return (
    <>
      <SettingsBox.Container>
        <SettingsBox.Title>Git Integrations</SettingsBox.Title>
        <SettingsBox.Text>
          View the status or install Git integrations for your projects.
        </SettingsBox.Text>

        <GitIntegration.Sections.Manage
          isLoading={fetching}
          gitProviders={data?.gitProviders}
        />

        <SettingsBox.ActionRow>
          <LearnMoreMessage
            href={constants.EXTERNAL_LINK.FLEEK_DOCS_GIT_INTEGRATIONS}
          >
            Git integrations
          </LearnMoreMessage>
        </SettingsBox.ActionRow>
      </SettingsBox.Container>
    </>
  );
};

GitProviders.getLayout = (page) => (
  <Projects.Settings.Layout>{page}</Projects.Settings.Layout>
);

export default withAccess({
  Component: GitProviders,
});
