import { routes } from '@fleek-platform/utils-routes';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

import { Link } from '@/components';
import { useSessionContext } from '@/providers/SessionProvider';
import { Box, BoxProps, Button, Icon, IconName, Text } from '@/ui';
import { cn } from '@/utils/cn';
import { withProps } from '@/utils/withProps';

const Title = withProps(Text, { as: 'h2', variant: 'primary', size: 'lg', weight: 700 });

type EmptyContentProps = BoxProps & { title: string; description: string; icon?: IconName; showIcon?: boolean };

const EmptyContent: React.FC<EmptyContentProps> = ({ title, description, className, icon = 'question', showIcon = true, ...props }) => (
  <Box className={cn('p-9 items-center gap-2.5', className)} {...props}>
    {showIcon && <Icon name={icon} className="text-neutral-11 text-lg" />}
    <Title>{title}</Title>
    <Text>{description}</Text>
  </Box>
);

type ContainerProps = BoxProps & {
  isBillingDisabled?: boolean;
  disabledText?: string;
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, isBillingDisabled = false, disabledText, className, ...props }, ref) => {
    const session = useSessionContext();

    if (isBillingDisabled) {
      return (
        <Box variant="container" className="relative">
          {children}
          <Box className="text-center gap-3 justify-center items-center absolute top-0 left-0 h-full w-full z-[2] bg-surface-content rounded-lg p-9">
            <Box className="gap-1">
              <Text variant="primary" weight={700}>
                Upgrade plan
              </Text>
              <Text>{disabledText}</Text>
            </Box>
            <Link href={routes.project.billing({ projectId: session.project.id })}>
              <Button size="sm" className="py-0 px-2-5 text-sm h-[2rem]">
                Upgrade plan
              </Button>
            </Link>
          </Box>
        </Box>
      );
    }

    return (
      <Box ref={ref} variant="container" className={className} {...props}>
        {children}
      </Box>
    );
  }
);

const Column = React.forwardRef<HTMLDivElement, BoxProps>(({ children, className, ...props }, ref) => {
  return (
    <Box ref={ref} className={cn('flex-1 gap-1', className)} {...props}>
      {children}
    </Box>
  );
});

const TitleRow = React.forwardRef<HTMLDivElement, BoxProps>(({ children, className, ...props }, ref) => {
  return (
    <Box ref={ref} className={cn('flex-row items-center gap-2 justify-between flex-wrap', className)} {...props}>
      {children}
    </Box>
  );
});

const ActionRow = React.forwardRef<HTMLDivElement, BoxProps>(({ children, className, ...props }, ref) => {
  return (
    <Box ref={ref} className={cn('flex-row items-center justify-between gap-4 flex-wrap w-full', className)} {...props}>
      {children}
    </Box>
  );
});

const FieldsRow = React.forwardRef<HTMLDivElement, BoxProps>(({ children, className, ...props }, ref) => {
  return (
    <Box ref={ref} className={cn('flex-row gap-2.5 items-start', className)} {...props}>
      {children}
    </Box>
  );
});

const settingsSkeletonVariants = cva('animate-pulse shrink-0 bg-neutral-5 rounded-sm', {
  variants: {
    variant: {
      title: 'w-full h-5',
      text: 'w-full h-4',
      avatar: 'h-[2em] rounded-full',
      button: 'w-[8rem] h-[2rem] rounded',
      message: 'w-[90%]',
      input: '',
      logo: 'min-w-[4rem] size-[4rem] rounded-lg',
      'logo-rounded': 'min-w-[4rem] size-[4rem] rounded-full',
    },
  },
});

type SkeletonProps = Omit<BoxProps, 'variant'> & VariantProps<typeof settingsSkeletonVariants>;

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({ variant, className, ...props }, ref) => {
  return <Box ref={ref} className={cn(settingsSkeletonVariants({ variant }), className)} {...props} />;
});

export const SettingsBox = {
  Container,
  Column,
  Title,
  TitleRow,
  Text,
  ActionRow,
  FieldsRow,
  Skeleton,
  EmptyContent,
};
