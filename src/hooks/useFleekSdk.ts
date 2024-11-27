import { SecretNotFoundError } from '@fleek-platform/errors';
import { FleekSdk, StaticAccessTokenService } from '@fleek-platform/sdk';
import { useMemo } from 'react';

import { useCookies } from '@/providers/CookiesProvider';
import { secrets } from '@/secrets';
import { isServerSide } from '@/utils/isServerSide';

export const useFleekSdk = () => {
  const cookies = useCookies();

  if (!secrets.NEXT_PUBLIC_SDK__AUTHENTICATION_URL) {
    throw new SecretNotFoundError({
      secret: {
        id: 'NEXT_PUBLIC_SDK__AUTHENTICATION_URL',
      },
    });
  }

  const fleekSdk = useMemo(() => {
    if (isServerSide() || !cookies?.values?.accessToken) {
      return;
    }

    const accessTokenService = new StaticAccessTokenService({
      accessToken: cookies.values.accessToken,
    });

    const client = new FleekSdk({
      accessTokenService,
      graphqlServiceApiUrl: secrets.NEXT_PUBLIC_SDK__AUTHENTICATION_URL,
    });

    return client;
  }, [cookies]);

  return fleekSdk;
};
