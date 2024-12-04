import { forwardStyledRef } from '@/theme';

import { Icon } from '../Icon/Icon';
import { PaginationStyles as PS } from './Pagination.styles';
import { PaginationItem } from './Pagination.utils';
import {
  PaginationItemType,
  usePagination,
  UsePaginationArgs,
} from './usePagination';

export type PaginationProps = UsePaginationArgs &
  React.ComponentPropsWithRef<typeof PS.Container>;

export const Pagination = forwardStyledRef<HTMLDivElement, PaginationProps>(
  PS.Container,
  ({ totalPages, currentPage, onPageChange: _onPageChange, ...props }, ref) => {
    const {
      page: _currentPage,
      items,
      onPageChange,
    } = usePagination({ totalPages, currentPage, onPageChange: _onPageChange });

    return (
      <PS.Container {...props} ref={ref}>
        {items.map((pageItem: PaginationItem, index) => {
          const { page, type } = pageItem;

          const button = {
            [PaginationItemType.LeftArrow]: {
              props: {
                'aria-label': 'Previous page',
                disabled: _currentPage === 1,
                onClick: () =>
                  _currentPage > 1 ? onPageChange(_currentPage - 1) : null,
              },
              children: <Icon name="chevron-left" />,
            },
            [PaginationItemType.RightArrow]: {
              props: {
                'aria-label': 'Next page',
                disabled: _currentPage === (totalPages || 0),
                onClick: () =>
                  _currentPage < (totalPages || 0)
                    ? onPageChange(_currentPage + 1)
                    : null,
              },
              children: <Icon name="chevron-right" />,
            },
            [PaginationItemType.Page]: {
              props: {
                'aria-label': `Go to page ${page}`,
                onClick: () => onPageChange(page || 0),
              },
              children: page,
            },
            [PaginationItemType.Ellipsis]: {
              props: {
                // TODO decide if we want to do some action witht the ellipsis button
                'aria-label': 'Ellipsis',
              },
              children: <Icon name="ellipsis" />,
            },
          }[type];

          return (
            <PS.Button
              key={`${page}-${index}`}
              {...button.props}
              active={page === _currentPage}
            >
              {button.children}
            </PS.Button>
          );
        })}
      </PS.Container>
    );
  },
);

export namespace Paginator {
  export type ContainerProps = React.ComponentPropsWithRef<typeof PS.Container>;
  export type ButtonProps = React.ComponentPropsWithRef<typeof PS.Button>;
}
