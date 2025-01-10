import { Meta, StoryObj } from '@storybook/react';

import { Box, Button, Text } from '@/ui';

import { ComingSoon } from './ComingSoon';

const meta: Meta = {
  title: 'Library/Components/Comming Soon/Overlay',
  component: ComingSoon.Overlay,
};

export default meta;

type Story = StoryObj<ComingSoon.OverlayProps>;

const DisabledComponent: React.FC = () => (
  <Box className="size-[200px] items-center gap-3">
    <Text>Text Content</Text>
    <Button onClick={() => console.log("Can't click me")}>
      Can&apos;t click me
    </Button>
  </Box>
);

const BorderRadiusDisabledComponent: React.FC = () => (
  <Box className="size-[200px] items-center gap-3 rounded-lg">
    <Text>Text Content</Text>
    <Button onClick={() => console.log("Can't click me")}>
      Can&apos;t click me
    </Button>
  </Box>
);

export const Overlay: Story = {
  render: (args: ComingSoon.OverlayProps) => <ComingSoon.Overlay {...args} />,
  args: {
    children: <DisabledComponent />,
    description: 'This feature is comming soon...',
  },
};

export const WithBorderRadius: Story = {
  render: (args: ComingSoon.OverlayProps) => <ComingSoon.Overlay {...args} />,
  args: {
    children: <BorderRadiusDisabledComponent />,
    description: 'This feature is comming soon...',
  },
};
