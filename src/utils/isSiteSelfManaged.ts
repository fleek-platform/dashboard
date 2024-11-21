import { SiteQuery } from '@/generated/graphqlClient';

type IsSiteSelfManagedArgs = SiteQuery['site'];

export const isSiteSelfManaged = (
  site?: IsSiteSelfManagedArgs,
): boolean | undefined => {
  return !site ? undefined : !site?.sourceProvider;
};
