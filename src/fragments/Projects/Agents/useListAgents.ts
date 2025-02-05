import { useQuery } from '@tanstack/react-query';

import { BackendApiClient } from '@/integrations/new-be/BackendApi';
import { useCookies } from '@/providers/CookiesProvider';
import { Agent, PaginatedResponse } from '@/types/Agent';
import { Log } from '@/utils/log';

type UseListAgentsArgs = {
  pause?: boolean;
};

export const useListAgents = ({ pause }: UseListAgentsArgs) => {
  const cookies = useCookies();

  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });

  const getAgents = async (): Promise<PaginatedResponse<Agent> | undefined> => {
    if (!cookies.values.projectId || pause) {
      return undefined;
    }

    try {
      const response = await backendApi.fetch({
        url: `/api/v1/ai-agents?projectId=${cookies.values.projectId}`,
      });

      if (!response.ok) {
        throw response.statusText;
      }

      const result = await response.json();

      return result;
    } catch (error) {
      Log.error('Failed to fetch AI Agents', error);

      throw error;
    }
  };

  return useQuery({
    queryKey: ['agents', cookies.values.projectId],
    queryFn: getAgents,
  });
};
