import { SettingsBox, SettingsListItem } from '@/components';
import { useSiteQuery } from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import type { GitProvider } from '@/integrations/git';
import type { LoadingProps } from '@/types/Props';
import type { Site } from '@/types/Site';
import { Button } from '@/ui';
import { getLinkForRepository } from '@/utils/getLinkForRepository';
import { parseAPISourceProvider } from '@/utils/parseAPISourceProvider';

export const SiteGit: React.FC = () => {
  const router = useRouter();
  const [siteQuery] = useSiteQuery({
    variables: { where: { id: router.query.siteId! } },
  });

  const site = siteQuery.data?.site;
  const provider = parseAPISourceProvider(site?.sourceProvider);

  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Connected Git Repo</SettingsBox.Title>
      <SettingsBox.Text>
        This is the current repository associated with your Fleek site.
      </SettingsBox.Text>

      <RepositoryField
        provider={provider}
        site={site}
        isLoading={siteQuery.fetching}
      />

      <SettingsBox.ActionRow>
        <ActionButton provider={provider} isLoading={siteQuery.fetching} />
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};

type RepositoryFieldProps = LoadingProps<{
  provider?: GitProvider.Name;
  site?: Site;
}>;

const RepositoryField: React.FC<RepositoryFieldProps> = ({
  provider,
  site,
  isLoading,
}) => {
  if (isLoading) {
    return <SettingsListItem.Skeleton enableAvatar />;
  }

  if (!provider) {
    return null;
  }

  const slug = site?.sourceRepositoryOwner!;
  const name = site?.sourceRepositoryName!;
  const branch = site?.sourceBranch!;

  return (
    <SettingsListItem
      avatarIcon={provider}
      title={`${slug}/${name}`}
      subtitle={branch}
    >
      <SettingsListItem.DropdownMenu>
        <SettingsListItem.DropdownMenuItem
          icon="external-link"
          href={getLinkForRepository({ provider, slug, name })}
        >
          Visit
        </SettingsListItem.DropdownMenuItem>
      </SettingsListItem.DropdownMenu>
    </SettingsListItem>
  );
};

type ActionButtonProps = LoadingProps<{
  provider?: GitProvider.Name;
}>;

const ActionButton: React.FC<ActionButtonProps> = ({ provider, isLoading }) => {
  if (isLoading) {
    return <Button loading disabled />;
  }

  if (!provider) {
    // TODO: add connect repo handler
    return <Button>Connect repo</Button>;
  }

  // TODO: add disconnect repo handler
  return null;
};
