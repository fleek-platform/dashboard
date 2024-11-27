import { forwardStyledRef } from '@/theme';

import { RadioGroupStyles as S } from './RadioGroup.styles';

const Root = forwardStyledRef<HTMLDivElement, RadioGroup.RootProps>(
  S.Root,
  ({ children, orientation = 'horizontal', ...props }, ref) => {
    return (
      <S.Root {...props} ref={ref} orientation={orientation}>
        {children}
      </S.Root>
    );
  },
);

const Item = forwardStyledRef<HTMLButtonElement, RadioGroup.Item>(
  S.Item,
  ({ ...props }, ref) => {
    return (
      <S.Item {...props} ref={ref}>
        <S.Indicator />
      </S.Item>
    );
  },
);

export const RadioGroup = {
  Root,
  Item,
};

export namespace RadioGroup {
  export type RootProps = React.ComponentPropsWithRef<typeof S.Root>;
  export type Item = React.ComponentPropsWithRef<typeof S.Item>;
}
