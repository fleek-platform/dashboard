import { createApplicationSchemaNext } from '@fleek-platform/utils-validation';
import { useEffect, useState } from 'react';
import { z } from 'zod';

import { Form, SettingsBox } from '@/components';
import { LoadingProps } from '@/types/Props';
import { Box, Button, FormField, Icon, Input } from '@/ui';

import { ApplicationCredentialsStyles as S } from './ApplicationCredentials.styles';

type WhitelistDomainsProps = LoadingProps<{
  whiteListedDomains?: string[];
}>;

export const WhitelistDomains: React.FC<WhitelistDomainsProps> = ({
  isLoading,
}) => {
  const field = Form.useField<string[]>('whitelistDomains');

  const handleAddDomain = () => {
    field.setValue([...field.value, '']);
  };

  const handleRemoveDomain = (index: number) => {
    field.setValue(field.value.filter((_, i) => i !== index));
  };

  const handleDomainChange = (index: number, value: string) => {
    field.setValue(
      field.value.map((domain, i) => (i === index ? value : domain)),
      true,
    );
  };

  if (isLoading) {
    return <SettingsBox.Skeleton variant="input" />;
  }

  return (
    <>
      <S.Whitelist.Container>
        <FormField.Label>Whitelist domains</FormField.Label>
        <Box>
          {field.value.map((domain, index) => (
            <WhitelistedDomain
              key={index}
              value={domain}
              index={index}
              onChange={handleDomainChange}
              onRemove={handleRemoveDomain}
            />
          ))}
        </Box>
      </S.Whitelist.Container>

      <Button iconLeft="add-circle" onClick={handleAddDomain}>
        Add another domain
      </Button>
    </>
  );
};

type WhitelistedDomainProps = {
  value: string;
  index: number;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
};

const WhitelistedDomain: React.FC<WhitelistedDomainProps> = ({
  value,
  index,
  onChange,
  onRemove,
}) => {
  const [error, setError] = useState<string | false>(false);
  const [touched, setTouched] = useState(false);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(index, event.target.value);
    setTouched(true);
  };

  useEffect(() => {
    const validation =
      createApplicationSchemaNext.shape.data.shape.whitelistDomains.element.safeParse(
        value,
      );

    if (validation.success || !touched) {
      setError(false);
    } else {
      const timeout = setTimeout(() => {
        setError((validation as z.SafeParseError<string>).error.issues[0].message);
      }, 700);

      return () => clearTimeout(timeout);
    }
  }, [value, touched]);

  return (
    <S.Domain.Container>
      <FormField.Root error={Boolean(error)} className="flex-1">
        <Input.Root error={Boolean(error)}>
          <Input.Field
            placeholder="example.com"
            value={value}
            onChange={handleValueChange}
            autoFocus={index !== 0}
          />
        </Input.Root>
        {error && <FormField.Hint>{error}</FormField.Hint>}
      </FormField.Root>

      {index !== 0 && (
        <Icon name="close-circle" onClick={() => onRemove(index)} />
      )}
    </S.Domain.Container>
  );
};
