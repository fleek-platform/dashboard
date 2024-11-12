import { useMemo } from 'react';

import { useRouter } from './useRouter';

export type UseIsActivePageArgs = {
  path: string;
  isExact?: boolean;
};

export const useIsActivePage = ({ path, isExact = false }: UseIsActivePageArgs): boolean => {
  const router = useRouter();

  return useMemo<boolean>(() => {
    if (isExact) {
      return router.asPath === `${path}/`;
    }

    return router.asPath.includes(path);
  }, [isExact, path, router.asPath]);
};
