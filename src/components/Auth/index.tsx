// TODO: This can now be deleted
// the cookie handling should be done in AuthProvider
// and project resolution in the ProjectProvider
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
    console.log('[debug] Auth: useEffect: deps router: 1');
    
    const checkAuth = () => {
      console.log('[debug] Auth: checkAuth: 1');
      setIsChecking(true);
      
      const authToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('authProviderToken='))
        ?.split('=')[1];

      const projectId =
        document.cookie
          .split('; ')
          .find((row) => row.startsWith('projectId='))
          ?.split('=')[1];

      console.log(`[debug] Auth: checkAuth: ${JSON.stringify({
        authToken,
        projectId,       
      })}`);

      const hasAuthentication = Boolean(authToken);
      const currentPath = window.location.pathname;

      console.log(`[debug] Auth: checkAuth: ${JSON.stringify({
        hasAuthentication,
        currentPath,
      })}`);

      if (hasAuthentication && currentPath === routes.home()) {
        console.log(`[debug] Auth: checkAuth: hasAuth and is path home`);

        router.push(routes.project.home({ projectId }));
        setIsChecking(false);

        return;
      }

      // TODO: The dashboard should not have public routes
      // it's membership only
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
