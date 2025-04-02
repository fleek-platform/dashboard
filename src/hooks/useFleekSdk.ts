import { SecretNotFoundError } from '@fleek-platform/errors';
import { useState, useEffect } from 'react';

import { useCookies } from '@/providers/CookiesProvider';
import { isServerSide } from '@/utils/isServerSide';
import { getDefined } from '@/defined';

import type { FleekSdk } from '@fleek-platform/sdk';

export const useFleekSdk = () => {
  const cookies = useCookies();
  const [fleekSdk, setFleekSdk] = useState<FleekSdk | null>(null);

  if (!getDefined('NEXT_PUBLIC_SDK__AUTHENTICATION_URL')) {
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
          graphqlServiceApiUrl: getDefined('NEXT_PUBLIC_SDK__AUTHENTICATION_URL'),
          uploadProxyApiUrl: getDefined('NEXT_PUBLIC_UI__UPLOAD_PROXY_API_URL'),
          ipfsStorageApiUrl:
            getDefined('NEXT_PUBLIC_UI__INTERNAL_IPFS_STORAGE_HOSTNAME'),
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
