import { decodeAccessToken } from '@fleek-platform/utils-token';
import { DateTime } from 'luxon';

import { hostname as cookieDomain } from '@/utils/cookie';
import { Log } from '@/utils/log';

import { useCookies } from '../providers/CookiesProvider';

const key = 'accessToken';

export const useAuthCookie = (): [string | undefined, (value: string) => void, () => void] => {
  const cookies = useCookies();

  const set = (jwt: string) => {
    try {
      const parsed = decodeAccessToken({ token: jwt });

      cookies.set(key, jwt, {
        expires: DateTime.fromSeconds(parsed.exp).toJSDate(),
        // Required for cross-domain cookies
        domain: cookieDomain,
      });
    } catch (error) {
      Log.error('Failed to set access token', error);
    }
  };

  const remove = () => {
    cookies.remove(key);
  };

  return [cookies.values[key], set, remove];
};
