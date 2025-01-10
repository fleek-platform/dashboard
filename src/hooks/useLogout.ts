import { routes } from '@fleek-platform/utils-routes';

import { useCookies } from '@/providers/CookiesProvider';

import { useRouter } from './useRouter';

export const useLogout = () => {
  const cookies = useCookies();
  const router = useRouter();

  const handleLogout = () => {
    // If logout cookie is present it's waiting for the middleware and can safely return
    if (cookies.values.logout) {
      return;
    }

    if (router.pathname !== routes.home()) {
      const invitationHash = router.query.invitation;
      cookies.set('logout', 'true');
      router.replace(routes.home(), {
        query: invitationHash ? `invitation=${invitationHash}` : undefined,
      });

      return;
    }

    cookies.remove('authToken');
    cookies.remove('accessToken');
    cookies.remove('projectId');
  };

  return {
    logout: handleLogout,
  };
};
