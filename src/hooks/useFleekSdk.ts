import { SecretNotFoundError } from '@fleek-platform/errors';
import { useEffect, useState } from 'react';

import { useCookies } from '@/providers/CookiesProvider';
import { secrets } from '@/secrets';
import { isServerSide } from '@/utils/isServerSide';

import type { FleekSdk } from '@fleek-platform/sdk';

export const useFleekSdk = () => {
  const cookies = useCookies();
  const [fleekSdk, setFleekSdk] = useState<FleekSdk | null>(null);

  if (!secrets.NEXT_PUBLIC_SDK__AUTHENTICATION_URL) {
    throw new SecretNotFoundError({
      secret: {
        id: 'NEXT_PUBLIC_SDK__AUTHENTICATION_URL',
      },
    });
  }

  useEffect(() => {
    const initializeSdk = async () => {
      if (isServerSide() || !cookies?.values?.accessToken) {
        return;
      }

      try {
        const { StaticAccessTokenService, FleekSdk } = await import(
          '@fleek-platform/sdk'
        );

        const accessTokenService = new StaticAccessTokenService({
          accessToken: cookies.values.accessToken,
        });

        const client = new FleekSdk({
          accessTokenService,
          graphqlServiceApiUrl: secrets.NEXT_PUBLIC_SDK__AUTHENTICATION_URL,
          uploadProxyApiUrl: secrets.NEXT_PUBLIC_UI__UPLOAD_PROXY_API_URL,
          ipfsStorageApiUrl:
            secrets.NEXT_PUBLIC_UI__INTERNAL_IPFS_STORAGE_HOSTNAME,
        });

        setFleekSdk(client);
      } catch (error) {
        console.error('Failed to initialize Fleek SDK:', error);
      }
    };

    initializeSdk();
  }, [cookies]);

  return fleekSdk;
};
