import { useEffect } from 'react';
import { routes } from '@fleek-platform/utils-routes';
import { useCookies } from '@/providers/CookiesProvider';
import { useRouter } from './useRouter';

export const useLogout = () => {
  const cookies = useCookies();
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === routes.home()) return;

    if (!cookies.values.accessToken && !cookies.values.projectId && !cookies.values.authToken) {
      router.push({
        pathname: routes.home(),
        query: router.query.invitation 
          ? { invitation: router.query.invitation }
          : undefined
      });
    }
  }, [cookies.values.accessToken, cookies.values.projectId, cookies.values.authToken]);

  const logout = () => {
    console.log('[debug] useLogout: 1')
    cookies.remove('authToken');
    cookies.remove('accessToken');
    cookies.remove('projectId');
    console.log('[debug] useLogout: end')
  };

  return {
    logout,
  };
};
