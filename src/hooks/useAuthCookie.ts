import { decodeAccessToken } from '@fleek-platform/utils-token';
import { DateTime } from 'luxon';

import { isServerSide } from '@/utils/isServerSide';
import { Log } from '@/utils/log';
import { getTopLevelDomain } from '@/utils/url';

import { useCookies } from '../providers/CookiesProvider';

const key = 'accessToken';

// We must specify the domain where the cookie is available
// to allow it to work cross-domain
// https://nextjs.org/docs/app/api-reference/functions/cookies#options
// OBS: The application fails to provide enviroment hostname settings. Thus, using the runtime URL but this can change in the future.
const domain = !isServerSide()
  ? getTopLevelDomain(window.location.href)
  : '';

export const useAuthCookie = (): [string | undefined, (value: string) => void, () => void] => {
  const cookies = useCookies();

  const set = (jwt: string) => {
    try {
      const parsed = decodeAccessToken({ token: jwt });

      cookies.set(key, jwt, { expires: DateTime.fromSeconds(parsed.exp).toJSDate(), domain });
    } catch (error) {
      Log.error('Failed to set access token', error);
    }
  };

  const remove = () => {
    cookies.remove(key);
  };

  return [cookies.values[key], set, remove];
};
