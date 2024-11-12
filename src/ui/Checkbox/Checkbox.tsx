import { forwardStyledRef } from '@/theme';

import { Icon } from '../Icon/Icon';
import { CheckBoxStyles as S } from './Checkbox.styles';

export type CheckboxProps = React.ComponentPropsWithRef<typeof S.Root>;

export const Checkbox = forwardStyledRef<HTMLButtonElement, CheckboxProps>(S.Root, (props, ref) => {
  return (
    <S.Root ref={ref} {...props}>
      <S.Indicator>
        <Icon name="check" />
      </S.Indicator>
    </S.Root>
  );
});
