import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@/ui';

import { BadgeText } from './BadgeText';
import type { BadgeTextStyles } from './BadgeText.styles';

const meta: Meta = {
  title: 'Library/Components/Badge Text',
  component: BadgeText,
};

export default meta;

export const Customizable: StoryObj<
  React.ComponentPropsWithRef<typeof BadgeTextStyles>
> = {
  args: {
    children: 'Badge Text',
    colorScheme: 'yellow',
  },
  argTypes: {
    colorScheme: {
      type: {
        name: 'enum',
        value: ['yellow', 'green', 'slate', 'red', 'amber'],
      },
    },
    hoverable: {
      type: { name: 'boolean' },
    },
  },
};

export const CustomizableWithIcon: StoryObj<
  React.ComponentPropsWithRef<typeof BadgeTextStyles>
> = {
  args: {
    children: (
      <>
        <Icon name="check" /> Success
      </>
    ),
    colorScheme: 'yellow',
  },
  argTypes: {
    colorScheme: {
      type: {
        name: 'enum',
        value: ['yellow', 'green', 'slate', 'red', 'amber'],
      },
    },
    hoverable: {
      type: { name: 'boolean' },
    },
  },
};
