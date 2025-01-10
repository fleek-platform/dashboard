import { GitRepositoriesQuery } from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { Box, Button, Icon, Stepper, Text } from '@/ui';

import { useDeploySiteContext } from '../../DeploySite.context';
import { RepositoryStyles as S } from './Repository.styles';

type Repository = GitRepositoriesQuery['gitApiInstallations'][0]['repos'][0];

type RepositoryListProps = {
  loading: boolean;
  repos: Repository[];
  owner?: string;
};

export const RepositoryList: React.FC<RepositoryListProps> = ({ loading, repos, owner }) => {
  if (loading) {
    return <Icon name="spinner" className="text-xl" />;
  }

  if (repos.length === 0) {
    return <NoRepositories />;
  }

  return (
    <S.List.Scrollable.Viewport>
      <Box className="py-6">
        {repos.map((repo) => (
          <Repository key={repo?.name} repo={repo} owner={owner} />
        ))}
      </Box>

      <S.List.Scrollable.Bar />
    </S.List.Scrollable.Viewport>
  );
};

const NoRepositories: React.FC = () => (
  <Box className="justify-center items-center text-center gap-2.5">
    <Icon name="question" />
    <Text variant="primary">No repositories</Text>
    <Text>We were unable to find any repositories, make sure you are on the correct account.</Text>
  </Box>
);

const Repository: React.FC<{ repo: Repository; owner?: string }> = ({ repo, owner }) => {
  const { setGitRepository, gitProviderId } = useDeploySiteContext();
  const toast = useToast();
  const stepper = Stepper.useContext();

  const handleRepositoryClick = () => {
    if (!gitProviderId || !owner) {
      toast.error({ message: 'Unexpected error happened when selecting repository' });
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
    <Box className="flex-row justify-between items-center border-b border-neutral-6 last:border-none py-4 first:pt-0 last:pb-0">
      <Box className="flex-row gap-2.5">
        <Icon name="git-branch" />
        {repo?.name}
      </Box>
      <Button size="sm" onClick={handleRepositoryClick}>
        Deploy
      </Button>
    </Box>
  );
};
