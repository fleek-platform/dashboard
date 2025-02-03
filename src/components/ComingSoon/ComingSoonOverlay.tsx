import { ChildrenProps, LoadingProps } from '@/types/Props';
import { Box, Text } from '@/ui';
import { cn } from '@/utils/cn';

export type ComingSoonOverlayProps = ChildrenProps<
  LoadingProps<{ title?: string; description: string; className?: string }>
>;

export const ComingSoonOverlay: React.FC<ComingSoonOverlayProps> = ({
  children,
  isLoading,
  title = 'Coming Soon',
  description,
  className,
}) => {
  if (isLoading) {
    return <>{children}</>;
  }

  return (
    <Box
      onClick={(event) => event.stopPropagation()}
      className={cn('relative block', className)}
    >
      {children}
      <Box className="text-center justify-center items-center py-6 px-5 gap-1 absolute top-0 left-0 h-full w-full rounded-lg bg-gradient-to-b from-transparent to-monochrome-normal border border-neutral-6">
        <Text as="h2" variant="primary" size="md" weight={700}>
          {title}
        </Text>
        <Text className="max-w-[13rem]">{description}</Text>
      </Box>
    </Box>
  );
};
