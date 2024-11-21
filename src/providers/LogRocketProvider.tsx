import LogRocket from 'logrocket';
import { useEffect } from 'react';

import { useMeQuery } from '@/generated/graphqlClient';
import { ChildrenProps } from '@/types/Props';

export const LogRocketProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [meQuery] = useMeQuery();

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
