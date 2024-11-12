import { forwardStyledRef } from '@/theme';
import { Icon, IconName } from '@/ui';

import { ExternalLinkElement } from './ExternalLink.styles';

export type ExternalLinkProps = {
  withIcon?: boolean;
  iconName?: IconName;
  iconOrder?: 'start' | 'end';
} & Omit<
  React.ComponentPropsWithRef<typeof ExternalLinkElement>,
  'target' | 'rel'
>;

export const ExternalLink = forwardStyledRef<
  HTMLAnchorElement,
  ExternalLinkProps
>(
  ExternalLinkElement,
  (
    {
      children,
      withIcon = false,
      iconName = 'external-link',
      iconOrder = 'end',
      ...props
    },
    ref,
  ) => {
    return (
      <ExternalLinkElement
        ref={ref}
        target={props.href}
        rel="noopener noreferrer"
        {...props}
      >
        {withIcon && iconOrder === 'start' && <Icon name={iconName} />}
        {children}
        {withIcon && iconOrder === 'end' && <Icon name={iconName} />}
      </ExternalLinkElement>
    );
  },
);
