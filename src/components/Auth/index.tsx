'use client';

import { routes } from '@fleek-platform/utils-routes';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { constants } from '../../constants';
import { matchesPathname } from '../../utils/matchesPathname';

import type { FC, ReactNode } from 'react';

interface AuthProps {
  children: ReactNode;
}

export const Auth: FC<AuthProps> = ({ children }) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('authProviderToken='))
        ?.split('=')[1];
      const projectId =
        document.cookie
          .split('; ')
          .find((row) => row.startsWith('projectId='))
          ?.split('=')[1] || constants.DEFAULT_PROJECT_ID;
      const hasAuthentication = Boolean(authToken);
      const currentPath = window.location.pathname;

      if (hasAuthentication && currentPath === routes.home()) {
        router.push(routes.project.home({ projectId }));

        setIsChecking(false);
        return;
      }

      const isPublicRoute = Boolean(
        constants.PUBLIC_ROUTES.find((route) =>
          matchesPathname(route, currentPath),
        ),
      );

      if (!hasAuthentication && !isPublicRoute) {
        router.push(routes.home());
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [router]);

  if (isChecking) {
    // TODO: place the common loading here
    return <></>;
  }

  return <>{children}</>;
};
