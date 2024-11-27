import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Checkbox, CheckboxProps } from './Checkbox';

const meta: Meta = {
  title: 'Library/Atoms/Checkbox',
  component: Checkbox,
};

export default meta;

export const Customizable: StoryObj<CheckboxProps> = {
  args: {
    css: { fontSize: '1rem' },
    disabled: true,
  },
};

export const withStatusControl: StoryFn<CheckboxProps> = (args) => {
  const CheckboxElement = (): JSX.Element => {
    const [checked, setChecked] = useState(false);

    const handleCheckedChange = () => {
      setChecked(!checked);
    };

    return <Checkbox {...args} checked={checked} onCheckedChange={handleCheckedChange} />;
  };

  return <CheckboxElement />;
};
