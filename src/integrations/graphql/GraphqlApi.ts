import { constants } from '@fleek-platform/utils-permissions';

import { secrets } from '@/secrets';

export class GraphqlApiClient {
  private baseURL: string | undefined =
    secrets.NEXT_PUBLIC_SDK__AUTHENTICATION_URL;
  private headers: HeadersInit;

  constructor(args: GraphqlApiClient.Arguments) {
    this.headers = {
      'Content-Type': 'application/json',
      [constants.AUTHORIZATION_HEADER_NAME]: `Bearer ${args.accessToken}`,
      [constants.CUSTOM_HEADERS.clientType]: constants.UI_CLIENT_TYPE_NAME,
    };
  }

  async fetch<TData = unknown, TVariables = unknown>(
    args: GraphqlApiClient.FetchProps<TVariables>,
  ): Promise<TData> {
    const { document, variables, extraHeaders } = args;

    const response = await fetch(this.baseURL!, {
      method: 'POST',
      headers: {
        ...this.headers,
        ...extraHeaders,
      },
      body: JSON.stringify({ query: document, variables }),
    });

    const json = await response.json();

    // Handle HTTP errors
    if (!response.ok) {
      throw new GraphqlApiClient.NetworkError(
        response.status,
        json.message || response.statusText,
      );
    }

    // Handle GraphQL errors
    if (json.errors) {
      throw new GraphqlApiClient.GraphqlError(json.errors);
    }

    return json.data;
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace GraphqlApiClient {
  export type Arguments = { accessToken?: string };

  export type FetchProps<TVariables> = {
    document: unknown | string;
    variables?: TVariables;
    extraHeaders?: HeadersInit;
  };

  export class NetworkError extends Error {
    constructor(
      public status: number,
      public message: string,
    ) {
      super(message);
      this.name = 'NetworkError';
    }
  }

  export class GraphqlError extends Error {
    constructor(
      public errors: Array<{
        message: string;
        locations?: unknown;
        path?: unknown;
      }>,
    ) {
      super(errors.map((e) => e.message).join(', '));
      this.name = 'GraphqlError';
    }
  }
}
