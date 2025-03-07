import { useCookies } from '@/providers/CookiesProvider';
import { clearStorageByMatchTerm } from '@/utils/browser';

export const useLogout = () => {
  const cookies = useCookies();

  const handleLogout = () => {
    cookies.remove('authToken');
    cookies.remove('accessToken');
    cookies.remove('projectId');

    // TODO: The authentication method in dashboard
    // is concurrent to @fleek-platform/login-button
    // at the moment, it should change soon.
    // Meanwhile, we must make sure that session cleaning
    // takes care of critical session items, e.g. localStorage
    for (const item of ['dynamic', 'wagmi', 'fleek-xyz']) {
      clearStorageByMatchTerm(item);
    }
  };

  return {
    logout: handleLogout,
  };
};
