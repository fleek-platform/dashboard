import { ComponentProps, forwardRef } from 'react';

import { ChildrenProps } from '@/types/Props';

import { Link } from '../Link/Link';

export type ExternalLinkProps = ChildrenProps & ComponentProps<typeof Link>;

export const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(({ children, ...props }, ref) => {
  return (
    <Link {...props} ref={ref} target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  );
});
