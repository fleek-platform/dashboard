import { forwardRef } from 'react';

import { cn } from './cn';

type ClassName = { className?: string };
type WithPropsProps<P> = Partial<P> & ClassName;

export const withProps = <P extends object>(Component: React.ComponentType<P>, initialProps: WithPropsProps<P>) => {
  return forwardRef((additionalProps: P & ClassName, ref) => (
    <Component {...initialProps} {...additionalProps} className={cn(initialProps.className, additionalProps.className)} ref={ref} />
  ));
};
