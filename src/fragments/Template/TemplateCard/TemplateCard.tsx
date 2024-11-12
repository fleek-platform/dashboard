import { routes } from '@fleek-platform/utils-routes';

import { forwardStyledRef } from '@/theme';
import { LoadingProps } from '@/types/Props';
import { Templates } from '@/types/Template';
import { Avatar, Card, Icon, Skeleton, Text } from '@/ui';

import { TemplateCardStyles as S } from './TemplateCard.styles';

export type TemplateCardProps = LoadingProps<{ template: Templates[0] }>;

export const TemplateCard = forwardStyledRef<
  HTMLAnchorElement,
  TemplateCardProps
>(Card.Root, ({ isLoading, template, ...props }, ref) => {
  if (isLoading) {
    return <TemplateCardSkeleton />;
  }

  return (
    <S.RootLink
      {...props}
      ref={ref}
      href={routes.template.indexed({ templateId: template.id! })}
    >
      <S.Root>
        <S.Cover src={template.banner} />
        <S.ContentWrapper>
          <S.HeadingContainer>
            <Card.Content.Row>
              <Text as="h3" variant="primary" size="md" weight={700}>
                {template.name}
              </Text>
              <S.Icon src={template.framework?.avatar}>
                <Icon name="gear" />
              </S.Icon>
            </Card.Content.Row>
            <Text className="line-clamp-2 break-words">
              {template.description}
            </Text>
          </S.HeadingContainer>
          <Card.Content.Row>
            <S.Footer>
              Added by
              <AuthorAvatar creator={template.creator!} />
            </S.Footer>
          </Card.Content.Row>
        </S.ContentWrapper>
      </S.Root>
    </S.RootLink>
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
    <S.AuthorLabel fleek={isFleekAuthored}>
      <Avatar
        enableIcon
        icon={isFleekAuthored ? 'fleek' : 'person'}
        src={creator.avatar}
      />
      <Text variant="primary" size="xs">
        {isFleekAuthored ? 'Fleek' : creator.username}
      </Text>
    </S.AuthorLabel>
  );
};

const TemplateCardSkeleton: React.FC = () => (
  <S.Root>
    <S.Cover>
      <Skeleton />
    </S.Cover>
    <S.ContentWrapper>
      <S.HeadingContainer>
        <Card.Content.Row>
          <S.HeadingSkeleton>
            <Skeleton />
          </S.HeadingSkeleton>
          <S.Icon isLoading>
            <Skeleton />
          </S.Icon>
        </Card.Content.Row>
        <S.DescriptionSkeleton>
          <Skeleton />
          <Skeleton />
        </S.DescriptionSkeleton>
      </S.HeadingContainer>
      <Card.Content.Row>
        <S.Footer>
          <Skeleton />
          <Skeleton />
        </S.Footer>
      </Card.Content.Row>
    </S.ContentWrapper>
  </S.Root>
);
