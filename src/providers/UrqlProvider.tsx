import { useMemo } from 'react';

import { createUrqlClient, UrqlProviderComponent } from '@/integrations';

import { useAuthContext } from './AuthProvider';

export const UrqlProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const auth = useAuthContext();

  const urqlClient = useMemo(
    () =>
      createUrqlClient({
        token: auth.token,
        logout: auth.logout,
      }),
    // Shouldn't update the urql client on cookie change, project is stored in cookies as well
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth.token],
  );

  return (
    <UrqlProviderComponent value={urqlClient}>{children}</UrqlProviderComponent>
  );
};
