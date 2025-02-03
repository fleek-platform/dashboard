import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BackendApiClient } from '@/integrations/new-be/BackendApi';
import { useCookies } from '@/providers/CookiesProvider';
import { Agent, PaginatedResponse } from '@/types/Agent';
import { Log } from '@/utils/log';

type UseDeleteAgentArgs = {
  agentId?: string;
};

export const useDeleteAgent = ({ agentId }: UseDeleteAgentArgs) => {
  const queryClient = useQueryClient();
  const cookies = useCookies();

  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });

  const deleteAgent = async () => {
    if (!agentId) {
      return null;
    }

    try {
      const response = await backendApi.fetch({
        url: `/api/v1/ai-agents/${agentId}`,
        method: 'DELETE',
      });

      if (!response.ok) {
        throw response.statusText;
      }

      const result = await response.json();

      return result;
    } catch (error) {
      Log.error('Failed to delete AI Agent', error);

      throw error;
    }
  };

  return useMutation({
    mutationKey: ['delete-agent'],
    mutationFn: deleteAgent,
    onSuccess: () => {
      queryClient.setQueryData<PaginatedResponse<Agent>>(
        ['agents', cookies.values.projectId],
        (oldData) => {
          if (!oldData) {
            return oldData;
          }

          return {
            ...oldData,
            data: oldData.data.filter((agent) => agent.id !== agentId),
          };
        },
      );
    },
  });
};
