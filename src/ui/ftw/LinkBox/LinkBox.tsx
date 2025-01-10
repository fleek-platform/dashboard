import React from 'react';

import { ExternalLink, Link } from '@/components';
import { ChildrenProps } from '@/types/Props';
import { cn } from '@/utils/cn';

import { boxVariants } from '../Box/Box';

type LinkBoxProps =
  | (ChildrenProps &
      React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        isExternalLink: true;
        href: string;
        isDisabled?: boolean;
      })
  | (ChildrenProps &
      React.ComponentProps<typeof Link> & {
        isExternalLink?: false;
        href: string;
        isDisabled?: boolean;
      });

export const LinkBox = React.forwardRef<HTMLAnchorElement, LinkBoxProps>(
  ({ children, href, className, isExternalLink = false, isDisabled = false, ...props }, ref) => {
    const classNames = cn(
      boxVariants({ variant: 'container' }),
      'hover:border-neutral-8 transition-colors',
      { 'pointer-events-none opacity-60': isDisabled },
      className
    );

    if (isExternalLink) {
      return (
        <ExternalLink ref={ref} href={href} className={classNames} {...props}>
          {children}
        </ExternalLink>
      );
    }

    return (
      <Link ref={ref} href={href} className={classNames} {...props}>
        {children}
      </Link>
    );
  }
);
