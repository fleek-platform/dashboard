import React, { createContext, forwardRef, useContext } from 'react';

import { ChildrenProps } from '@/types/Props';
import { cn } from '@/utils/cn';

import { Box } from '../Box/Box';
import { Input, InputHintProps, InputLabelProps } from '../ftw/Input/Input';

const FormFieldContext = createContext({
  error: false,
});

type RootProps = ChildrenProps &
  React.HTMLAttributes<HTMLDivElement> & {
    error?: boolean;
  };

const Root = forwardRef<HTMLDivElement, RootProps>(
  ({ error = false, children, className, ...props }, ref) => {
    return (
      <FormFieldContext.Provider value={{ error }}>
        <Box {...props} className={cn('gap-2', className)} ref={ref}>
          {children}
        </Box>
      </FormFieldContext.Provider>
    );
  },
);

const Label: React.FC<InputLabelProps> = ({
  children,
  className,
  ...props
}) => {
  const { error } = useContext(FormFieldContext);

  return (
    <Input.Label {...props} className={className} error={props.error || error}>
      {children}
    </Input.Label>
  );
};

const Hint: React.FC<InputHintProps> = ({ children, className, ...props }) => {
  const { error } = useContext(FormFieldContext);

  return (
    <Input.Hint {...props} className={className} error={props.error || error}>
      {children}
    </Input.Hint>
  );
};

export const FormField = {
  Root,
  Label,
  Hint,
};
