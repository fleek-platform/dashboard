import { GitRepositoriesQuery } from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { Button, Icon, Stepper, Text } from '@/ui';

import { useDeploySiteContext } from '../../DeploySite.context';
import { RepositoryStyles as S } from './Repository.styles';

type Repository = GitRepositoriesQuery['gitApiInstallations'][0]['repos'][0];

type RepositoryListProps = {
  loading: boolean;
  repos: Repository[];
  owner?: string;
};

export const RepositoryList: React.FC<RepositoryListProps> = ({
  loading,
  repos,
  owner,
}) => {
  if (loading) {
    return <S.List.Spinner name="spinner" />;
  }

  if (repos.length === 0) {
    return <NoRepositories />;
  }

  return (
    <S.List.Scrollable.Viewport>
      <S.List.Content>
        {repos.map((repo) => (
          <Repository key={repo?.name} repo={repo} owner={owner} />
        ))}
      </S.List.Content>

      <S.List.Scrollable.Bar />
    </S.List.Scrollable.Viewport>
  );
};

const NoRepositories: React.FC = () => (
  <S.NoRepositories.Container>
    <Icon name="question" />
    <S.NoRepositories.Title>No Repositories</S.NoRepositories.Title>
    <Text>
      We were unable to find any repositories, make sure you are on the correct
      account.
    </Text>
  </S.NoRepositories.Container>
);

const Repository: React.FC<{ repo: Repository; owner?: string }> = ({
  repo,
  owner,
}) => {
  const { setGitRepository, gitProviderId } = useDeploySiteContext();
  const toast = useToast();
  const stepper = Stepper.useContext();

  const handleRepositoryClick = () => {
    if (!gitProviderId || !owner) {
      toast.error({
        message: 'Unexpected error happened when selecting repository',
      });
      stepper.prevStep();

      return;
    }

    setGitRepository({
      id: repo.id.toString(),
      gitProviderId: gitProviderId!,
      defaultBranch: repo.defaultBranch,
      name: repo.name,
      owner,
    });
    stepper.nextStep();
  };

  return (
    <S.Repository.Container>
      <S.Repository.LeftColumn>
        <Icon name="git-branch" />
        {repo?.name}
      </S.Repository.LeftColumn>
      <Button size="sm" onClick={handleRepositoryClick}>
        Deploy
      </Button>
    </S.Repository.Container>
  );
};
