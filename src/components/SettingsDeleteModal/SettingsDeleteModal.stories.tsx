import { Meta, StoryObj } from '@storybook/react';

import { SettingsDeleteModal } from './SettingsDeleteModal';

const meta: Meta = {
  title: 'Library/Components/Settings Delete Modal',
};

export default meta;

type TableStory = StoryObj<SettingsDeleteModal.TableProps>;

export const Table: TableStory = {
  args: {
    headers: [
      {
        children: 'Site',
        size: '50%',
      },
      {
        children: 'Domain',
        size: '50%',
      },
    ],
    rows: [
      ['Rainbow super long long name', 'rainbow.com'],
      ['Rainbow', 'rainbow.com'],
    ],
    onValidationChange: (value) => console.log(value),
    isLoading: false,
  },
  render: (args: SettingsDeleteModal.TableProps) => <SettingsDeleteModal.Table {...args} />,
};
