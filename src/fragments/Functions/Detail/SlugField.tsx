import { useMemo } from 'react';

import {
  InputField,
  type InputFieldProps,
} from '@/components/Form/InputField/InputField';
import { Text } from '@/ui';

import { useFunctionDetailContext } from './Context';

type SlugFieldProps = InputFieldProps;

export const SlugField = (props: SlugFieldProps) => {
  const fn = useFunctionDetailContext(true);
  const suffix = useMemo(() => {
    if (fn?.invokeUrl) {
      const { hostname } = new URL(fn.invokeUrl);

      return hostname.substring(hostname.indexOf('.'));
    }
  }, [fn]);

  return (
    <InputField
      {...props}
      inputRootClassName="overflow-hidden"
      beforeContent={
        <Text className="shrink-0 text-neutral-9 pointer-events-none">
          https://
        </Text>
      }
      afterContent={
        <Text className="shrink-0 text-neutral-9 pointer-events-none">
          {suffix}
        </Text>
      }
    />
  );
};
