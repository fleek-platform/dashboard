import type { Meta, StoryObj } from '@storybook/react';

import {
  type RecoveryCodesModalProps,
  RecoveryCodesModal,
} from './RecoveryCodesModal';

const meta: Meta = {
  title: 'Library/Fragments/2FA/Modals/RecoveryCodes',
  component: RecoveryCodesModal,
};

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

export default meta;

type Story = StoryObj<RecoveryCodesModalProps>;

// eslint-disable-next-line fleek-custom/valid-argument-types
const ComponentWithForm = (args: RecoveryCodesModalProps) => {
  return <RecoveryCodesModal {...args} />;
};

export const Default: Story = {
  render: (args) => <ComponentWithForm {...args} />,
  args: {
    open: true,
    codes: SAMPLE_RECOVERY_CODES,
    isLoading: false,
  },
};

export const Loading: Story = {
  render: (args) => <ComponentWithForm {...args} />,
  args: {
    open: true,
    codes: undefined,
    isLoading: true,
  },
};
