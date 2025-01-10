import { LDProvider, useLDClient } from 'launchdarkly-react-client-sdk';
import { useEffect } from 'react';

import { useMeQuery } from '@/generated/graphqlClient';
import { secrets } from '@/secrets';

import { useCookies } from './CookiesProvider';

type LaunchDarklyProviderProps = React.PropsWithChildren<{}>;

export const LaunchDarklyProvider: React.FC<LaunchDarklyProviderProps> = ({
  children,
}) => {
  return (
    <LDProvider clientSideID={secrets.NEXT_PUBLIC_UI__LAUNCH_DARKLY_CLIENT_ID}>
      <Identifier />
      {children}
    </LDProvider>
  );
};

const Identifier: React.FC = () => {
  const cookies = useCookies();
  const [meQuery] = useMeQuery({ pause: !cookies.values.accessToken });
  const ldClient = useLDClient();

  useEffect(() => {
    const user = meQuery.data?.user;

    if (user && ldClient) {
      ldClient.identify({
        kind: 'user',

        key: user.id,
        avatar: user.avatar,
        email: user.email,
        name: user.username ?? undefined,
      });
    }
  }, [meQuery.data, ldClient]);

  return null;
};
