import { useQuery } from '@tanstack/react-query';

import { BackendApiClient } from '@/integrations/new-be/BackendApi';
import { useCookies } from '@/providers/CookiesProvider';
import { AgentStatus } from '@/types/Agent';

type UseAgentStatusArgs = {
  agentId: string;
};

export const useAgentStatus = ({ agentId }: UseAgentStatusArgs) => {
  const cookies = useCookies();
  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });

  const fetchAgentStatus = async (): Promise<AgentStatus> => {
    const response = await backendApi.fetch({
      url: `/api/v1/ai-agents/${agentId}/status`,
    });

    if (!response.ok) {
      throw response.statusText;
    }

    return response.json();
  };

  return useQuery({
    queryKey: ['agent-status', agentId],
    queryFn: fetchAgentStatus,
  });
};
