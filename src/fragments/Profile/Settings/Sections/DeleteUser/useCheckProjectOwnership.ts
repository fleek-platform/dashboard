import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useClient } from 'urql';

import {
  useProjectsQuery,
  useMeQuery,
  ProjectMembersDocument,
} from '@/generated/graphqlClient';

type UseCheckProjectOwnershipReturn = {
  isOnlyOwner: boolean;
  isLoading: boolean;
  error: string | null;
};

export const useCheckProjectOwnership = (): UseCheckProjectOwnershipReturn => {
  const [isOnlyOwner, setIsOnlyOwner] = useState<boolean | null>(null);
  const client = useClient();
  const [meQuery] = useMeQuery();
  const [projectsQuery] = useProjectsQuery({
    variables: {},
  });

  const checkOwnership = async () => {
    try {
      if (!projectsQuery.data?.projects.data || !meQuery.data?.user.id) {
        return null;
      }

      const userId = meQuery.data.user.id;
      const projects = projectsQuery.data.projects.data;

      const projectMemberPromises = projects.map((project) =>
        client
          .query(ProjectMembersDocument, {
            where: { id: project.id },
          })
          .toPromise(),
      );

      const projectMembersResults = await Promise.all(projectMemberPromises);

      for (const result of projectMembersResults) {
        if (!result.data?.project?.memberships) continue;

        const memberships = result.data.project.memberships;
        const owners = memberships.filter(
          (member) => member.permissionGroup.name === 'Owner',
        );

        if (
          owners.length === 1 &&
          owners[0].user.id === userId &&
          memberships.length > 1
        ) {
          return true;
        }
      }

      return false;
    } catch (err) {
      throw new Error('Failed to check project ownership status');
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['project-ownership', meQuery.data?.user.id],
    queryFn: checkOwnership,
    enabled: !!projectsQuery.data?.projects.data && !!meQuery.data?.user.id,
  });

  return {
    isOnlyOwner: !!data,
    isLoading: isLoading ?? false,
    error: error ? (error as Error).message : null,
  };
};
