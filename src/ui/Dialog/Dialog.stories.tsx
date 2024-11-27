import { Meta, StoryFn } from '@storybook/react';

import { Box } from '../Box/Box';
import { FormField } from '../FormField/FormField';
import { Button } from '../ftw/Button/Button';
import { Input } from '../ftw/Input/Input';
import { Text } from '../ftw/Text/Text';
import { Dialog } from './Dialog';

const meta: Meta = {
  title: 'Library/Components/Dialog',
};

export default meta;
type Story = StoryFn<Dialog.RootProps>;

export const Default: Story = (args) => {
  return (
    <Dialog.Root {...args}>
      <Dialog.Trigger>
        <Button> Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Overlay />
      <Dialog.Content>
        <Dialog.Title asChild>
          <Text as="h2" variant="primary" size="xl" weight={700}>
            Dialog title
          </Text>
        </Dialog.Title>
        <Dialog.Description asChild>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Dialog.Description>
        <Dialog.Close asChild>
          <Button intent="neutral">Close</Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export const CreateProject: Story = (args) => {
  return (
    <Dialog.Root {...args}>
      <Dialog.Trigger>
        <Button> Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Overlay />
      <Dialog.Content>
        <Text as="h2" variant="primary" size="xl" weight={700}>
          Create Project
        </Text>
        <Text>
          Create a new project to host sites and store files. You can further
          customize your project in settings, including inviting collaborators.
        </Text>
        <Box css={{ gap: '$xs' }}>
          <FormField.Label>Project name</FormField.Label>
          <Input.Root>
            <Input.Field placeholder="Project name" />
          </Input.Root>
        </Box>
        <Text>Learn more about Projects</Text>
        <Box css={{ flexDirection: 'row', gap: '$sm', fontSize: '0.875rem' }}>
          <Dialog.Close asChild>
            <Button intent="neutral">Cancel</Button>
          </Dialog.Close>
          <Button disabled>Create</Button>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
};
