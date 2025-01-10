import { useCallback, useEffect, useMemo, useState } from 'react';

import { useGitRepositoriesQuery } from '@/generated/graphqlClient';
import { Box, Button, Input, Stepper, Text } from '@/ui';
import { cn } from '@/utils/cn';

import { useDeploySiteContext, useStepSetup } from '../../DeploySite.context';
import { ProviderInstallationMessage } from './ProviderInstallationMessage';
import { RepositoryStyles as S } from './Repository.styles';
import { RepositoryList } from './RepositoryList';
import { GitUser, UserCombobox } from './UserCombobox';

export const RepositoryStep: React.FC = () => {
  const stepper = Stepper.useContext();
  const { providerState, setSourceProvider, setGitUser, refetchGitProviderRequirements } = useDeploySiteContext();

  const [gitRepositoriesQuery, refetchGitRepositoriesQuery] = useGitRepositoriesQuery({
    variables: { where: { gitProviderId: providerState?.gitProviderId as string } },
    pause: !providerState?.gitProviderId,
  });

  const [currentUser, setCurrentUser] = useState<GitUser>();
  const [searchValue, setSearchValue] = useState('');
  const [isRepoListExpanded, setIsRepoListExpanded] = useState(false);

  const inputRef = (node: HTMLInputElement | null) => {
    if (isRepoListExpanded && node) {
      node.focus();
    }
  };

  const handleSetCurrentUser = useCallback(
    (currentUser: GitUser) => {
      setCurrentUser(currentUser);
      setGitUser({
        name: currentUser.name,
        avatar: currentUser.avatar,
        gitIntegrationId: currentUser.gitIntegrationId,
        installationId: currentUser.installationId.toString(),
      });
    },
    [setCurrentUser, setGitUser]
  );

  useEffect(() => {
    if (gitRepositoriesQuery.fetching || !gitRepositoriesQuery.data?.gitApiInstallations) {
      return;
    }

    if (currentUser) {
      gitRepositoriesQuery.data.gitApiInstallations.map((gitInstallation) => {
        if (gitInstallation.installationId === currentUser.installationId) {
          handleSetCurrentUser(gitInstallation);
        }
      });

      return;
    }

    handleSetCurrentUser(gitRepositoriesQuery.data.gitApiInstallations[0]);
  }, [currentUser, gitRepositoriesQuery, handleSetCurrentUser]);

  useStepSetup({
    title: 'Select the repository you want to host on Fleek.',
    handleBackClick: () => {
      setSourceProvider(undefined); // skips authentication step
      stepper.prevStep();
    },
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => setSearchValue(event.target.value);

  const handleRefetch = () => {
    refetchGitRepositoriesQuery({ requestPolicy: 'network-only' });

    if (refetchGitProviderRequirements) {
      refetchGitProviderRequirements();
    }
  };

  const repos = useMemo(() => {
    const repos = currentUser?.repos || undefined;

    if (!repos) {
      return [];
    }

    return repos.filter((repo) => repo.name.toLowerCase().includes(searchValue.toLowerCase()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, searchValue]);

  return (
    <Box
      variant="container"
      className={cn('h-[28rem] relative gap-6 rounded-xl', {
        'absolute inset-0 h-full transition-all ease-in-out duration-200': isRepoListExpanded,
      })}
    >
      <Box className="flex-row justify-between">
        <Text as="h2" variant="primary" size="xl" weight={700} className="self-start">
          Select repository
        </Text>
        <Button
          intent="ghost"
          iconLeft={isRepoListExpanded ? 'exit-fullscreen' : 'expand'}
          onClick={() => setIsRepoListExpanded((prev) => !prev)}
        />
      </Box>

      <Box className="relative flex-row gap-3">
        <UserCombobox
          users={gitRepositoriesQuery.data?.gitApiInstallations}
          isLoading={gitRepositoriesQuery.fetching}
          currentUser={currentUser}
          setCurrentUser={handleSetCurrentUser}
          onRefetch={handleRefetch}
        />

        <Input.Root className="flex-1 h-[2rem]">
          <Input.Icon name="magnify" />
          <Input.Field ref={inputRef} placeholder="Search" value={searchValue} onChange={handleSearchChange} />
        </Input.Root>
      </Box>

      <S.List.Scrollable.Root type="auto">
        <RepositoryList repos={repos} owner={currentUser?.name} loading={gitRepositoriesQuery.fetching} />
      </S.List.Scrollable.Root>

      <ProviderInstallationMessage onRefetch={() => refetchGitRepositoriesQuery({ requestPolicy: 'network-only' })} />
    </Box>
  );
};
