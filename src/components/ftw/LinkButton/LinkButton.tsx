import { VariantProps } from 'class-variance-authority';
import React, { ComponentProps, forwardRef } from 'react';

import { ChildrenProps } from '@/types/Props';
import { buttonVariants, Icon, IconName, Text } from '@/ui';
import { cn } from '@/utils/cn';

import { ExternalLink } from '../ExternalLink/ExternalLink';
import { Link } from '../Link/Link';

export type LinkButtonProps = ChildrenProps &
  Omit<ComponentProps<typeof Link>, 'variant'> &
  VariantProps<typeof buttonVariants> & {
    disabled?: boolean;
    isExternalLink?: boolean;
    iconLeft?: IconName;
    iconRight?: IconName;
  };

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      children,
      variant,
      intent,
      size,
      className,
      disabled,
      isExternalLink,
      iconLeft,
      iconRight,
      ...props
    },
    ref,
  ) => {
    const content = (
      <>
        {iconLeft && <Icon name={iconLeft} />}
        {children}
        {iconRight && <Icon name={iconRight} />}
      </>
    );

    if (disabled) {
      return (
        <Text
          className={cn(
            buttonVariants({ intent: 'ghost', size }),
            'cursor-not-allowed opacity-50 hover:bg-transparent active:bg-transparent',
            className,
          )}
        >
          {content}
        </Text>
      );
    }

    const classNames = cn(buttonVariants({ variant, intent, size }), className);

    if (isExternalLink) {
      return (
        <ExternalLink {...props} ref={ref} className={classNames}>
          {content}
        </ExternalLink>
      );
    }

    return (
      <Link {...props} ref={ref} className={classNames}>
        {content}
      </Link>
    );
  },
);
