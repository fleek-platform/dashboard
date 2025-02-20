'use client';

import { routes } from '@fleek-platform/utils-routes';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCookies } from '@/providers/CookiesProvider';
import { LoadingFullScreen } from '@/components/Loading';

import type { FC, ReactNode } from 'react';

interface AuthProps {
  children: ReactNode;
}

// TODO: This component can be deleted?
export const Auth: FC<AuthProps> = ({ children }) => {
  console.log(`[debug] src/components/Auth: 1`)
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const cookies = useCookies();

  useEffect(() => {
    setIsLoading(true);

    const authToken = cookies.values.authToken;
    const projectId = cookies.values.projectId;
    const accessToken = cookies.values.accessToken;

    const hasAuthentication = authToken && accessToken;

    if (!hasAuthentication) {
      router.push(routes.home());
      setIsLoading(false);

      return;
    }

    if (pathname === routes.home()) {
      router.push(routes.project.home({ projectId }));
      setIsLoading(false);

      return;
    }

    setIsLoading(false);
  }, [router, cookies.values]);

  if (isLoading) return <LoadingFullScreen />;

  return <>{children}</>;
};
