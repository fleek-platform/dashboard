import { Meta, StoryFn } from '@storybook/react';

import { StorageTable } from './StorageTable';

const meta: Meta = {
  title: 'Library/Fragments/StorageTable',
};

export default meta;

type Story = StoryFn;

export const Empty: Story = () => {
  return <StorageTable />;
};
