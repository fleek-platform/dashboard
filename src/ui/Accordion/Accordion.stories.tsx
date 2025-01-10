import { Meta, StoryObj } from '@storybook/react';

import { Box } from '../ftw/Box/Box';
import { Input } from '../ftw/Input/Input';
import { Text } from '../ftw/Text/Text';
import { Accordion } from './Accordion';

const meta: Meta = {
  title: 'Library/Molecules/Accordion',
  component: Accordion.Root,
};

export default meta;

type Story = StoryObj<typeof Accordion.Root>;

export const Default: Story = {
  render: (args) => {
    return (
      <Accordion.Root {...args}>
        <Accordion.Item value="item-1">
          <Accordion.Header>Item 1</Accordion.Header>
          <Accordion.Content>Text</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    );
  },

  args: {
    css: { width: '300px' },
    collapsible: true,
  },
};

export const WithMultipleItems: Story = {
  render: (args) => {
    return (
      <Accordion.Root {...args}>
        <Accordion.Item value="item-1">
          <Accordion.Header>
            <Box className="flex-row items-center gap-2">
              <Input.Field type="radio" />{' '}
              <Text as="h3" variant="primary">
                Source Build
              </Text>
            </Box>
          </Accordion.Header>
          <Accordion.Content>Text</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Header>
            <Box className="flex-row items-center gap-2">
              <Input.Field type="radio" />{' '}
              <Text as="h3" variant="primary">
                Build Breakdown
              </Text>
            </Box>
          </Accordion.Header>
          <Accordion.Content>Text</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Header>
            <Box className="flex-row items-center gap-2">
              <Input.Field type="radio" />{' '}
              <Text as="h3" variant="primary">
                Domains
              </Text>
            </Box>
          </Accordion.Header>
          <Accordion.Content>Text</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    );
  },

  args: {
    css: { width: '300px' },
  },
  argTypes: {
    type: {
      defaultValue: 'multiple',
      type: { name: 'enum', value: ['multiple', 'simple'] },
    },
    collapsible: {
      defaultValue: true,
      type: { name: 'boolean' },
    },
  },
};
