import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { BackendApiClient } from '@/integrations/new-be/BackendApi';
import { useCookies } from '@/providers/CookiesProvider';
import type { ProjectResponse, TeamResponse } from '@/types/Billing';
import { Log } from '@/utils/log';

type UseGetTeamArgs = {
  pause?: boolean;
};

export const useGetTeam = ({ pause }: UseGetTeamArgs) => {
  const cookies = useCookies();
  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });

  const getTeam = useCallback(async () => {
    if (pause) {
      return null;
    }

    try {
      const projectResponse = await backendApi.fetch({
        url: `/api/v1/projects/${cookies.values.projectId}`,
      });

      const projectResult: ProjectResponse = await projectResponse.json();

      // no subscription if project not found or team_id is not set
      if (projectResponse.status === 404 || !projectResult.teamId) {
        return null;
      }

      if (!projectResponse.ok) {
        throw projectResponse.statusText;
      }

      const teamResponse = await backendApi.fetch({
        url: `/api/v1/teams/${projectResult.teamId}`,
      });

      const teamResult: TeamResponse = await teamResponse.json();

      // no subscription if team not found
      if (teamResponse.status === 404 || !teamResult.subscriptionId) {
        return null;
      }

      if (!teamResponse.ok) {
        throw projectResponse.statusText;
      }

      return teamResult;
    } catch (error) {
      Log.error('Failed to fetch team data', error);

      throw error;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.values.accessToken, pause]);

  return useQuery({
    queryKey: ['team', cookies.values.accessToken],
    queryFn: getTeam,
  });
};
