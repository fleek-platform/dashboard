import { Meta, StoryObj } from '@storybook/react';

import { Image, ImageProps } from './Image';

const meta: Meta = {
  title: 'Library/Atoms/Image',
  component: Image,
};

export default meta;

type Story = StoryObj<ImageProps>;

export const Default: Story = {
  render: (args) => <Image {...args} alt="storybook image" />,
  args: {
    src: 'https://picsum.photos/200/300',
    css: { width: '300px', height: '300px', borderRadius: '50px' },
  },
};

export const Error: Story = {
  render: (args) => <Image {...args} alt="storybook image" />,
  args: {
    src: 'https://broken.photos/200/300',
    css: {
      width: '300px',
      height: '300px',
      borderRadius: '50px',
      fontSize: '28px',
    },
  },
};
