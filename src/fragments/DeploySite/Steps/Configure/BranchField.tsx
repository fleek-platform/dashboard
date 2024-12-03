import { useEffect } from 'react';

import { useGitBranchesQuery } from '@/generated/graphqlClient';
import { Combobox, FormField } from '@/ui';

import { useDeploySiteContext } from '../../DeploySite.context';

export const BranchField: React.FC = () => {
  const { gitRepository, setGitBranch, gitProviderId, gitBranch } = useDeploySiteContext();
  const [gitBranchesQuery] = useGitBranchesQuery({
    variables: {
      where: {
        gitProviderId: gitProviderId!,
        sourceRepositoryOwner: gitRepository?.owner as string,
        sourceRepositoryName: gitRepository?.name as string,
      },
    },
    pause: !gitProviderId || !gitRepository?.name || !gitRepository.owner,
  });

  const branches = gitBranchesQuery.data?.gitApiBranches.map((branch) => branch.name) || [];

  useEffect(() => {
    if (!gitBranch && gitRepository?.defaultBranch) {
      setGitBranch(gitRepository.defaultBranch);

      return;
    }
  }, [gitRepository, setGitBranch, gitBranch]);

  return (
    <FormField.Root>
      <FormField.Label>Branch</FormField.Label>
      <Combobox items={branches} selected={[gitBranch, setGitBranch]} isLoading={gitBranchesQuery.fetching}>
        {({ Field, Options }) => (
          <>
            <Field placeholder="Select a branch" css={{ minHeight: '2rem', borderRadius: '0.5rem' }}>
              {(selected: string) => selected}
            </Field>

            <Options viewportHeight="$3xs">{(item: string) => item}</Options>
          </>
        )}
      </Combobox>
    </FormField.Root>
  );
};
