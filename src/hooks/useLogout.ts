import { useEffect } from 'react';
import { useCookies } from '@/providers/CookiesProvider';
import { useRouter } from '@/hooks/useRouter';

export const useLogout = () => {
  const cookies = useCookies();
  const router = useRouter();

  useEffect(() => {
    if (
      cookies.values.accessToken ||
      cookies.values.authToken ||
      router.pathname.includes('/projects')
    )
      return;
    cookies.remove('projectId');
  }, [cookies.values.accessToken, cookies.values.authToken, router.pathname]);

  const handleLogout = () => {
    cookies.remove('authToken');
    cookies.remove('accessToken');
  };

  return {
    logout: handleLogout,
  };
};
