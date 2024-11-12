import { useEffect, useMemo, useState } from 'react';

import { useGitUserAndOrganizations } from '@/hooks/useGitUserAndOrganizations';
import { useGitUserRepositories } from '@/hooks/useGitUserRepositories';
import { useToast } from '@/hooks/useToast';
import { GitProvider } from '@/integrations/git/interfaces/GitProvider';
import { Input, Stepper, Text } from '@/ui';

import { useDeploySiteContext, useStepSetup } from '../../DeploySite.context';
import { ProviderInstallationMessage } from './ProviderInstallationMessage';
import { RepositoryStyles as S } from './Repository.styles';
import { RepositoryListContent } from './RepositoryListContent';
import { UserCombobox } from './UserCombobox';

export const RepositoryStep: React.FC = () => {
  const {
    sourceProvider,
    gitUser,
    setGitUser,
    setSourceProvider,
    accessToken,
  } = useDeploySiteContext();
  const [searchValue, setSearchValue] = useState('');
  const gitUsersAndOrganizations = useGitUserAndOrganizations({
    provider: sourceProvider as GitProvider.Name,
    accessToken: accessToken as string,
  });
  const stepper = Stepper.useContext();
  const toast = useToast();

  useStepSetup({
    title: 'Select the repository you want to host on Fleek.',
    handleBackClick: () => {
      setSourceProvider(undefined); // skips authentication step
      stepper.prevStep();
    },
  });

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => setSearchValue(event.target.value);

  const users = useMemo(() => {
    const { data } = gitUsersAndOrganizations;

    if (!data) {
      return [];
    }

    const users = [data.user, ...data.organizations];

    if (
      !gitUser ||
      (gitUser.slug === data.user.slug &&
        gitUser.installationId !== data.user.installationId)
    ) {
      // sets default for user
      setGitUser(data.user);
    }

    return users;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gitUsersAndOrganizations.data]);

  const gitUserRepositories = useGitUserRepositories({
    provider: sourceProvider as GitProvider.Name,
    installationId: gitUser?.installationId,
    accessToken: accessToken as string,
  });

  const repos = useMemo(() => {
    const { data } = gitUserRepositories;

    if (!data) {
      return [];
    }

    return data.filter((repo) =>
      repo.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gitUserRepositories.data, searchValue]);

  useEffect(() => {
    if (gitUsersAndOrganizations.error) {
      toast.error({
        error: gitUsersAndOrganizations.error,
        log: 'Error fetching git users and organizations',
      });
      setSourceProvider(undefined); // skips authentication step
      stepper.prevStep();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gitUsersAndOrganizations.error]);

  const handleRefetch = async () => {
    await gitUsersAndOrganizations.refetch();
    await gitUserRepositories.refetch();
  };

  return (
    <>
      <S.Container>
        <Text
          as="h2"
          variant="primary"
          size="xl"
          weight={700}
          className="self-start"
        >
          Select Repository
        </Text>

        <S.Wrapper>
          <UserCombobox
            users={users}
            isLoading={gitUsersAndOrganizations.isLoading}
            onRefetch={handleRefetch}
          />

          <Input.Root>
            <Input.Icon name="magnify" />
            <Input.Field
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Input.Root>
        </S.Wrapper>

        <S.List.Scrollable.Root type="auto">
          <RepositoryListContent
            repos={repos}
            loading={
              gitUserRepositories.isLoading ||
              gitUsersAndOrganizations.isLoading
            }
          />
        </S.List.Scrollable.Root>
      </S.Container>

      <ProviderInstallationMessage onRefetch={handleRefetch} />
    </>
  );
};
