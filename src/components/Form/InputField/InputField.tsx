import type React from 'react';
import type { ReactElement, ReactNode } from 'react';
import { match } from 'ts-pattern';

import type { DisabledProps } from '@/types/Props';
import { FormField, Input, type InputVariants } from '@/ui';
import { cn } from '@/utils/cn';

import { useFormField } from '../FormProvider';

export type InputFieldProps = DisabledProps<
  {
    isLoading?: boolean;
    name: string;
    label?: string | ReactElement;
    labelTooltip?: React.ReactNode;
    fieldType?: 'Field' | 'Textarea';
    inputSize?: InputVariants['size'];
    charactersCounter?: number;
    disableValidMessage?: boolean;
    disableValidationDebounce?: boolean;
    beforeContent?: ReactNode;
    afterContent?: ReactNode;
    formFieldRootClassName?: string;
    inputRootClassName?: string;
    inputFieldClassName?: string;
  } & InputVariants &
    React.InputHTMLAttributes<HTMLInputElement>
>;

export const InputField: React.FC<InputFieldProps> = ({
  isLoading = false,
  isDisabled,
  name,
  label,
  variant,
  inputSize,
  type = 'text',
  placeholder = '',
  autoFocus = false,
  labelTooltip,
  fieldType = 'Field',
  charactersCounter,
  disableValidMessage,
  disableValidationDebounce,
  beforeContent,
  afterContent,
  formFieldRootClassName,
  inputRootClassName,
  inputFieldClassName,
  ...htmlAttributes
}) => {
  const field = useFormField<string>(name);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { maxLength } = htmlAttributes;

    if (maxLength && event.target.value.length > maxLength) {
      return;
    }

    field.setValue(event.target.value, disableValidationDebounce);
  };

  const handleBlur = () => {
    field.setTouched(true);
  };

  return (
    <FormField.Root className={cn('flex-1', formFieldRootClassName)}>
      {label && (
        <Input.Label
          htmlFor={name}
          tooltip={labelTooltip}
          error={field.status === 'invalid'}
        >
          {label}
        </Input.Label>
      )}

      <Input.Root
        variant={variant}
        size={inputSize}
        disabled={isDisabled || htmlAttributes.disabled}
        className={inputRootClassName}
        isLoading={isLoading}
        error={field.status === 'invalid'}
      >
        {beforeContent}

        {fieldType === 'Field' ? (
          <Input.Field
            id={name}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            value={field.value}
            type={type}
            autoFocus={autoFocus}
            name={name}
            disabled={isDisabled}
            className={inputFieldClassName}
            {...(htmlAttributes as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        ) : (
          <Input.Textarea
            id={name}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            value={field.value}
            autoFocus={autoFocus}
            name={name}
            disabled={isDisabled}
            className={inputFieldClassName}
            {...(htmlAttributes as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        )}

        {afterContent}

        {field.dirty &&
          match(field.status)
            .with('validating', () => (
              <Input.Icon
                status={field.status}
                name="spinner"
                tooltip={field.message || 'Checking availability...'}
              />
            ))
            .with('valid', () =>
              disableValidMessage ? null : (
                <Input.Icon
                  status={field.status}
                  name="check-circled"
                  tooltip={field.message || `${field.value} is available`}
                />
              ),
            )
            .otherwise(() => undefined)}
      </Input.Root>

      {charactersCounter && (
        <Input.Hint>
          {field.value.length}/{charactersCounter}
        </Input.Hint>
      )}

      {field.dirty &&
        match(field.status)
          .with('invalid', () => (
            <Input.Hint icon="close-circle" error>
              {field.message || `${field.value} already in use`}
            </Input.Hint>
          ))
          .with('other', () => field.message ?? undefined)
          .otherwise(() => undefined)}
    </FormField.Root>
  );
};
