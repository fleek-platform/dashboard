import { useEffect, useState } from 'react';

import { matchesPathname } from '@/utils/matchesPathname';

import { useRouter } from './useRouter';

type UseQueryPaginationArgs = {
  pathname: string;
  extraSearchParams?: string;
};

const isNumeric = (value: string) => /^\d+$/.test(value);

export const useQueryPagination = ({
  pathname,
  extraSearchParams,
}: UseQueryPaginationArgs) => {
  const router = useRouter();
  const [page, setPage] = useState<number>();
  const queryPage = router.query.page;

  const getQueryParam = (page: number) => {
    return `page=${page}${extraSearchParams ? `&${extraSearchParams}` : ''}`;
  };

  useEffect(() => {
    if (!matchesPathname(router.pathname, pathname)) {
      return;
    }

    if (page && !queryPage) {
      router.replace({ pathname, query: getQueryParam(page) }, undefined, {
        shallow: true,
      });

      return;
    }

    if (!queryPage || !isNumeric(queryPage) || Number.parseInt(queryPage) < 1) {
      setPage(() => 1);
      router.replace({ pathname, query: getQueryParam(1) }, undefined, {
        shallow: true,
      });

      return;
    }

    setPage(Number.parseInt(queryPage));
  }, [page, undefined, queryPage, router, pathname]);

  const handlePageChange = (page: number) => {
    router.push({ pathname, query: getQueryParam(page) }, undefined, {
      shallow: true,
    });
    window.scrollTo({ top: 0 });
  };

  const handleSetPageCount = (pageCount: number) => {
    if (page && page > pageCount) {
      router.replace({ pathname, query: getQueryParam(pageCount) }, undefined, {
        shallow: true,
      });
      window.scrollTo({ top: 0 });

      return;
    }
  };

  return { page, handlePageChange, setPageCount: handleSetPageCount };
};
