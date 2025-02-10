import { routes } from '@fleek-platform/utils-routes';
import { decodeAccessToken } from '@fleek-platform/utils-token';
import { useCallback, useEffect, useState } from 'react';

import { constants } from '@/constants';
import { useAuthCookie } from '@/hooks/useAuthCookie';
import {
  AuthProviders,
  AuthWith,
  useAuthProviders,
} from '@/hooks/useAuthProviders';
import { useLogout } from '@/hooks/useLogout';
import { useRouter } from '@/hooks/useRouter';
import { createContext } from '@/utils/createContext';
import { isServerSide } from '@/utils/isServerSide';

import { useCookies } from './CookiesProvider';

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
  const authenticatedProvider = providersValues.find(
    (provider) => provider.authToken,
  );
  const router = useRouter();

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
        setAccessToken(accessToken);
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
        // if in site page, redirect to sites list first
        if (router.query.siteId) {
          await router.replace(routes.project.site.list({ projectId }));
          delete router.query.siteId;
        }

        return requestAccessToken(provider, projectId);
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [providersValues, requestAccessToken],
  );

  useEffect(() => {
    if (!authenticatedProvider && cookies.values.accessToken) {
      logout();

      return;
    }

    if (!authenticatedProvider) {
      return;
    }

    const projectId = cookies.values.projectId || constants.DEFAULT_PROJECT_ID;

    // redirect if is in home page
    if (router.pathname === routes.home()) {
      // keep query on redirect
      router.push({
        pathname: routes.project.home({ projectId }),
        query: router.query,
      });
    }

    // redirect if has a redirect url pending
    if (redirectUrl) {
      router.push(redirectUrl.replace('[projectid]', projectId));

      setRedirectUrl(null);
    }

    // uses the auth provider accessToken to request the access accessToken from graphql
    if (!cookies.values.accessToken) {
      requestAccessToken(authenticatedProvider);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticatedProvider]);

  useEffect(() => {
    const { accessToken, authToken, projectId } = cookies.values;

    try {
      if (!accessToken && !authToken && !projectId) {
        if (!isServerSide() && router.pathname !== routes.home()) {
          const invitationHash = router.query.invitation;
          const homeRoute = routes.home();

          const targetUrl = invitationHash
            ? `${homeRoute}?invitation=${invitationHash}`
            : homeRoute;

          window.location.href = targetUrl;
        }

        return;
      }

      if (!accessToken && authToken) {
        // TODO: get accessToken
      }

      if (!accessToken) {
        console.error(
          `Expected to have an accessToken but got ${typeof accessToken}`,
        );

        return;
      }

      decodeAccessToken({ token: accessToken });
    } catch (err) {
      logout();
    }
  }, [cookies, logout]);

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
