import { forwardRef } from 'react';

import { Button, type ButtonProps } from '@/ui';

import { useFormContext } from '../FormProvider';

type SubmitButtonProps = Omit<ButtonProps, 'type' | 'onChange' | 'onSubmit'> & {
  partial?: boolean;
  onSubmit?: () => void;
};

export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  (props, ref) => {
    const form = useFormContext();

    const handleOnSubmit = async () => {
      await form.submit();

      if (props.onSubmit) {
        props.onSubmit();
      }
    };

    return (
      <Button
        ref={ref}
        type="submit"
        loading={form.isSubmitting}
        disabled={form.shouldDisableSubmit}
        onClick={handleOnSubmit}
        {...props}
      />
    );
  },
);
