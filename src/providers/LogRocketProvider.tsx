import LogRocket from 'logrocket';
import { useEffect } from 'react';

import { useMeQuery } from '@/generated/graphqlClient';
import { ChildrenProps } from '@/types/Props';

import { useCookies } from './CookiesProvider';

export const LogRocketProvider: React.FC<ChildrenProps> = ({ children }) => {
  const cookies = useCookies();
  const [meQuery] = useMeQuery({ pause: !cookies.values.accessToken });

  useEffect(() => {
    if (meQuery.data) {
      LogRocket.identify(meQuery.data.user.id, {
        name: meQuery.data.user.username || '',
        email: meQuery.data.user.email || '',
      });
    }
  }, [meQuery.data]);

  return <>{children}</>;
};
