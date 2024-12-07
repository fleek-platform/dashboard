import { useMemo } from 'react';

import { createUrqlClient, UrqlProviderComponent } from '@/integrations';

import { useCookies } from './CookiesProvider';

export const UrqlProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const cookies = useCookies();

  console.log(`[debug] UrqlProvider: cookies.values.accessToken = ${cookies.values.accessToken}`);

  const urqlClient = useMemo(
    () =>
      createUrqlClient({
        token: cookies.values.accessToken,
        logout: () => {
          cookies.remove('authProviderToken');
        },
      }),
    // Shouldn't update the urql client on cookie change, project is stored in cookies as well
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cookies.values.accessToken],
  );

  return (
    <UrqlProviderComponent value={urqlClient}>{children}</UrqlProviderComponent>
  );
};
