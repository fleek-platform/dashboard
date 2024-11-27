import { Meta, StoryObj } from '@storybook/react';

import { Form } from '@/components';
import { Create2FAFormResponse, Create2FAFormValues } from '@/types/2FA';

import { EditModal, EditModalProps } from './EditModal';

const meta: Meta = {
  title: 'Library/Fragments/2FA/Modals/Edit',
  component: EditModal,
};

export default meta;

const SAMPLE_RECOVERY_CODES = [
  'foo',
  'bar',
  'tre',
  'dis',
  'mim',
  'nowl',
  'asdf',
  'ice',
  'cream',
  'chair',
  'paint',
  'tape',
  'test',
  'extra',
  'long',
];

type Story = StoryObj<EditModalProps>;

// eslint-disable-next-line fleek-custom/valid-argument-types
const ComponentWithForm = (args: EditModalProps) => {
  const verify2FAForm = Form.useForm<Create2FAFormValues, Create2FAFormResponse>({
    values: {
      secretKeyId: '',
      token: '',
    },
    onSubmit: async (values) => {
      console.log('Submitted with values', values);

      return {
        isVerified: true,
        recoveryCodes: SAMPLE_RECOVERY_CODES,
      };
    },
  });

  return (
    <Form.Provider value={verify2FAForm}>
      <EditModal {...args} />
    </Form.Provider>
  );
};

export const Default: Story = {
  render: (args: EditModalProps) => <ComponentWithForm {...args} />,
  args: {
    open: true,
    otpUrl:
      'otpauth://totp/Fleek.xyz?secret=nequeporroquisquamestqunequeporroquisquamestqunequeporroquisquam&issuer=Storybook&algorithm=SHA256&digits=6&period=30',
    isLoading: false,
  },
};

export const Loading: Story = {
  render: (args: EditModalProps) => <ComponentWithForm {...args} />,
  args: {
    open: true,
    isLoading: true,
  },
};
