import { deleteCookie, getCookies, setCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';
import { useEffect, useState } from 'react';

import { hostname as cookieDomain } from '@/utils/cookie';
import { createContext } from '@/utils/createContext';
import { isServerSide } from '@/utils/isServerSide';

class CookiesError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CookiesError';
  }
}

export type AppCookies = 'authToken' | 'accessToken' | 'projectId' | 'logout';

export type CookiesContext = {
  values: { [key in AppCookies]?: string };
  set: (key: AppCookies, value: string, options?: OptionsType) => void;
  remove: (key: AppCookies) => void;
};

const [Provider, useContext] = createContext<CookiesContext>({
  name: 'CookiesProvider',
  hookName: 'useCookiesContext',
  providerName: 'CookiesProvider',
});

export const CookiesProvider: React.FC<React.PropsWithChildren<{ requestCookies?: CookiesContext['values'] }>> = ({
  requestCookies = {},
  children,
}) => {
  const [cookies, setCookies] = useState<CookiesContext['values']>(
    isServerSide() ? requestCookies : (getCookies() as CookiesContext['values'])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const documentCookie = document.cookie.split('; ').find((row) => row.startsWith('authToken'));

      if (!documentCookie && cookies.authToken) {
        // update app state

        remove('authToken');
      }
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies]);

  const set: CookiesContext['set'] = (key, value, options = {}) => {
    if (isServerSide()) {
      throw new CookiesError('Server side is not allowed to set cookies');
    }

    setCookies((prev) => ({ ...prev, [key]: value }));
    setCookie(key, value, {
      // Required for cross-domain cookies
      domain: cookieDomain,
      ...options,
    });
  };

  const remove: CookiesContext['remove'] = (key) => {
    setCookies((prev) => {
      const { [key]: _, ...rest } = prev;

      return rest;
    });
    deleteCookie(key, {
      domain: cookieDomain,
      path: '/',
    });
  };

  return <Provider value={{ values: cookies, set, remove }}>{children}</Provider>;
};

export const useCookies = useContext;
