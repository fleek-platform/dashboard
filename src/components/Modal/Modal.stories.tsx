import { Meta, StoryFn } from '@storybook/react';

import { Button, Dialog, Divider, FormField, Text } from '@/ui';

import { Modal } from './Modal';

const meta: Meta = {
  title: 'Library/Components/Modal',
};

export default meta;

export const Default: StoryFn = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button>Open modal</Button>
    </Dialog.Trigger>
    <Dialog.Overlay />
    <Modal.Content>
      <Modal.Heading>Title</Modal.Heading>
      <Text>Your message here</Text>
      <Text>Another message here</Text>

      <Modal.CTARow>
        <Dialog.Close asChild>
          <Button intent="neutral">Cancel</Button>
        </Dialog.Close>
        <Button>Submit</Button>
      </Modal.CTARow>
    </Modal.Content>
  </Dialog.Root>
);

export const WithInner: StoryFn = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button>Open modal</Button>
    </Dialog.Trigger>
    <Dialog.Overlay />
    <Modal.Content>
      <Modal.Heading>Title</Modal.Heading>
      <Text>Your message here</Text>
      <Text>Another message here</Text>

      <Modal.Inner.Container>
        <Modal.Inner.Row>
          <FormField.Root>
            <FormField.Label>label</FormField.Label>
            <Text>value here</Text>
          </FormField.Root>
          <FormField.Root>
            <FormField.Label>label</FormField.Label>
            <Text>value here</Text>
          </FormField.Root>
        </Modal.Inner.Row>
        <Divider />
        <FormField.Root>
          <FormField.Label>label</FormField.Label>
          <Text>value here</Text>
        </FormField.Root>
      </Modal.Inner.Container>

      <Modal.CTARow>
        <Dialog.Close asChild>
          <Button intent="neutral">Cancel</Button>
        </Dialog.Close>
        <Button>Submit</Button>
      </Modal.CTARow>
    </Modal.Content>
  </Dialog.Root>
);

export const WithInnerLoading: StoryFn = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button>Open modal</Button>
    </Dialog.Trigger>
    <Dialog.Overlay />
    <Modal.Content>
      <Modal.Heading>Title</Modal.Heading>
      <Text>Your message here</Text>
      <Text>Another message here</Text>

      <Modal.Inner.Container>
        <Modal.Inner.Row>
          <FormField.Root>
            <FormField.Label>label</FormField.Label>
            <Modal.Inner.TextSkeleton />
          </FormField.Root>
          <FormField.Root>
            <FormField.Label>label</FormField.Label>
            <Modal.Inner.TextSkeleton />
          </FormField.Root>
        </Modal.Inner.Row>
        <Divider />
        <FormField.Root>
          <FormField.Label>label</FormField.Label>
          <Modal.Inner.TextSkeleton />
        </FormField.Root>
      </Modal.Inner.Container>

      <Modal.CTARow>
        <Dialog.Close asChild>
          <Button intent="neutral">Cancel</Button>
        </Dialog.Close>
        <Button>Submit</Button>
      </Modal.CTARow>
    </Modal.Content>
  </Dialog.Root>
);
