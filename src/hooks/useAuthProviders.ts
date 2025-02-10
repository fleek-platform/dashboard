import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

import {
  useGenerateUserSessionDetailsMutation,
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
  const [, generateUserSessionDetails] =
    useGenerateUserSessionDetailsMutation();

  const handleLogin = async () => {
    // handle dynamic being authenticated
    if (dynamic.authToken) {
      await dynamic.handleLogOut();
    }

    dynamic.setShowAuthFlow(true);
  };

  const handleLogout = () => dynamic.handleLogOut();

  const requestAccessToken = async (projectId?: string): Promise<string> => {
    if (!cookies.values.authToken) {
      return '';
    }
    if (!projectId) {
      const { data, error } = await generateUserSessionDetails({
        data: { authToken: cookies.values.authToken },
      });

      if (data && data.generateUserSessionDetails) {
        if (data.generateUserSessionDetails.projectId) {
          cookies.set(
            'accessToken',
            data.generateUserSessionDetails.accessToken,
          );
          cookies.set('projectId', data.generateUserSessionDetails.projectId);
        }

        return data.generateUserSessionDetails.accessToken;
      }

      throw error;
    }

    const { data, error } = await loginWithDynamic({
      data: { authToken: cookies.values.authToken, projectId },
    });

    if (data && data.loginWithDynamic) {
      return data.loginWithDynamic;
    }

    throw error;
  };

  return {
    handleLogin,
    handleLogout,
    requestAccessToken,
    authToken: cookies.values.authToken,
  };
};

const getMockedProvider: () => AuthWith = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cookies = useCookies();

  return {
    handleLogin: () => {},
    handleLogout: () => {},
    requestAccessToken: async () => 'mocked-accessToken',
    authToken: cookies.values.authToken,
  };
};
