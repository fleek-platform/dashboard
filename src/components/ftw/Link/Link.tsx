/* eslint-disable no-restricted-imports */
import { cva, type VariantProps } from 'class-variance-authority';
import NextLink from 'next/link';
import React, { type ComponentProps, forwardRef } from 'react';

import type { ChildrenProps } from '@/types/Props';
import { cn } from '@/utils/cn';

export const linkVariants = cva('transition-colors', {
  variants: {
    variant: {
      neutral: 'text-neutral-11',
      accent: 'text-accent-11',
      success: 'text-success-11',
      warning: 'text-warning-11',
      danger: 'text-danger-11',
    },
  },
  defaultVariants: {
    variant: 'neutral',
  },
});

export type LinkProps = ChildrenProps &
  ComponentProps<typeof NextLink> &
  VariantProps<typeof linkVariants>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant, children, className, ...props }, ref) => {
    return (
      <NextLink
        {...props}
        ref={ref}
        className={cn(linkVariants({ variant }), className)}
      >
        {children}
      </NextLink>
    );
  },
);
