import { useMemo } from 'react';

import { useLogout } from '@/hooks/useLogout';
import { createUrqlClient, UrqlProviderComponent } from '@/integrations';

import { useCookies } from './CookiesProvider';

export const UrqlProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const cookies = useCookies();
  const { logout } = useLogout();

  const urqlClient = useMemo(
    () =>
      createUrqlClient({
        token: cookies.values.accessToken,
        logout,
      }),
    // Shouldn't update the urql client on cookie change, project is stored in cookies as well
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cookies.values.accessToken]
  );

  return <UrqlProviderComponent value={urqlClient}>{children}</UrqlProviderComponent>;
};
