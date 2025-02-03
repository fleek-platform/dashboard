import { routes } from '@fleek-platform/utils-routes';

import { forwardStyledRef } from '@/theme';
import { LoadingProps } from '@/types/Props';
import { Templates } from '@/types/Template';
import { Avatar, Box, Card, Icon, Image, LinkBox, Skeleton, Text } from '@/ui';
import { cn } from '@/utils/cn';

export type TemplateCardProps = LoadingProps<{ template: Templates[0] }>;

export const TemplateCard = forwardStyledRef<
  HTMLAnchorElement,
  TemplateCardProps
>(Card.Root, ({ isLoading, template, ...props }, ref) => {
  if (isLoading) {
    return <TemplateCardSkeleton />;
  }

  return (
    <LinkBox
      {...props}
      ref={ref}
      href={routes.template.indexed({ templateId: template.id! })}
      className="p-0 gap-0 bg-transparent"
    >
      <Card.Cover
        src={template.banner}
        className="aspect-[16/9] max-h-[8rem] object-cover"
      />
      <Box className="p-4">
        <Box className="flex-row justify-between">
          <Text as="h3" variant="primary" size="md" weight={700}>
            {template.name}
          </Text>
          <Image
            src={template.framework?.avatar}
            alt={template.framework?.name}
            className="size-[1.75em] rounded bg-neutral-2"
          >
            <Icon name="gear" />
          </Image>
        </Box>
        <Text className="line-clamp-2 break-words">{template.description}</Text>
        <Box className="flex-row gap-2 items-center pt-4">
          <Text size="xs">Added by</Text>
          <AuthorAvatar creator={template.creator!} />
        </Box>
      </Box>
    </LinkBox>
  );
});

type AuthorAvatarProps = {
  creator: NonNullable<Templates[0]['creator']>;
};

const AuthorAvatar: React.FC<AuthorAvatarProps> = ({
  creator = {} as AuthorAvatarProps['creator'],
}) => {
  const isFleekAuthored =
    creator.username === 'fleekxyz' || creator.username === 'fleek-platform';

  return (
    <Box
      className={cn('flex-row gap-2 items-center', {
        'bg-monochrome-reverse': isFleekAuthored,
      })}
    >
      <Avatar
        enableIcon
        icon={isFleekAuthored ? 'fleek' : 'person'}
        src={creator.avatar}
        className="size-6"
      />
      <Text variant="primary" size="xs">
        {isFleekAuthored ? 'Fleek' : creator.username}
      </Text>
    </Box>
  );
};

const TemplateCardSkeleton: React.FC = () => (
  <Box variant="container" className="p-0 gap-0 bg-transparent">
    <Skeleton variant="button" className="h-[8rem] rounded-b-none" />
    <Box className="p-4 gap-3">
      <Box className="flex-row items-center justify-between">
        <Skeleton variant="text" className="w-1/2" />
        <Skeleton variant="avatar" className="rounded size-[1.75em]" />
      </Box>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </Box>
  </Box>
);
