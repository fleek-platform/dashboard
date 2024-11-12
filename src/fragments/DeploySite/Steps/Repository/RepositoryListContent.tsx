import { GitProvider } from '@/integrations/git';
import { Button, Icon, Stepper, Text } from '@/ui';

import { useDeploySiteContext } from '../../DeploySite.context';
import { RepositoryStyles as S } from './Repository.styles';

const Repository: React.FC<GitProvider.Repository> = (repo) => {
  const { setGitRepository, setGitBranch } = useDeploySiteContext();
  const stepper = Stepper.useContext();

  const handleRepositoryClick = () => {
    setGitRepository(repo);
    setGitBranch(repo.defaultBranch);
    stepper.nextStep();
  };

  return (
    <S.Repository.Container>
      <Text variant="primary" size="md" weight={500} className="flex gap-2">
        <Icon name="git-branch" />
        {repo.name}
      </Text>
      <Button size="sm" onClick={handleRepositoryClick}>
        Deploy
      </Button>
    </S.Repository.Container>
  );
};

const NoRepositories: React.FC = () => (
  <S.NoRepositories.Container>
    <Icon name="question" />
    <Text variant="primary" weight={500}>
      No Repositories
    </Text>
    <Text>We were unable to find any repositories, make sure you are on the correct account.</Text>
  </S.NoRepositories.Container>
);

type RepositoryListContentProps = {
  loading: boolean;
  repos: GitProvider.Repository[];
};

export const RepositoryListContent: React.FC<RepositoryListContentProps> = ({ loading, repos }) => {
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
          <Repository key={repo.name} {...repo} />
        ))}
      </S.List.Content>

      <S.List.Scrollable.Bar />
    </S.List.Scrollable.Viewport>
  );
};
