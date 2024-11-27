import { forwardRef } from 'react';

type WithPropsProps<P> = Partial<P>;

export const withProps = <P extends object>(
  Component: React.ComponentType<P>,
  additionalProps: WithPropsProps<P>,
) => {
  return forwardRef((props: P, ref) => (
    <Component {...additionalProps} {...props} ref={ref} />
  ));
};
