import isEqual from 'lodash.isequal';
import { useEffect, useRef, useState } from 'react';
import { useClient } from 'urql';

import {
  Membership,
  ProjectMembersDocument,
  ProjectMembersQuery,
  useMeQuery,
} from '@/generated/graphqlClient';

type UseProjectMembershipArgs = {
  projectIds: string[];
};

export const useProjectMembership = ({
  projectIds,
}: UseProjectMembershipArgs) => {
  const client = useClient();
  const [meQuery] = useMeQuery();

  const [userMemberships, setUserMemberships] = useState(
    new Map<string, Membership | undefined>(),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const projectIdsRef = useRef(projectIds);

  const userId = meQuery.data?.user.id;

  useEffect(() => {
    if (!projectIdsRef.current || !isEqual(projectIdsRef.current, projectIds)) {
      projectIdsRef.current = projectIds;
    }
  }, [projectIds]);

  useEffect(() => {
    const fetchMemberships = async () => {
      if (!userId || !projectIdsRef.current) {
        return;
      }

      const queries = projectIdsRef.current.map((projectId) =>
        client
          .query<ProjectMembersQuery>(ProjectMembersDocument, {
            where: { id: projectId },
          })
          .toPromise(),
      );

      try {
        const results = await Promise.all(queries);

        const tempMembershipsMap = new Map();

        results.forEach((result, index) => {
          if (result.error) {
            throw result.error;
          }

          const membership = result.data?.project.memberships.find(
            (membership) => membership.user.id === userId,
          );
          tempMembershipsMap.set(projectIdsRef.current[index], membership);
        });

        setUserMemberships(tempMembershipsMap);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchMemberships();
  }, [projectIdsRef, userId, client]);

  return {
    userMemberships,
    isLoading,
    isError,
  };
};
