import { ComponentProps, forwardRef } from 'react';

import { ChildrenProps } from '@/types/Props';

import { Link, LinkExternal } from '../Link/Link';

export type ExternalLinkProps = ChildrenProps & ComponentProps<typeof Link>;

export const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ children, ...props }, ref) => {
    return (
      <LinkExternal {...props} ref={ref} target={props.target} rel="noopener noreferrer">
        {children}
      </LinkExternal>
    );
  },
);
