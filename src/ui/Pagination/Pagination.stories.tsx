import type { Meta, StoryObj } from '@storybook/react';

import { Pagination, type PaginationProps } from './Pagination';

const meta: Meta = {
  title: 'Library/Components/Paginator',
};

export default meta;

export const Customizable: StoryObj<PaginationProps> = {
  render: (args) => <Pagination {...args} />,
  args: {
    totalPages: 10,
  },
};

export const WithChangePageControl: StoryObj<PaginationProps> = {
  render: (args) => <Pagination {...args} />,
  args: {
    totalPages: 10,
    onPageChange: (page: number) => alert(`Go to page ${page}`),
  },
};
