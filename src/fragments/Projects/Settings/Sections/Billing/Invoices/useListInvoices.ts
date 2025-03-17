import { useInfiniteQuery } from '@tanstack/react-query';

import { BackendApiClient } from '@/integrations/new-be/BackendApi';
import { useCookies } from '@/providers/CookiesProvider';
import type { Invoice } from '@/types/Invoices';
import { Log } from '@/utils/log';

type UseListInvoicesArgs = {
  pause?: boolean;
  size?: number;
};

type InvoicesResponse = {
  data?: Invoice[];
  next_page?: string;
  prev_page?: string;
};

export const useListInvoices = ({ pause, size = 10 }: UseListInvoicesArgs) => {
  const cookies = useCookies();

  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });

  const getInvoices = async ({
    pageParam,
  }: { pageParam?: string }): Promise<InvoicesResponse | undefined> => {
    try {
      let url = `/api/v1/invoices?projectId=${cookies.values.projectId}&size=${size}`;

      if (pageParam) {
        url += `&cursor=${pageParam}`;
      }

      const response = await backendApi.fetch({
        url,
      });

      if (!response.ok) {
        throw response.statusText;
      }

      const result = await response.json();

      return result;
    } catch (error) {
      Log.error('Failed to fetch Invoices', error);

      throw error;
    }
  };

  // eslint-disable-next-line fleek-custom/valid-gql-hooks-destructuring
  const query = useInfiniteQuery({
    queryKey: ['invoices', cookies.values.projectId, size],
    queryFn: getInvoices,
    enabled: !pause,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.next_page) {
        return undefined;
      }

      try {
        const url = new URL(lastPage.next_page);

        return url.searchParams.get('cursor') || undefined;
      } catch {
        return undefined;
      }
    },
  });

  const allInvoices =
    query.data?.pages.flatMap(
      (page) => (page as InvoicesResponse)?.data || [],
    ) || [];

  return {
    data: allInvoices,
    isFetching: query.isFetching,
    error: query.error,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
  };
};
