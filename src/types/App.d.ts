import type { NextPage } from 'next';
import type {
  AppContext as NextAppContext,
  AppProps as NextAppProps,
} from 'next/app';

import type { CookiesContext } from '@/providers/CookiesProvider';

export type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
  theme?: string;
};

export type AppProps = NextAppProps & {
  Component: Page;
  requestCookies?: CookiesContext['values'];
  maintenanceMode?: boolean;
  environment: Record<string, string>;
  noCanonical: string;
};

export type AppContext = NextAppContext & {
  ctx: NextAppContext['ctx'] & {
    req: NextAppContext['ctx']['req'] & {
      cookies: CookiesContext['values'];
    };
  };
};
