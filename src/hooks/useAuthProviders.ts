import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

import {
  useLoginWithDynamicMutation,
} from '@/generated/graphqlClient';
import { useCookies } from '@/providers/CookiesProvider';
import { secrets } from '@/secrets';

export type AuthProviders = 'dynamic';

export type AuthWith = {
  handleLogin: () => void;
  handleLogout: () => void;
  requestAccessToken: (projectId?: string) => Promise<string>;
  authToken: string | undefined;
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
  const cookies = useCookies();

  const [, loginWithDynamic] = useLoginWithDynamicMutation();

  const handleLogin = async () => {
    if (!dynamic.authToken) {
      console.warn(`Expected a valid authToken but found ${typeof dynamic?.authToken}`);
      
      return;
    }

    await dynamic.handleLogOut();

    dynamic.setShowAuthFlow(true);
  };

  const handleLogout = () => dynamic.handleLogOut();

  const requestAccessToken = async (projectId: string): Promise<string> => {
    const { authToken } = cookies.values;
    
    if (!authToken) return '';
    
    const { data, error } = await loginWithDynamic({
      data: {
        authToken,
        projectId,
      },
    });

    if (error) throw error;

    if (!data?.loginWithDynamic) return '';
    
    return data.loginWithDynamic;
  };

  return {
    handleLogin,
    handleLogout,
    requestAccessToken,
    authToken: cookies.values.authToken,
  };
};

const getMockedProvider: () => AuthWith = () => {
  const cookies = useCookies();

  return {
    handleLogin: () => {},
    handleLogout: () => {},
    // TODO: This can be removed now it seems
    requestAccessToken: async () => 'mocked-accessToken',
    authToken: cookies.values.authToken,
  };
};
