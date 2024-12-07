import { routes } from '@fleek-platform/utils-routes';
import { useEffect, useState } from 'react';

import { constants } from '@/constants';
import {
  AuthProviders,
  AuthWith,
  useAuthProviders,
} from '@/hooks/useAuthProviders';
import { useRouter } from '@/hooks/useRouter';
import { createContext } from '@/utils/createContext';

import { useCookies } from './CookiesProvider';
import { clearUserSession } from '@/utils/clearUSerSession';

export type AuthContext = {
  loading: boolean;
  error?: unknown;
  accessToken?: string;
  redirectUrl: string | null;

  login: (provider: AuthProviders, redirectUrl?: string) => void;
  logout: () => void;
  switchProjectAuth: (projectId: string) => Promise<string>;
  setRedirectUrl: React.Dispatch<React.SetStateAction<string | null>>;
  gotoProjectHome: (projectId: string) => void;
  setAccessToken: (token: string) => void;
};

const [Provider, useContext] = createContext<AuthContext>({
  name: 'AuthContext',
  hookName: 'useAuthContext',
  providerName: 'AuthProvider',
});

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const cookies = useCookies();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const providers = useAuthProviders();
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string>();

  // TODO: There's only a "provider" which is "dynamic"
  // looks like premature complexity. Change to "dynamic"
  const login = (providerName: AuthProviders, redirectUrl?: string) => {
    // TODO: This looks like a "future"
    // once the user is "logged in" go to the "future" location
    if (redirectUrl) {
      setRedirectUrl(redirectUrl);
    }

    const provider = providers[providerName];
    provider.handleLogin();
  };

  const logout = async () => {
    const invitationHash = router.query.invitation;

    // TODO: Why would an invitation hash have to be
    // declared on logout? This might related to whitelisting
    // approach on persisting session state
    // see "clearUserSession" comment
    if (!constants.PUBLIC_ROUTES.includes(router.pathname.toLowerCase())) {
      await router.replace({
        pathname: routes.home(),
        query: invitationHash ? `invitation=${invitationHash}` : undefined,
      });
    }

    // TODO: For some reason the original author
    // hasn't awaited for the logout request.
    // This has to be revised as its possible
    // that there are asynchronous calls involved
    // which would have to be awaited for?
    await providers.dynamic.handleLogout();

    // TODO: Session has third-party data
    // at time of writing there's no way to know which
    // values should persist. Use of a whitelist approach
    // can help. Until this is revised, all session data wiped
    clearUserSession();
  };

  const requestAccessToken = async (dynamic: AuthWith, projectId?: string) => {
    console.log('[debug] AuthProvider: requestAccessToken: 1');
    // TODO: The requestAccessToken shouldn't 
    // be called when loading. This doesn't seem correct.
    if (loading) {
      console.log('[debug] AuthProvider: requestAccessToken:is loading')
      return;
    }

    try {
      setLoading(true);
      setError(undefined);

      const accessToken = await dynamic.requestAccessToken(projectId);

      if (!accessToken) {
        console.log(`[debug] AuthProvider: requestAccessToken: doesnt seem valid: ${JSON.stringify(accessToken)}`)
        return;
      }
      
      return accessToken;
    } catch (requestError) {
      logout();
      setError(requestError);
    } finally {
      setLoading(false);
    }
  };

  const switchProjectAuth = async (projectId: string) => {
    if (!providers.dynamic.authProviderToken) {
      console.log('[debug] AuthProvider: switchProject: !providers.dynamic.hasAccessToken')
      return;
    }

    // if in site page, redirect to sites list first
    // TODO: Why would redirecting to a site be necessary?
    if (router.query.siteId) {
      await router.replace(routes.project.site.list({ projectId }));
      delete router.query.siteId;
    }

    return requestAccessToken(providers.dynamic, projectId);
  };

  useEffect(() => {
    console.log('[debug] AuthProvider: useEffect: dep providers.dynamic.accessToken: 1');
    const onTokenChange = async () => {
      try {
        console.log('[debug] AuthProvider: useEffect: dep providers.dynamic.accessToken: onTokenChange: 1');

        // TODO: The original author was iterating over a list
        // and picking any random accessToken. Suspicious?
        const { authProviderToken } = providers.dynamic;

        if (!authProviderToken) {
          console.log('[debug] AuthProvider: dep providers.dynamic.accessToken: useEffect: !accessToken, should logout');
          // TODO: Make sure other logout's are being awaited
          // the original author seem to not have awaited
          // for some reason.
          await logout();

          return;
        }

        // TODO: The cookies.set authProviderToken
        // should happen after successfull requestAccessToken
        // e.g. as success callback
        const accessToken = await requestAccessToken(providers.dynamic);

        if (!accessToken) {
          console.log('[debug] AuthProvider: useEffect: providers.dynamic.authProviderToken: after response of requestAccessToken: accessToken NOT')
          return;
        }
        
        console.log(`[debug] AuthProvider: useEffect: deps providers.dynamic.accessToken: cookies.set authProviderToken: authProviderToken = ${authProviderToken}, accessToken = ${accessToken}`);

        // TODO: useAuthCookie.setAccessToken hook doesn't seem
        // to update the token, so using cookies.set
        // until investigation
        cookies.set('authProviderToken', authProviderToken);
        cookies.set('accessToken', accessToken);

        setAccessToken(accessToken);
      } catch (err) {
        console.log('[debug] AuthProvider: useEffect: dep dynamic.accessToken: error')        
        console.error(err);
      }
    };

    onTokenChange();
  }, [
    providers.dynamic.authProviderToken,
  ]);

  const gotoProjectHome = (projectId: string) => {
    // Before anything, are there any pending requests?
    if (redirectUrl) {
      router.push(redirectUrl.replace('[projectid]', projectId));

      setRedirectUrl(null);

      return;
    }

    // TODO: The original author seem to check
    // if the user is in the public landing page
    // before redirecting. Shouldn't it be regardless?
    router.push({
      pathname: routes.project.home({ projectId }),
      query: router.query,
    });
  };

  return (
    <Provider
      value={{
        loading,
        error,
        login,
        logout,
        switchProjectAuth,
        accessToken,
        redirectUrl,
        setRedirectUrl,
        gotoProjectHome,
        setAccessToken,
      }}
    >
      {children}
    </Provider>
  );
};

export const useAuthContext = useContext;
