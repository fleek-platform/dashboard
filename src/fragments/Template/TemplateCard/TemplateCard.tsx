import { forwardStyledRef } from '@/theme';
import type { LoadingProps } from '@/types/Props';
import { TemplateCardPart } from '@/types/Template';
import { Avatar, Box, Card, Icon, Image, LinkBox, Skeleton, Text } from '@/ui';
import { cn } from '@/utils/cn';
import { FLEEK_TEMPLATES_URLS } from '@/utils/template';
import { joinUrl } from '@/utils/url';

export type TemplateCardProps = LoadingProps<{
  template: TemplateCardPart;
}>;

const { websiteUrl, templatesUrl } = FLEEK_TEMPLATES_URLS;

export const TemplateCard = forwardStyledRef<
  HTMLAnchorElement,
  TemplateCardProps
>(Card.Root, ({ isLoading, template, ...props }, ref) => {
  if (isLoading) {
    return <TemplateCardSkeleton />;
  }

  // link from dashboard (https://app.fleek.xyz/) to website (https://fleek.xyz/), by slug, not by id
  const templateUrl = joinUrl(templatesUrl, template.siteSlug);

  const templateBanner = joinUrl(websiteUrl, template.banner, true);
  const frameworkAvatar = joinUrl(websiteUrl, template.framework?.avatar, true);

  return (
    <LinkBox
      {...props}
      ref={ref}
      href={templateUrl}
      className="p-0 gap-0 bg-transparent"
    >
      <Card.Cover
        src={templateBanner}
        className="aspect-[16/9] max-h-[8rem] object-cover"
      />
      <Box className="p-4">
        <Box className="flex-row justify-between">
          <Text as="h3" variant="primary" size="md" weight={700}>
            {template.name}
          </Text>
          <Image
            src={frameworkAvatar}
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
  creator: TemplateCardPart['creator'];
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
        //
        enableIcon
        src={`${websiteUrl}${creator.avatar}`}
        icon={isFleekAuthored ? 'fleek' : 'person'}
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
