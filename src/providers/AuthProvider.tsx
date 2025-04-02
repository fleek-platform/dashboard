import { routes } from '@fleek-platform/utils-routes';
import { useCallback, useEffect, useState } from 'react';

import { useAuthCookie } from '@/hooks/useAuthCookie';
import {
  AuthProviders,
  AuthWith,
  useAuthProviders,
} from '@/hooks/useAuthProviders';
import { useLogout } from '@/hooks/useLogout';
import { createContext } from '@/utils/createContext';
import { usePathname } from 'next/navigation';

import { useCookies } from './CookiesProvider';
import { useRouter } from 'next/router';
import { secrets } from '../secrets';

import { websiteUrl } from '@/utils/url';

export type AuthContext = {
  loading: boolean;
  error?: unknown;
  accessToken?: string;
  redirectUrl: string | null;

  login: (provider: AuthProviders, redirectUrl?: string) => void;
  logout: () => void;
  switchProjectAuth: (projectId: string) => Promise<void>;
  setRedirectUrl: React.Dispatch<React.SetStateAction<string | null>>;
};

const [Provider, useContext] = createContext<AuthContext>({
  name: 'AuthContext',
  hookName: 'useAuthContext',
  providerName: 'AuthProvider',
});

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useAuthCookie();
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const { logout } = useLogout();
  const cookies = useCookies();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const providers = useAuthProviders();
  const providersValues = Object.values(providers);
  const router = useRouter();
  const pathname = usePathname();

  const login = useCallback(
    (providerName: AuthProviders, redirectUrl?: string) => {
      if (redirectUrl) {
        setRedirectUrl(redirectUrl);
      }

      const provider = providers[providerName];
      provider.handleLogin();
    },
    [providers],
  );

  const requestAccessToken = useCallback(
    async (provider: AuthWith, projectId?: string) => {
      if (loading) {
        return;
      }

      try {
        setLoading(true);
        setError(undefined);

        const accessToken = await provider.requestAccessToken(projectId);
        cookies.set('accessToken', accessToken);
      } catch (requestError) {
        logout();
        setError(requestError);
      } finally {
        setLoading(false);
      }
    },
    [setAccessToken, loading, logout],
  );

  const switchProjectAuth = useCallback(
    async (projectId: string) => {
      const provider = providersValues.find((provider) => provider.authToken);

      if (provider) {
        // TODO: Should pass query/search?
        // if in site page, redirect to sites list first
        // if (router.query.siteId) {
        //   console.log(`[debug] AuthProvider: switchProjectAuth: 3`)
        //   await router.replace(routes.project.site.list({ projectId }));
        //   delete router.query.siteId;
        // }

        return requestAccessToken(provider, projectId);
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [providersValues, requestAccessToken],
  );

  useEffect(() => {
    if (
      !cookies.values.accessToken ||
      !cookies.values.authToken ||
      !cookies.values.projectId
    ) {
      if (pathname !== routes.home()) {
        window.location.href = websiteUrl;
      }

      return;
    }

    // At this stage the user is determined
    // to have a "valid" accessToken
    // this, should redirect to dashboard project overview
    if (pathname === routes.home()) {
      // TODO: Create an utility, include related unit test
      // use utils to form URL correctly/conventions
      window.location.href = `${secrets.NEXT_PUBLIC_DASHBOARD_BASE_PATH}${routes.project.home({ projectId: cookies.values.projectId })}/${window.location.search}`;
    }
  }, [cookies.values.accessToken, router, logout, pathname]);

  return (
    <Provider
      value={{
        loading,
        error,
        login,
        logout,
        switchProjectAuth,
        accessToken: accessToken,
        redirectUrl,
        setRedirectUrl,
      }}
    >
      {children}
    </Provider>
  );
};

export const useAuthContext = useContext;
