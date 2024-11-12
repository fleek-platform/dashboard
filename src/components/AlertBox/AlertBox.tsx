import { MouseEventHandler } from 'react';

import { forwardStyledRef } from '@/theme';
import { Icon, IconName } from '@/ui';

import { AlertBoxStyles as S } from './AlertBox.styles';

export type AlertBoxProps = React.ComponentPropsWithRef<typeof S.Container> & {
  onClose?: MouseEventHandler<HTMLDivElement>;
};

export const AlertBox = forwardStyledRef<HTMLDivElement, AlertBoxProps>(S.Container, ({ children, variant, onClose, ...props }, ref) => {
  return (
    <S.Container ref={ref} variant={variant} {...props}>
      <Icon name={getVariantIcon(variant)} />
      <S.ContentWrapper>{children}</S.ContentWrapper>
      {onClose && <S.CloseIcon name="close" onClick={onClose} />}
    </S.Container>
  );
});

const getVariantIcon = (variant: AlertBoxProps['variant']): IconName => {
  switch (variant) {
    case 'bulb':
      return 'bulb';
    case 'danger':
      return 'alert-circled';
    case 'warning':
      return 'alert-triangle';
    case 'tertiary':
      return 'info';
    default:
      return 'dialog';
  }
};
