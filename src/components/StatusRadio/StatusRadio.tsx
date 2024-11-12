import { forwardStyledRef } from '@/theme';
import { Icon } from '@/ui';

import { StatusRadioStyles as S } from './StatusRadio.styles';

export type StatusRadioProps = {
  state?: 'error' | 'success' | 'spinner';
} & React.ComponentPropsWithRef<typeof S.Container>;

export const StatusRadio = forwardStyledRef<HTMLDivElement, StatusRadioProps>(
  S.Container,
  ({ state, ...props }, ref) => {
    const getIcon = () => {
      switch (state) {
        case 'error':
          return <Icon name="alert" />;
        case 'success':
          return <Icon name="check" />;
        case 'spinner':
          return <Icon name="spinner" />;
        default:
          return <Icon name="circle" />;
      }
    };

    return (
      <S.Container {...props} ref={ref} status={state}>
        {getIcon()}
      </S.Container>
    );
  },
);
