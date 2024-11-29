import { routes } from '@fleek-platform/utils-routes';
import { useCallback, useEffect, useState } from 'react';

import { constants } from '@/constants';
import { useAuthCookie } from '@/hooks/useAuthCookie';
import {
  type AuthProviders,
  type AuthWith,
  useAuthProviders,
} from '@/hooks/useAuthProviders';
import { usePostHog } from '@/hooks/usePostHog';
import { useRouter } from '@/hooks/useRouter';
import { createContext } from '@/utils/createContext';

import { useCookies } from './CookiesProvider';

export type AuthContext = {
  loading: boolean;
  error?: unknown;
  token?: string;
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
  const [accessToken, setAccessToken, clearAccessToken] = useAuthCookie();
  const posthog = usePostHog();
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const cookies = useCookies();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const providers = useAuthProviders();
  const providersValues = Object.values(providers);
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

  const logout = useCallback(async () => {
    cookies.remove('authProviderToken');
    const invitationHash = router.query.invitation;

    if (!constants.PUBLIC_ROUTES.includes(router.pathname.toLowerCase())) {
      await router.replace({
        pathname: routes.home(),
        query: invitationHash ? `invitation=${invitationHash}` : undefined,
      });
    }

    providersValues.forEach((provider) => {
      if (provider.token) {
        provider.handleLogout();
      }
    });

    cookies.remove('projectId');
    clearAccessToken();
    posthog.reset();
  }, [cookies, clearAccessToken, router, providersValues]);

  const requestAccessToken = useCallback(
    async (provider: AuthWith, projectId?: string) => {
      if (loading) {
        return;
      }

      try {
        setLoading(true);
        setError(undefined);

        const token = await provider.requestAccessToken(projectId);
        setAccessToken(token);
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
      const provider = providersValues.find((provider) => provider.token);

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
    const provider = providersValues.find((provider) => provider.token);

    if (provider?.token) {
      // if has a provider token, it means that auth provider is authenticated
      cookies.set('authProviderToken', provider.token);

      const projectId =
        cookies.values.projectId || constants.DEFAULT_PROJECT_ID;

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

      // uses the auth provider token to request the access token from graphql
      if (!accessToken) {
        requestAccessToken(provider);
      }
    } else {
      logout();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cookies.values.authProviderToken,
    ...providersValues.map((provider) => provider.token),
  ]);

  return (
    <Provider
      value={{
        loading,
        error,
        login,
        logout,
        switchProjectAuth,
        token: accessToken,
        redirectUrl,
        setRedirectUrl,
      }}
    >
      {children}
    </Provider>
  );
};

export const useAuthContext = useContext;
