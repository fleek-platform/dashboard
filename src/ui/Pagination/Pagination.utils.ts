/* eslint-disable fleek-custom/no-generic-util-files */
import { PaginationItemType } from './usePagination';

export type PaginationItem = {
  type: (typeof PaginationItemType)[keyof typeof PaginationItemType];
  page?: number;
};

type GeneratePaginationItemsArgs = {
  totalPages: number;
  selectedPage: number;
};

export const generatePaginationItems = ({ totalPages, selectedPage }: GeneratePaginationItemsArgs): PaginationItem[] => {
  const lengthArray = Array.from(Array(totalPages).keys());

  // If there are less than 6 pages, we don't need to display ellipsis
  const isSmallNumberOfPages = totalPages <= 6;

  // side ellipsis will be displayed between 4 and totalPages - 3
  const isSideEllipsisDisplayRequired = selectedPage >= 4 && selectedPage <= totalPages - 3;

  // central ellipsis central will be desplayed between 3 and totalPages - 2
  const isCentralEllipsisDisplayRequired = !isSideEllipsisDisplayRequired;

  const paginationItems = lengthArray.reduce<PaginationItem[]>((acc, _, currentIndex) => {
    const page = currentIndex + 1;

    if (isSmallNumberOfPages || page === selectedPage) {
      // If there are less than 6 pages or is the selected page we don't need to display ellipsis
      acc.push({ page, type: PaginationItemType.Page });
    } else {
      // display ellipsis or number

      // when central ellipsis is displayed, we display the tree first pages and the three last pages
      if (isCentralEllipsisDisplayRequired) {
        if (currentIndex < 3 || currentIndex > totalPages - 4) {
          acc.push({ page, type: PaginationItemType.Page });
        } else if (currentIndex === Math.round(totalPages / 2) - 1) {
          // central ellipsis is shown if the curent index is more than 3 and less than totalPages - 4
          acc.push({ page, type: PaginationItemType.Ellipsis });
        }
      }

      const shouldDisplayEllipsis = isSideEllipsisDisplayRequired && (currentIndex === 0 || currentIndex === totalPages - 2);
      const shouldRenderPage =
        //when the side ellipsis should be rendered, we also need to render the page before and after the selected page, and the first and last page
        isSideEllipsisDisplayRequired &&
        (currentIndex === 0 || currentIndex === totalPages - 1 || page === selectedPage + 1 || page === selectedPage - 1);

      if (shouldRenderPage) {
        acc.push({ page, type: PaginationItemType.Page });
      }

      if (shouldDisplayEllipsis) {
        acc.push({ page, type: PaginationItemType.Ellipsis });
      }
    }

    return acc;
  }, []);

  paginationItems.unshift({ type: PaginationItemType.LeftArrow });
  paginationItems.push({ type: PaginationItemType.RightArrow });

  return paginationItems;
};
