'use client';

import { routes } from '@fleek-platform/utils-routes';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { constants } from '../../constants';
import { matchesPathname } from '../../utils/matchesPathname';
import { FleekLogo } from '../FleekLogo/FleekLogo';

import type { FC, ReactNode } from 'react';
import { useAuthContext } from '@/providers/AuthProvider';

interface AuthProps {
  children: ReactNode;
}

export const Auth: FC<AuthProps> = ({ children }) => {
  const router = useRouter();
  const auth = useAuthContext();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authProviderToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('authProviderToken='))
        ?.split('=')[1];
      const hasAuthentication = Boolean(authProviderToken);
      const currentPath = window.location.pathname;

      if (hasAuthentication && currentPath === routes.home()) {
        router.push(
          routes.project.home({ projectId: constants.DEFAULT_PROJECT_ID }),
        );

        setIsChecking(false);
        return;
      }

      const isPublicRoute = Boolean(
        constants.PUBLIC_ROUTES.find((route) =>
          matchesPathname(route, currentPath),
        ),
      );

      if (!hasAuthentication && !isPublicRoute) {
        console.log('logging out from auth');
        auth.logout();
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
