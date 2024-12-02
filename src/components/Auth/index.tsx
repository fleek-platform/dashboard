'use client';

import { routes } from '@fleek-platform/utils-routes';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { constants } from '../../constants';
import { matchesPathname } from '../../utils/matchesPathname';
import { FleekLogo } from '../FleekLogo/FleekLogo';

import type { FC, ReactNode } from 'react';

interface AuthProps {
  children: ReactNode;
}

export const Auth: FC<AuthProps> = ({ children }) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authProviderToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('accessToken='))
        ?.split('=')[1];
      const accessToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('authProviderToken='))
        ?.split('=')[1];
      const projectId =
        document.cookie
          .split('; ')
          .find((row) => row.startsWith('projectId='))
          ?.split('=')[1] || constants.DEFAULT_PROJECT_ID;
      const hasAuthentication =
        Boolean(authProviderToken) || Boolean(accessToken);
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
