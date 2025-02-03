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
      console.log('[debug] AutProvider: login: 1');
      if (redirectUrl) {
        console.log(`[debug] AutProvider: login: redirectUrl = ${redirectUrl}`);
        setRedirectUrl(redirectUrl);
      }
      console.log(`[debug] AutProvider: login: providerName = ${providerName}`);
      const provider = providers[providerName];
      provider.handleLogin();
    },
    [providers],
  );

  const requestAccessToken = useCallback(
    async (provider: AuthWith, projectId?: string) => {
      console.log(`[debug] AutProvider: login: requestAccessToken: 1`);
      if (loading) {
        console.log(`[debug] AutProvider: login: requestAccessToken: loading`);
        return;
      }

      try {
        setLoading(true);
        setError(undefined);

        const accessToken = await provider.requestAccessToken(projectId);
        console.log(`[debug] AutProvider: login: accessToken = ${accessToken}`);
        setAccessToken(accessToken);
      } catch (requestError) {
        console.log(`[debug] AutProvider: login: requestError: logout`);
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
      console.log(`[debug] AutProvider: login: switchProjectAuth: 1`);
      const provider = providersValues.find((provider) => provider.authToken);

      if (provider) {
        console.log(`[debug] AutProvider: login: switchProjectAuth: provider: 1`);
        // if in site page, redirect to sites list first
        if (router.query.siteId) {
          console.log(`[debug] AutProvider: login: switchProjectAuth: router.replace: projectId = ${projectId}`);
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
    if (!cookies.values.authToken) {
      console.log('[debug] AuthProvider: on cookies.values.authToken: return')
      return;
    }
    if (!cookies.values.accessToken) {
      requestAccessToken(authenticatedProvider);
    }
  }, [cookies.values.authToken]);

  // useEffect(() => {
  //   if (!authenticatedProvider && cookies.values.accessToken) {
  //     console.log(`[debug] AutProvider: login: logout`);
  //     logout();

  //     return;
  //   }

  //   if (!authenticatedProvider) {
  //     return;
  //   }
  //   console.log(`[debug] AuthProvider: json debug: ${JSON.stringify({
  //     cookiesValuesProjectId: cookies.values.projectId,
  //     defaultProjectId: constants.DEFAULT_PROJECT_ID,
  //   })}`);
  //   const projectId = cookies.values.projectId || constants.DEFAULT_PROJECT_ID;

  //   // redirect if is in home page
  //   if (router.pathname === routes.home()) {
  //     console.log(`[debug] AutProvider: login: redirect !home`);
  //     // keep query on redirect
  //     router.push({
  //       pathname: routes.project.home({ projectId }),
  //       query: router.query,
  //     });
  //   }
  //   console.log(`[debug] AutProvider: login: redirectUrl = ${redirectUrl}`);

  //   // redirect if has a redirect url pending
  //   if (redirectUrl) {
  //     router.push(redirectUrl.replace('[projectid]', projectId));

  //     setRedirectUrl(null);
  //   }

  //   // uses the auth provider accessToken to request the access accessToken from graphql if (!cookies.values.accessToken) { console.log(`[debug] AutProvider: login: requestAccessToken: 1`) requestAccessToken(authenticatedProvider); }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [authenticatedProvider]);

  useEffect(() => {
    console.log(`[debug] AutProvider: login: accessToken: 1`);
    const { accessToken } = cookies.values;

    try {
      if (!accessToken) {
        console.log(`[debug] AutProvider: login: accessToken: return`);
        return;
      }
      console.log(`[debug] AutProvider: login: accessToken: decoreAccessToken`);
      decodeAccessToken({ token: accessToken });
    } catch {
      console.log(`[debug] AutProvider: login: accessToken: logout`);
      logout();
    }
  }, [cookies.values.accessToken, logout]);

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
