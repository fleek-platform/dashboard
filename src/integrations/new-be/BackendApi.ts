import { getDefined } from '@/defined';

export class BackendApiClient {
  private baseURL: string | undefined = getDefined('NEXT_PUBLIC_UI_FLEEK_REST_API_URL');
  private headers: HeadersInit;

  constructor(args: BackendApiClient.Arguments) {
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + args.accessToken,
    };
  }

  fetch = async (args: BackendApiClient.FetchProps) => {
    return fetch(`${this.baseURL}${args.url}`, {
      method: args.method || 'GET',
      headers: {
        ...this.headers,
        ...args.extraHeaders,
      },
      body: args.body,
    });
  };
}

export namespace BackendApiClient {
  export type Arguments = { accessToken?: string };

  export type FetchProps = {
    url: string;
    body?: string; // as JSON
    method?: string;
    extraHeaders?: HeadersInit;
  } & RequestInit;
}
