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
import { getQueryParamsToObj } from '@/utils/url';
import { useRouter, useSearchParams } from 'next/navigation';

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
console.log(`[debug] AuthProvider: redirectUrl = ${redirectUrl}`)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const providers = useAuthProviders();
  const providersValues = Object.values(providers);
  const router = useRouter();
  const searchParams = useSearchParams();
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
      console.log(`[debug] AuthProvider: switchProjectAuth: 1`)
      const provider = providersValues.find((provider) => provider.authToken);

      if (provider) {
        console.log(`[debug] AuthProvider: switchProjectAuth: 2`)
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
    // TODO: Always get projectId from decoding cookie
    // remove need for cookies.values.projectId
    // wherever found
    // this will require changes in the login-button
    // which seems to already do it but sets projectId
    // in the state
    // if (
    //   !cookies.values.accessToken ||
    //   !cookies.values.authToken ||
    //   !cookies.values.projectId
    // ) {
    //   if (pathname !== routes.home()) {
    //     const search = !isServerSide() ? window.location.search : '';

    //     const query = getQueryParamsToObj(search);

    //     console.log(`[debug] AuthProvider: query = ${JSON.stringify(query)}`)
    //     console.log(`[debug] AuthProvider: search = ${JSON.stringify(search)}`)

    //     router.push({
    //       pathname: routes.home(),
    //       query,
    //     });
    //   }

    //   return;
    // }
    if (
      !cookies.values.accessToken ||
      !cookies.values.authToken ||
      !cookies.values.projectId
    ) {
      console.log(`[debug] AuthProvider: return`)

      return;
    }

    // const projectId = decodeAccessToken({
    //   token: cookies.values.accessToken,
    // }).projectId;

    // if (!projectId) {
    //   logout();

    //   return;
    // }

    // TODO: Check in which circumstances the redirectURl
    // is set
    // if (redirectUrl) {
    //   console.log(`[debug] AuthProvider: redirectUrl = ${redirectUrl}`)

    //   router.push(redirectUrl.replace('[projectid]', projectId));

    //   setRedirectUrl(null);

    //   return;
    // }

    // At this stage the user is determined
    // to have a "valid" accessToken
    // this, should redirect to dashboard project overview
    if (pathname === routes.home()) {
      const search = window.location.search;

      const query = getQueryParamsToObj(search);

      console.log(`[debug] AuthProvider: path == home: query = ${JSON.stringify(query)}`)

      // keep query on redirect
      // router.push({
      //   pathname: routes.project.home({ projectId: cookies.values.projectId }),
      //   query: {
      //     foobarium: 90909090,
      //     dolarium: 145221221,
      //   },
      // });
      window.location.href = `${routes.project.home({ projectId: cookies.values.projectId })}/${window.location.search}`;
    }
  }, [cookies.values.accessToken, router, logout]);

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
