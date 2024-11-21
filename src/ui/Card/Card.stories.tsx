import { Meta, StoryObj } from '@storybook/react';

import { Icon, Text } from '@/ui';

import { Card } from './Card';

const meta: Meta = {
  title: 'Library/Molecules/Card',
  component: Card.Root,
};

export default meta;

type Story = StoryObj<Card.RootProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <Card.Root {...args}>
        <Card.Cover src="https://picsum.photos/300/300" />
        <Card.Content.Wrapper>
          <Card.Content.Row>
            <Text as="h2" variant="primary" size="xl" weight={700}>
              Card Title
            </Text>
            <Icon name="fleek" />
          </Card.Content.Row>

          <Card.Content.Row>
            <Text>Card Description</Text>
            <Text>Other</Text>
          </Card.Content.Row>
        </Card.Content.Wrapper>
      </Card.Root>
    );
  },

  args: {
    css: { width: '300px' },
  },
};

export const EmptyImage: Story = {
  render: (args) => {
    return (
      <Card.Root {...args}>
        <Card.Cover>
          <Icon name="image" css={{ fontSize: '20px' }} /> There is no source
          image
        </Card.Cover>
        <Card.Content.Wrapper>
          <Card.Content.Row>
            <Text as="h2" variant="primary" size="xl" weight={700}>
              Card Title
            </Text>
            <Icon name="fleek" />
          </Card.Content.Row>

          <Card.Content.Row>
            <Text>Card Description</Text>
            <Text>Other</Text>
          </Card.Content.Row>
        </Card.Content.Wrapper>
      </Card.Root>
    );
  },

  args: {
    css: { width: '300px' },
  },
};
