import { useInfiniteQuery } from '@tanstack/react-query';

import { BackendApiClient } from '@/integrations/new-be/BackendApi';
import { useCookies } from '@/providers/CookiesProvider';
import { AgentLog, PaginatedResponse } from '@/types/Agent';

type UseAgentLogsArgs = {
  agentId: string;
};

const LOGS_PAGE_SIZE = 30;

export const useAgentLogs = ({ agentId }: UseAgentLogsArgs) => {
  const cookies = useCookies();
  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });

  const fetchLogs = async ({
    pageParam,
  }: { pageParam?: string }): Promise<PaginatedResponse<AgentLog>> => {
    const url = `/api/v1/ai-agents/${agentId}/logs?${pageParam ? `cursor=${pageParam}&` : ''}size=${LOGS_PAGE_SIZE}`;
    const response = await backendApi.fetch({ url });

    if (!response.ok) {
      throw response.statusText;
    }

    return response.json();
  };

  return useInfiniteQuery({
    queryKey: ['agent-logs', agentId],
    queryFn: fetchLogs,
    getNextPageParam: (lastPage) => {
      try {
        if (lastPage.next_page) {
          const url = new URL(lastPage.next_page);
          const cursor = url.searchParams.get('cursor');

          return cursor;
        }
      } catch {
        return undefined;
      }
    },
  });
};
