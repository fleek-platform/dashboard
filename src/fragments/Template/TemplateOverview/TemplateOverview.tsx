import { ExternalLink } from '@/components';
import { useTemplateGitData } from '@/hooks/useTemplateGitData';
import { LoadingProps } from '@/types/Props';
import { Template } from '@/types/Template';
import { Avatar, Box, Icon, Image, Skeleton, Text } from '@/ui';
import { getLinkForRepository } from '@/utils/getLinkForRepository';
import { getLinkForSiteSlug } from '@/utils/siteSlugLinks';

import { TemplateOverviewStyles as S } from './TemplateOverview.styles';

export type TemplateOverviewProps = LoadingProps<{ template: Template }>;

export const TemplateOverview: React.FC<TemplateOverviewProps> = ({
  isLoading,
  template,
}) => {
  if (isLoading) {
    return <TemplateOverviewSkeleton />;
  }

  return (
    <Box className="[grid-area:overview] overflow-hidden w-full">
      <S.ImagePreview src={template.banner} alt="Template preview" />
      <S.Wrapper>
        <S.Header>
          <S.TitleRow>
            <Text as="h1" variant="primary" size="2xl" weight={700}>
              {template.name}
            </Text>
            <Image src={template.framework?.avatar} alt="Template logo">
              <Icon name="gear" />
            </Image>
          </S.TitleRow>
        </S.Header>
        <TemplateProperties template={template} />
      </S.Wrapper>
    </Box>
  );
};

const TemplateOverviewSkeleton: React.FC = () => (
  <S.Container>
    <S.ImagePreview alt="Template preview">
      <Skeleton />
    </S.ImagePreview>
    <S.Wrapper>
      <S.Header>
        <S.TitleRow>
          <S.TitleSkeleton>
            <Skeleton />
          </S.TitleSkeleton>
          <Skeleton />
        </S.TitleRow>
      </S.Header>
      <TemplateProperties isLoading />
    </S.Wrapper>
  </S.Container>
);

type TemplatePropertiesProps = LoadingProps<{ template: Template }>;

const TemplateProperties: React.FC<TemplatePropertiesProps> = ({
  isLoading,
  template,
}) => {
  const templateData = useTemplateGitData(template);

  if (isLoading) {
    return (
      <S.Property.Container>
        <S.Property.Item>
          <S.Property.Skeleton variant="avatar" />
          <S.Property.Skeleton variant="line" />
        </S.Property.Item>
        <S.Property.Item>
          <S.Property.Skeleton variant="avatar" />
          <S.Property.Skeleton variant="line" />
        </S.Property.Item>
        <S.Property.Item>
          <S.Property.Skeleton variant="avatar" />
          <S.Property.Skeleton variant="line" />
        </S.Property.Item>
      </S.Property.Container>
    );
  }

  const link = getLinkForRepository({
    provider: templateData.provider!,
    name: templateData.repository!,
    slug: templateData.slug!,
  });

  return (
    <S.Property.Container>
      <ExternalLink href={link}>
        <S.Property.Item variant="monochrome">
          <Avatar enableIcon icon="github" />
          {templateData.slug} / {templateData.repository}
        </S.Property.Item>
      </ExternalLink>
      <AuthorAvatar creator={template.creator!} />

      <DemoProperty siteSlug={template.siteSlug} />
    </S.Property.Container>
  );
};

type DemoPropertyProps = {
  siteSlug: string;
};

const DemoProperty: React.FC<DemoPropertyProps> = ({ siteSlug }) => {
  return (
    <ExternalLink href={getLinkForSiteSlug(siteSlug)}>
      <S.Property.Item>
        <Avatar enableIcon icon="arrow-up-right" />
        View Demo
      </S.Property.Item>
    </ExternalLink>
  );
};

type AuthorAvatarProps = {
  creator: NonNullable<Template['creator']>;
};

const AuthorAvatar: React.FC<AuthorAvatarProps> = ({
  creator = {} as AuthorAvatarProps['creator'],
}) => {
  const isFleekAuthored =
    creator.username === 'fleekxyz' || creator.username === 'fleek-platform';

  return (
    <S.Property.Item variant="monochrome">
      <Avatar
        enableIcon
        icon={isFleekAuthored ? 'fleek' : 'person'}
        src={creator.avatar}
      />
      <span>Added by&nbsp;</span> {isFleekAuthored ? 'Fleek' : creator.username}
    </S.Property.Item>
  );
};
