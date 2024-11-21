import { useMemo } from 'react';

import { GitProvider } from '@/integrations/git';
import { Template } from '@/types/Template';
import { parseAPISourceProvider } from '@/utils/parseAPISourceProvider';

export type UseTemplateGitDataArgs = Pick<Template, 'deployment'>;

export const useTemplateGitData = (
  template?: UseTemplateGitDataArgs,
): TemplateGitData => {
  return useMemo(() => {
    const deployment = template?.deployment;

    if (!deployment) {
      return {};
    }

    return {
      provider: parseAPISourceProvider(deployment.sourceProvider),
      slug: nonNull(deployment.sourceRepositoryOwner),
      repository: nonNull(deployment.sourceRepositoryName),
      ref: nonNull(deployment.sourceRef),
      branch: nonNull(deployment.sourceBranch),

      baseDirectory: nonNull(deployment.build?.baseDirectory),
      buildCommand: nonNull(deployment.build?.buildCommand),
      dockerImage: nonNull(deployment.build?.dockerImage),
      distDirectory: nonNull(deployment.build?.distDirectory),

      preview: nonNull(deployment.previewImageUrl),
    };
  }, [template]);
};

const nonNull = <T>(value: T | null): T | undefined => value || undefined;

type TemplateGitData = Partial<{
  provider: GitProvider.Name;
  slug: string;
  repository: string;
  ref: string;
  branch: string;

  baseDirectory: string;
  buildCommand: string;
  dockerImage: string;
  distDirectory: string;

  preview: string;
}>;
