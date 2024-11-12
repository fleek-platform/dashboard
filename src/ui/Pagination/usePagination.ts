import { useCallback, useEffect, useMemo, useState } from 'react';

import { generatePaginationItems } from './Pagination.utils';

export type UsePaginationArgs = {
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
};

export const PaginationItemType = {
  LeftArrow: 'chevron-left',
  RightArrow: 'chevron-right',
  Page: 'page',
  Ellipsis: 'ellipsis',
};

export const usePagination = (options: UsePaginationArgs) => {
  const { totalPages = 0, currentPage, onPageChange } = options;
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (currentPage) {
      if (currentPage > totalPages) {
        setPage(1);
      } else {
        setPage(currentPage);
      }
    } else {
      setPage(1);
    }
  }, [currentPage, totalPages]);

  const items = useMemo(
    () =>
      generatePaginationItems({
        totalPages: totalPages,
        selectedPage: page,
      }),
    [totalPages, page]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setPage(page);

      if (onPageChange) {
        onPageChange(page);
      }
    },
    [onPageChange]
  );

  return {
    page: currentPage || page,
    items,
    checkIsSelected: (page: number) => page === currentPage,
    onPageChange: handlePageChange,
  };
};
