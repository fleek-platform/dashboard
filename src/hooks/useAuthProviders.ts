import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

import { useLoginWithDynamicMutation } from '@/generated/graphqlClient';
import { useCookies } from '@/providers/CookiesProvider';
import { secrets } from '@/secrets';

export type AuthProviders = 'dynamic';

export type AuthWith = {
  handleLogin: () => void;
  handleLogout: () => Promise<void>;
  requestAccessToken: (projectId?: string) => Promise<string>;
  accessToken?: string;
};

export const useAuthProviders = (): Record<AuthProviders, AuthWith> => {
  const dynamic = useAuthWithDynamic();

  return {
    dynamic,
    ...(secrets.TEST_MODE ? { mocked: getMockedProvider() } : {}),
  };
};

const useAuthWithDynamic = (): AuthWith => {
  const dynamic = useDynamicContext();

  const [, loginWithDynamic] = useLoginWithDynamicMutation();

  const handleLogin = () => dynamic.setShowAuthFlow(true);

  const handleLogout = async () => dynamic.handleLogOut();

  const requestAccessToken = async (projectId?: string): Promise<string> => {
    console.log('[debug] useAuthProvidders: requestAccessToken: 1')
    if (!dynamic.authToken) {
      return '';
    }

    const { data, error } = await loginWithDynamic({
      data: { authToken: dynamic.authToken, projectId },
    });
    console.log(`[debug] useAuthProvidders: requestAccessToken: loginWithDynamic: response: ${JSON.stringify(data)}`)

    if (data && data.loginWithDynamic) {
      return data.loginWithDynamic;
    }

    throw error;
  };

  return {
    handleLogin,
    handleLogout,
    requestAccessToken,
    accessToken: dynamic.authToken,
  };
};

const getMockedProvider: () => AuthWith = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cookies = useCookies();

  return {
    handleLogin: () => {},
    handleLogout: async () => {},
    requestAccessToken: async () => 'mocked-token',
    accessToken: cookies.values.authProviderToken,
  };
};
