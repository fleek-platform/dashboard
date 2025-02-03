import { useCookies } from '@/providers/CookiesProvider';

export const useLogout = () => {
  const cookies = useCookies();

  const handleLogout = () => {
    cookies.remove('authToken');
    cookies.remove('accessToken');
    cookies.remove('projectId');
  };

  return {
    logout: handleLogout,
  };
};
