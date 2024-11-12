import { Meta, StoryObj } from '@storybook/react';

import { Form } from '@/components';
import { Button, Dialog } from '@/ui';

import { AuthenticationModal } from './AuthenticationModal';

const meta: Meta = {
  title: 'Library/Fragments/2FA/Modals/Authentication',
  component: AuthenticationModal,
};

export default meta;

type Story = StoryObj;

// eslint-disable-next-line fleek-custom/valid-argument-types
const ComponentWithForm = () => {
  const authenticateForm = Form.useForm({
    values: {
      verificationCode: '',
      recoveryCode: '',
    },
    onSubmit: async (values) => {
      console.log('Submitted with values', values);
    },
  });

  return (
    <Form.Provider value={authenticateForm}>
      <Dialog.Root onOpenChange={() => authenticateForm.resetForm()}>
        <Dialog.Trigger asChild>
          <Button>Open modal</Button>
        </Dialog.Trigger>
        <Dialog.Overlay />
        <AuthenticationModal />
      </Dialog.Root>
    </Form.Provider>
  );
};

export const Default: Story = {
  render: () => <ComponentWithForm />,
};
