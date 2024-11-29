import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Box } from '../Box/Box';
import { Combobox } from '../Combobox/Combobox';
import { Input } from '../ftw/Input/Input';
import { Text } from '../ftw/Text/Text';
import { Icon } from '../Icon/Icon';
import { FormField } from './FormField';

const meta: Meta = {
  title: 'Library/Molecules/Form Field',
};

export default meta;

type Story = StoryObj;

export const WithInput: Story = {
  render: () => {
    const Content = () => (
      <>
        <FormField.Label>Search For Something</FormField.Label>

        <Input.Root>
          <Input.Icon name="magnify" />
          <Input.Field placeholder="Search..." />
        </Input.Root>

        <FormField.Hint>
          <Icon name="fleek" />
          Use this field to search for something
        </FormField.Hint>
      </>
    );

    return (
      <Box css={{ gap: '$lg' }}>
        <FormField.Root>
          <Content />
        </FormField.Root>

        <FormField.Root error>
          <Content />
        </FormField.Root>
      </Box>
    );
  },
};

export const WithCombobox: Story = {
  render: () => {
    const ComboboxExample = () => {
      const selected = useState<string>();

      return (
        <Combobox
          items={['Option 1', 'Option 2', 'Option 3']}
          selected={selected}
        >
          {({ Field, Options }) => (
            <>
              <Field placeholder="Select an option">
                {(selected: string) => selected}
              </Field>
              <Options>{(item: string) => item}</Options>
            </>
          )}
        </Combobox>
      );
    };

    const Content = () => (
      <>
        <FormField.Label>Select Something</FormField.Label>

        <ComboboxExample />

        <FormField.Hint icon="fleek">
          Use this field to select something
        </FormField.Hint>
      </>
    );

    return (
      <Box css={{ gap: '$lg' }}>
        <FormField.Root>
          <Content />
        </FormField.Root>

        <FormField.Root error>
          <Content />
        </FormField.Root>
      </Box>
    );
  },
};

export const withTooltip: Story = {};

export const Combined: Story = {
  render: () => {
    return (
      <Box variant="container">
        <Text as="h1">Combined Form Fields</Text>
        <Text as="h2">Input</Text>
        {(WithInput.render as any)()}
        <Text as="h2">Combobox</Text>
        {(WithCombobox.render as any)()}
      </Box>
    );
  },
};
