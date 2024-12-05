import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { routes } from '@fleek-platform/utils-routes';
import { decodeJwt } from 'jose';
import React, { useCallback, useMemo, useState } from 'react';

import { constants } from '@/constants';
import {
  LoginWithDynamicDocument,
  LoginWithDynamicMutation,
  LoginWithDynamicMutationVariables,
} from '@/generated/graphqlClient';
import { useAuthCookie } from '@/hooks/useAuthCookie';
import { usePostHog } from '@/hooks/usePostHog';
import { useRouter } from '@/hooks/useRouter';
import { createContext } from '@/utils/createContext';

import { useCookies } from './CookiesProvider';
import { DynamicProvider } from './DynamicProvider';
import { ChildrenProps } from '@/types/Props';
import { Log } from '@/utils/log';
import { GraphqlApiClient } from '@/integrations/graphql/GraphqlApi';

export type AuthContext = {
  isLoading: boolean;
  error?: unknown;
  token?: string;
  tokenProjectId?: string;
  redirectUrl: string | null;

  login: (redirectUrl?: string) => void;
  logout: () => void;
  switchProjectAuth: (projectId: string, silent?: boolean) => Promise<void>;
  setRedirectUrl: React.Dispatch<React.SetStateAction<string | null>>;
};

const [Provider, useContext] = createContext<AuthContext>({
  name: 'AuthContext',
  hookName: 'useAuthContext',
  providerName: 'AuthProvider',
});

export const AuthProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [accessToken, setAccessToken, removeAccessToken] = useAuthCookie();
  const posthog = usePostHog();
  const cookies = useCookies();
  const router = useRouter();

  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const handleLogout = useCallback(async () => {
    const invitationHash = router.query.invitation;
    posthog.reset();
    cookies.remove('authProviderToken');
    removeAccessToken();

    if (router.asPath !== routes.home()) {
      await router.replace({
        pathname: routes.home(),
        query: invitationHash ? { invitation: invitationHash } : undefined,
      });
    }
  }, [cookies, posthog, removeAccessToken, router]);

  const requestAccessToken = async (
    authProviderToken: string,
    projectId?: string,
    silent?: boolean,
  ): Promise<string | undefined> => {
    if (isLoading || !authProviderToken) {
      return '';
    }

    try {
      setIsLoading(true);
      setError(undefined);
      const result = await loginWithDynamic({
        data: { authToken: authProviderToken, projectId },
      });

      if (projectId) {
        cookies.set('lastProjectId', projectId);
        setAccessToken(result.loginWithDynamic);
      }

      return result.loginWithDynamic;
    } catch (error) {
      const parsedError = error || new Error('Failed to login with dynamic');

      if (silent) {
        Log.error('Failed request for accessToken');
      } else {
        setError(parsedError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = useCallback(
    async (authProviderToken: string, cbRedirectUrl?: string) => {
      console.log('Getting authProviderToken', authProviderToken);
      setIsLoading(true);
      cookies.set('authProviderToken', authProviderToken);
      const result = await requestAccessToken(authProviderToken);

      if (!result) {
        return;
      }

      setAccessToken(result);

      console.info('auth success redirect url ->', cbRedirectUrl, redirectUrl);

      if (cbRedirectUrl || redirectUrl) {
        console.log(
          'redirecting from authProvider',
          cbRedirectUrl,
          redirectUrl,
        );
        await router.replace(cbRedirectUrl ?? redirectUrl!);
      }

      setIsLoading(false);
    },
    [cookies, redirectUrl, requestAccessToken, router, setAccessToken],
  );

  const loginWithDynamic = async (data: LoginWithDynamicMutationVariables) => {
    const graphqlApi = new GraphqlApiClient({ accessToken });

    return graphqlApi.fetch<
      LoginWithDynamicMutation,
      LoginWithDynamicMutationVariables
    >({
      document: LoginWithDynamicDocument.loc.source.body,
      variables: data,
    });
  };

  return (
    <DynamicProvider
      handleAuthSuccess={handleAuthSuccess}
      handleLogout={handleLogout}
    >
      <InnerProvider
        error={error}
        isLoading={isLoading}
        redirectUrl={redirectUrl}
        setRedirectUrl={setRedirectUrl}
        requestAccessToken={requestAccessToken}
        handleAuthSuccess={handleAuthSuccess}
      >
        {children}
      </InnerProvider>
    </DynamicProvider>
  );
};

type InnerProviderProps = ChildrenProps<{
  isLoading: boolean;
  error?: unknown;
  setRedirectUrl: React.Dispatch<React.SetStateAction<string | null>>;
  redirectUrl: string | null;
  requestAccessToken: (
    authProviderToken: string,
    projectId?: string,
    silent?: boolean,
  ) => void;
  handleAuthSuccess: (authProviderToken: string, redirectUrl?: string) => void;
}>;

const InnerProvider: React.FC<InnerProviderProps> = ({
  children,
  isLoading,
  error,
  requestAccessToken,
  redirectUrl,
  setRedirectUrl,
  handleAuthSuccess,
}) => {
  const [accessToken] = useAuthCookie();
  const dynamic = useDynamicContext();
  const router = useRouter();
  const cookies = useCookies();

  const tokenProjectId = useMemo(() => {
    try {
      return accessToken
        ? (decodeJwt(accessToken)?.projectId as string)
        : undefined;
    } catch {
      console.log('failed to decode accessToken');
      dynamic.handleLogOut();

      return undefined;
    }
  }, [accessToken]);

  const login = (redirectUrl?: string) => {
    console.log(
      'inside login',
      dynamic.authToken,
      cookies.values.authProviderToken,
    );
    if (dynamic.authToken || cookies.values.authProviderToken) {
      handleAuthSuccess(
        dynamic.authToken ?? cookies.values.authProviderToken!,
        redirectUrl,
      );

      return;
    }

    if (redirectUrl) {
      setRedirectUrl(redirectUrl);
    }

    dynamic.setShowAuthFlow(true);
  };

  const logout = dynamic.handleLogOut;

  const switchProjectAuth = async (projectId: string, silent?: boolean) => {
    if (dynamic.authToken) {
      // if in site page, redirect to sites list first
      if (router.query.siteId) {
        await router.replace(routes.project.site.list({ projectId }));
        delete router.query.siteId;
      }

      if (projectId !== tokenProjectId) {
        requestAccessToken(dynamic.authToken, projectId, silent);
      }
    } else {
      dynamic.handleLogOut();
    }
  };

  return (
    <Provider
      value={{
        isLoading,
        token: accessToken,
        error: error,
        tokenProjectId,

        login,
        logout,
        switchProjectAuth,
        redirectUrl,
        setRedirectUrl,
      }}
    >
      {children}
    </Provider>
  );
};
export const useAuthContext = useContext;
