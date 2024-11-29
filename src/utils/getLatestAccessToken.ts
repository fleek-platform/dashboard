import { DateTime } from 'luxon';

import type { GitUserAccessToken as AccessToken } from '@/generated/graphqlClient';

type GitUserAccessToken = Pick<AccessToken, 'createdAt' | 'token'>;

export const getLatestAccessToken = (
  accessTokens?: GitUserAccessToken[] | undefined,
) => {
  if (!accessTokens || accessTokens.length === 0) {
    return undefined;
  }

  const latestToken = accessTokens.reduce((a, b) => {
    return DateTime.fromISO(a.createdAt) > DateTime.fromISO(b.createdAt)
      ? a
      : b;
  }, {} as GitUserAccessToken);

  return latestToken.token;
};
