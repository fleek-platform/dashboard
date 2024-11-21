import { Meta, StoryObj } from '@storybook/react';

import { QrCode, QrCodeProps } from './QrCode';

const meta: Meta = {
  title: 'Library/Components/Qr Code',
  component: QrCode,
};

export default meta;

type Story = StoryObj<QrCodeProps>;

export const ResourcesBoxStory: Story = {
  args: {
    data: 'https://example.com',
  },
};
