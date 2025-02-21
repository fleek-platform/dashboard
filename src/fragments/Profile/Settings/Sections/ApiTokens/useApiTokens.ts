import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { BackendApiClient } from '@/integrations/new-be/BackendApi';
import { useCookies } from '@/providers/CookiesProvider';
import { Log } from '@/utils/log';

export type ApiToken = {
  created_at: string;
  expires_at: string | null;
  id: string;
  last_used_at: string | null;
  name: string;
  token: string | null;
  token_prefix: string;
};

export const useGetApiTokens = (options?: {
  onSuccess?: (value?: ApiToken[]) => void;
  onError?: (error?: unknown) => void;
}) => {
  const cookies = useCookies();
  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });

  const getApiTokens = async (): Promise<ApiToken[] | undefined> => {
    try {
      const response = await backendApi.fetch({ url: '/api/v1/tokens' });

      if (!response.ok) {
        throw response.statusText;
      }

      const result = await response.json();

      if (typeof options?.onSuccess === 'function') {
        options.onSuccess(result);
      }

      return result;
    } catch (error) {
      Log.error('Failed to fetch AI Agents', error);

      if (typeof options?.onError === 'function') {
        options.onError(error);
      }

      throw error;
    }
  };

  return useQuery({ queryKey: ['tokens'], queryFn: getApiTokens });
};

export type CreateApiTokenArgs = {
  name: string;
};

export const useCreateApiToken = (options?: {
  onSuccess?: (value?: ApiToken) => void;
  onError?: (error?: unknown) => void;
}) => {
  const queryClient = useQueryClient();
  const cookies = useCookies();
  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });

  const createApiToken = async (
    payload: CreateApiTokenArgs,
  ): Promise<ApiToken | undefined> => {
    try {
      const response = await backendApi.fetch({
        url: '/api/v1/tokens',
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw response.statusText;
      }

      const result = await response.json();

      return result;
    } catch (error) {
      Log.error('Failed to create API token', error);

      throw error;
    }
  };

  return useMutation(
    async (payload: CreateApiTokenArgs) => createApiToken(payload),
    {
      onSuccess: (value) => {
        queryClient.invalidateQueries(['tokens']);

        if (typeof options?.onSuccess === 'function') {
          options.onSuccess(value);
        }
      },
      onError: (error) => {
        if (typeof options?.onError === 'function') {
          options.onError(error);
        }
      },
    },
  );
};

export type DeleteApiTokenArgs = {
  id: string;
};

export const useDeleteApiToken = (options?: {
  onSuccess?: () => void;
  onError?: (error?: unknown) => void;
}) => {
  const queryClient = useQueryClient();
  const cookies = useCookies();
  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });

  const deleteApiToken = async ({
    id,
  }: DeleteApiTokenArgs): Promise<undefined> => {
    try {
      const response = await backendApi.fetch({
        url: `/api/v1/tokens/${id}`,
        method: 'DELETE',
      });

      if (!response.ok) {
        throw response.statusText;
      }

      return;
    } catch (error) {
      Log.error('Failed to delete API token', error);

      throw error;
    }
  };

  return useMutation(
    async (tokenId: string) => deleteApiToken({ id: tokenId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tokens']);

        if (typeof options?.onSuccess === 'function') {
          options.onSuccess();
        }
      },
      onError: (error) => {
        if (typeof options?.onError === 'function') {
          options.onError(error);
        }
      },
    },
  );
};

const useApiKeys = {
  useGetApiTokens,
  useCreateApiToken,
  useDeleteApiToken,
};

export default useApiKeys;
