import { envVarName, envVarValue } from '@fleek-platform/utils-validation';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import type { z } from 'zod';

import { BaseDirectoryField, Form, ToggleButton } from '@/components';
import { constants } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { space } from '@/theme/foundations/space';
import type { SiteNewSecret } from '@/types/Site';
import { Button, Divider, FormField, Icon, Input, Text } from '@/ui';

import { useDeploySiteContext } from '../../DeploySite.context';
import { ConfigureStepStyles as S } from './Configure.styles';

export const Advanced: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const variables = useState<SiteNewSecret[]>([getNewEmptySecret()]);
  const { sourceProvider, gitBranch, gitRepository, gitUser, accessToken } =
    useDeploySiteContext();

  useEffect(() => {
    const { current: ref } = containerRef;

    if (!ref) {
      return;
    }

    if (enabled) {
      ref.style.maxHeight = '0px';
      ref.style.height =
        ref.style.height === '0px'
          ? `calc(${ref.scrollHeight}px + ${space['spacing-6']} * 2)`
          : `${ref.scrollHeight}px`;
      ref.style.maxHeight = '';

      const observer = new MutationObserver(() => {
        ref.style.maxHeight = '0px';
        ref.style.height =
          ref.style.height === '0px'
            ? `calc(${ref.scrollHeight}px + ${space['spacing-6']} * 2)`
            : `${ref.scrollHeight}px`;
        ref.style.maxHeight = '';
      });

      observer.observe(ref, {
        childList: true,
        subtree: true,
        attributeFilter: ['children'],
      });

      return () => {
        observer.disconnect();
      };
    }
    ref.style.height = '0px';
  }, [containerRef, enabled]);

  const handleToggleAdvanced = () => {
    setEnabled((prev) => !prev);
  };

  return (
    <>
      <S.Advanced.Container ref={containerRef} enabled={enabled}>
        <Form.InputField
          name="dockerImage"
          label="Docker Image"
          placeholder="node:16"
          labelTooltip="The docker image and tag that will be used to build your application. Automatically detected by Fleek, but you can use any image published on Docker Hub (e.g. node:lts)."
          disableValidMessage
          disableValidationDebounce
        />

        <BaseDirectoryField
          deprecated
          fieldName="baseDirectory"
          sourceProvider={sourceProvider}
          repository={gitRepository?.name}
          branch={gitBranch}
          slug={gitUser?.slug}
          accessToken={accessToken}
        />

        <Divider />

        <EnvironmentVariables variables={variables} />
      </S.Advanced.Container>

      <Button
        intent="neutral"
        className="w-full"
        onClick={handleToggleAdvanced}
      >
        {enabled ? 'Hide' : 'Show'}&nbsp;advanced options
      </Button>
    </>
  );
};

type EnvironmentVariablesProps = {
  variables: [
    SiteNewSecret[],
    React.Dispatch<React.SetStateAction<SiteNewSecret[]>>,
  ];
};

const EnvironmentVariables: React.FC<EnvironmentVariablesProps> = ({
  variables: [variables, setVariables],
}) => {
  const field = Form.useField('secrets');

  useEffect(() => {
    field.setValue(
      variables.filter(
        (variable) =>
          envVarName.safeParse(variable.key).success &&
          envVarValue.safeParse(variable.value).success,
      ),
      true,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variables]);

  const handleAddVariable = () => {
    setVariables((prev) => [...prev, getNewEmptySecret()]);
  };

  const handleRemoveVariable = (index: number) => {
    setVariables((prev) => prev.filter((_, i) => i !== index));
  };

  // eslint-disable-next-line fleek-custom/valid-argument-types
  const handleChangeVariable = <Key extends keyof SiteNewSecret>(
    index: number,
    key: Key,
    value: SiteNewSecret[Key],
  ) => {
    setVariables((prev) => {
      const newVariables = [...prev];
      newVariables[index][key] = value;

      return newVariables;
    });
  };

  return (
    <>
      <Text
        variant="primary"
        size="md"
        weight={500}
        className="flex items-center justify-between"
      >
        Environment Variables
        <Button onClick={handleAddVariable} size="sm">
          Add
        </Button>
      </Text>

      {variables.map(({ key, value, encrypted }, index) => (
        <EnvironmentVariable
          key={index}
          index={index}
          variable={{ key, value, encrypted }}
          onChange={handleChangeVariable}
          onRemove={handleRemoveVariable}
          variables={variables}
        />
      ))}
    </>
  );
};

type EnvironmentVariableProps = {
  variable: SiteNewSecret;
  index: number;
  variables: SiteNewSecret[];
  onChange: <Key extends keyof SiteNewSecret>(
    index: number,
    key: Key,
    value: SiteNewSecret[Key],
  ) => void;
  onRemove: (index: number) => void;
};

const EnvironmentVariable: React.FC<EnvironmentVariableProps> = ({
  variable,
  variables,
  index,
  onChange,
  onRemove,
}: EnvironmentVariableProps) => {
  const { key, value, encrypted } = variable;
  const shouldValidate = key !== '' || value !== '';
  const [envVarNameError, setEnvVarNameError] = useState<string>('');
  const [isNameDuplicated, setIsNameDuplicated] = useState(false);
  const [envVarValueError, setEnvVarValueError] = useState<string>('');

  const isLastVariable = variables.length === 1;

  const handleEnvNameValidation = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const envVarNameValidation = envVarName.safeParse(
      event.currentTarget.value,
    );

    if (!envVarNameValidation.success) {
      setEnvVarNameError(
        (envVarNameValidation as z.SafeParseError<string>).error.issues
          .map((issue) => issue.message)
          .join('. '),
      );
    } else if (!isNameDuplicated) {
      // clean the previous formik error message
      setEnvVarNameError('');
    }
  };

  const validateInUse = useDebounce((key) => {
    variables.splice(index, 1);

    const isInUse = variables.some(
      ({ key: keySecret }) =>
        keySecret.toLocaleUpperCase() === key.toLocaleUpperCase(),
    );

    if (isInUse) {
      setIsNameDuplicated(true);
      setEnvVarNameError(`${key} ${constants.ALREADY_IN_USE}`);
    } else {
      setIsNameDuplicated(false);
    }
  }, 500);

  const handleEnvNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    validateInUse(event.currentTarget.value);

    onChange(index, 'key', event.currentTarget.value);
  };

  const handleEnvValueValidation = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const envVarValueValidation = envVarValue.safeParse(
      event.currentTarget.value,
    );

    if (!envVarValueValidation.success) {
      setEnvVarValueError(
        (envVarValueValidation as z.SafeParseError<string>).error.issues
          .map((issue) => issue.message)
          .join('. '),
      );
    } else {
      // clean the previous error message
      setEnvVarValueError('');
    }
  };

  return (
    <S.Advanced.Row key={index}>
      <FormField.Root
        error={Boolean(envVarNameError) && shouldValidate}
        className="flex-1"
      >
        <Input.Root>
          <Input.Field
            placeholder="EXAMPLE_NAME"
            value={key}
            onChange={handleEnvNameChange}
            onBlur={handleEnvNameValidation}
          />
        </Input.Root>
        {envVarNameError && shouldValidate && (
          <FormField.Hint>{envVarNameError}</FormField.Hint>
        )}
      </FormField.Root>

      <FormField.Root
        error={Boolean(envVarValueError) && shouldValidate}
        className="flex-1"
      >
        <Input.Root>
          <Input.Field
            placeholder="someValue"
            value={value}
            onChange={(event) =>
              onChange(index, 'value', event.currentTarget.value)
            }
            onBlur={handleEnvValueValidation}
          />
        </Input.Root>
        {envVarValueError && shouldValidate && (
          <FormField.Hint>{envVarValueError}</FormField.Hint>
        )}
      </FormField.Root>

      <ToggleButton
        value={encrypted}
        onChange={(eventValue) => onChange(index, 'encrypted', eventValue)}
      />

      {!isLastVariable && (
        <Icon name="close-circle" onClick={() => onRemove(index)} />
      )}
    </S.Advanced.Row>
  );
};

const getNewEmptySecret = (): SiteNewSecret => ({
  key: '',
  value: '',
  encrypted: false,
});
