import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BackendApiClient } from '@/integrations/new-be/BackendApi';
import { useCookies } from '@/providers/CookiesProvider';
import { AgentStatus } from '@/types/Agent';
import { Log } from '@/utils/log';

type UseUpdateAgentStatusProps = {
  agentId?: string;
};

type ChangeAgentStatusProps = 'start' | 'stop';

export const useUpdateAgentStatus = ({
  agentId,
}: UseUpdateAgentStatusProps) => {
  const queryClient = useQueryClient();
  const cookies = useCookies();

  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });

  const changeAgentStatus = async (action: ChangeAgentStatusProps) => {
    if (!agentId) {
      return null;
    }

    const url =
      action === 'start'
        ? `/api/v1/ai-agents/${agentId}/start`
        : `/api/v1/ai-agents/${agentId}/stop`;

    try {
      const response = await backendApi.fetch({ url, method: 'POST' });

      if (!response.ok) {
        throw response.statusText;
      }

      return true;
    } catch (error) {
      Log.error(`Failed to ${action} AI Agent`, error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ['update-agent-status'],
    mutationFn: (action: ChangeAgentStatusProps) => changeAgentStatus(action),
    onSuccess: (_, action) => {
      queryClient.setQueryData<AgentStatus>(
        ['agent-status', agentId],
        (oldStatus) => {
          if (!oldStatus) {
            return oldStatus;
          }

          return {
            ...oldStatus,
            status: action === 'start' ? 'true' : 'false',
          };
        },
      );

      queryClient.invalidateQueries(['agent-status', agentId]);
    },
  });
};
