import { useClient } from 'urql';

import {
  CreateGithubAppInstallationUrlDocument,
  CreateGithubAppInstallationUrlMutation,
  CreateGithubAppInstallationUrlMutationVariables,
  useCountSitesWithSourceProviderQuery,
} from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { GitProvider } from '@/integrations/git';
import { LoadingProps } from '@/types/Props';
import { Avatar, Combobox, Icon } from '@/ui';
import { openPopUpWindow } from '@/utils/openPopUpWindow';

import { sourceProviderIcon } from '../../DeploySite.constants';
import { useDeploySiteContext } from '../../DeploySite.context';

type UserComboboxProps = LoadingProps<{
  users: GitProvider.User[];
  onRefetch?: () => void;
}>;

export const UserCombobox: React.FC<UserComboboxProps> = ({ users = [], isLoading, onRefetch }) => {
  const router = useRouter();
  const client = useClient();
  const toast = useToast();

  const { sourceProvider, gitUser, setGitUser, gitProviderId } = useDeploySiteContext();
  const [countSitesWithSourceProviderQuery] = useCountSitesWithSourceProviderQuery();

  const shouldDisableAddOrganization =
    countSitesWithSourceProviderQuery.fetching || (countSitesWithSourceProviderQuery.data?.sites?.totalCount ?? 0) > 1;

  const handleAddGHAccount = async () => {
    const projectId = router.query.projectId!;

    if (!projectId || !gitProviderId) {
      toast.error({ message: 'Unexpected error when generating url, please try again' });

      return null;
    }

    try {
      const createInstallationUrlResult = await client.mutation<
        CreateGithubAppInstallationUrlMutation,
        CreateGithubAppInstallationUrlMutationVariables
      >(CreateGithubAppInstallationUrlDocument, { where: { projectId, gitProviderId: gitProviderId } });

      if (createInstallationUrlResult.error || !createInstallationUrlResult.data?.createGithubAppInstallationUrl) {
        throw createInstallationUrlResult.error || new Error('Failed to create GithubApp Installation Url');
      }

      openPopUpWindow({
        width: 1200,
        url: createInstallationUrlResult.data.createGithubAppInstallationUrl,
        onClose: onRefetch,
      });
    } catch (error) {
      toast.error({ error, log: 'Failed to create GithubApp Installation Url' });
    }
  };

  const handleUserChange = (user?: GitProvider.User) => {
    setGitUser(user);
  };

  return (
    <Combobox
      unattached
      items={users}
      selected={[gitUser, handleUserChange]}
      isLoading={isLoading}
      css={{ flex: 1 /* TODO: move to styles file */ }}
      queryKey="slug"
      extraItems={[
        {
          label: 'Add GitHub Organization',
          onClick: handleAddGHAccount,
          iconName: 'add-circle',
          disabled: shouldDisableAddOrganization,
          tooltip: shouldDisableAddOrganization
            ? {
                content: 'You already have sites that depend on the current GitHub installation.',
                side: 'left',
              }
            : undefined,
        },
      ]}
    >
      {({ Field, Options }) => (
        <>
          <Field placeholder={<>{<Icon name={sourceProviderIcon[sourceProvider!]} />} Select</>}>{UserItem}</Field>

          <Options align="start">{UserItem}</Options>
        </>
      )}
    </Combobox>
  );
};

const UserItem: React.FC<GitProvider.User> = ({ slug, avatar }) => (
  <>
    <Avatar src={avatar} />
    {slug}
  </>
);
