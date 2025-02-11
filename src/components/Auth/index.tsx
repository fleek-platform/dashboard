'use client';

import { routes } from '@fleek-platform/utils-routes';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { constants } from '../../constants';
import { matchesPathname } from '../../utils/matchesPathname';
import { FleekLogo } from '../FleekLogo/FleekLogo';
import { useCookies } from '@/providers/CookiesProvider';

import type { FC, ReactNode } from 'react';

interface AuthProps {
  children: ReactNode;
}

export const Auth: FC<AuthProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const cookies =  useCookies();

  useEffect(() => {
    setIsChecking(true);
    
    const authToken = cookies.values.authToken;
    const projectId = cookies.values.projectId;
    const accessToken = cookies.values.accessToken;

    const hasAuthentication = authToken && accessToken;

    if (!hasAuthentication) {
      router.push(routes.home());
      setIsChecking(false);

      return;
    }

    if (pathname === routes.home()) {
      router.push(routes.project.home({ projectId }));
      setIsChecking(false);

      return;
    }

    setIsChecking(false);
  }, [router, cookies.values]);

  if (isChecking) {
    // TODO: place the common loading here
    return <></>;
  }

  return <>{children}</>;
};
