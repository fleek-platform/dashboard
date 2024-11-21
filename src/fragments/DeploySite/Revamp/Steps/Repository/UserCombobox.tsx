import {
  GitRepositoriesQuery,
  useCountSitesWithSourceProviderQuery,
} from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { LoadingProps } from '@/types/Props';
import { Avatar, Combobox, Icon } from '@/ui';
import { openPopUpWindow } from '@/utils/openPopUpWindow';

import { sourceProviderIcon } from '../../DeploySite.constants';
import { useDeploySiteContext } from '../../DeploySite.context';

type UserComboboxProps = LoadingProps<{
  users?: GitUser[];
  currentUser?: GitUser;
  setCurrentUser: (currentUser: GitUser) => void;
  onRefetch?: () => void;
}>;

export const UserCombobox: React.FC<UserComboboxProps> = ({
  users = [],
  isLoading,
  currentUser,
  setCurrentUser,
  onRefetch,
}) => {
  const toast = useToast();
  const { sourceProvider, providerState } = useDeploySiteContext();
  const [countSitesWithSourceProviderQuery] =
    useCountSitesWithSourceProviderQuery();

  const shouldDisableAddOrganization =
    countSitesWithSourceProviderQuery.fetching ||
    (countSitesWithSourceProviderQuery.data?.sites?.totalCount ?? 0) > 1;

  const handleAddGHAccount = async () => {
    if (!providerState?.requirements?.installationUrl) {
      toast.error({
        message:
          'Unexpected error finding installation url, please contact support',
      });

      return;
    }

    openPopUpWindow({
      width: 1200, // special case where it opens github settings page
      url: providerState.requirements.installationUrl,
      onClose: onRefetch,
    });
  };

  // eslint-disable-next-line fleek-custom/valid-argument-types
  const handleUserChange = (user?: GitUser) => {
    if (!user || !setCurrentUser) {
      return;
    }

    setCurrentUser(user);
  };

  return (
    <Combobox
      unattached
      items={users}
      selected={[currentUser, handleUserChange]}
      isLoading={isLoading || !currentUser}
      css={{ flex: 1 }}
      queryKey="name"
      extraItems={[
        {
          label: 'Add GitHub Organization',
          onClick: handleAddGHAccount,
          iconName: 'add-circle',
          disabled: shouldDisableAddOrganization,
          tooltip: shouldDisableAddOrganization
            ? {
                content:
                  'You already have sites that depend on the current GitHub installation.',
                side: 'left',
              }
            : undefined,
        },
      ]}
    >
      {({ Field, Options }) => (
        <>
          <Field
            placeholder={
              <>{<Icon name={sourceProviderIcon[sourceProvider!]} />} Select</>
            }
          >
            {UserItem}
          </Field>

          <Options align="start">{UserItem}</Options>
        </>
      )}
    </Combobox>
  );
};

const UserItem: React.FC<GitUser> = ({ name, avatar }) => (
  <>
    <Avatar src={avatar} />
    {name}
  </>
);

export type GitUser = GitRepositoriesQuery['gitApiInstallations'][0];
