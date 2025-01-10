import { forwardRef } from 'react';

import { DisabledProps } from '@/types/Props';
import { Box, Icon, IconName, LinkBox, Text } from '@/ui';
import { cn } from '@/utils/cn';

type ActionBoxProps = DisabledProps<
  {
    title: string;
    description: string;
    icon: IconName;
    isRestricted?: boolean;
  } & React.ComponentPropsWithRef<typeof LinkBox>
>;

export const ActionBox = forwardRef<HTMLAnchorElement, ActionBoxProps>(
  (
    {
      title,
      description,
      icon,
      isDisabled,
      isRestricted = false,
      isExternalLink = false,
      className,
      ...props
    },
    ref,
  ) => {
    if (isDisabled || isRestricted) {
      props.href = '#';
    }

    return (
      <LinkBox
        {...props}
        ref={ref}
        href={props.href}
        isExternalLink={isExternalLink}
        isDisabled={isDisabled}
        className={cn('w-full', className)}
      >
        <Box className="flex-row gap-4 items-center">
          <Icon name={icon} className="text-2xl text-neutral-11" />
          <Box className="gap-2">
            <Text variant="primary" size="md" weight={700}>
              {title}
            </Text>
            <Text>{description}</Text>
          </Box>
          <Icon
            name="arrow-right"
            className="ml-auto self-start text-neutral-11"
          />
        </Box>
      </LinkBox>
    );
  },
);
