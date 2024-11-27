import { routes } from '@fleek-platform/utils-routes';

import { Link } from '@/components';
import { SourceProvider } from '@/generated/graphqlClient';
import { Deployment } from '@/types/Deployment';
import { LoadingProps } from '@/types/Props';
import { Site } from '@/types/Site';
import {
  Avatar,
  Box,
  Icon,
  IconName,
  Image,
  ImageProps,
  Skeleton,
  Text,
} from '@/ui';
import { AvatarMarble } from '@/ui/AvatarMarble/AvatarMarble';
import { cn } from '@/utils/cn';
import { getDurationUntilNow } from '@/utils/getDurationUntilNow';

import { SiteCardStyles as S } from './SiteCard.styles';

export type SiteCardProps = LoadingProps<{
  id: string;
  name: string;
  projectId: string;
  avatar?: ImageProps['src'];
  siteLink?: string;
  sourceProvider?: Deployment['sourceProvider'];
  deployment?: Site['currentDeployment'];
}>;

export const SiteCard: React.FC<SiteCardProps> = ({
  id,
  name,
  avatar,
  projectId,
  siteLink,
  isLoading,
  deployment,
  sourceProvider,
}) => {
  if (isLoading) {
    return <SiteSkeleton />;
  }

  const footerText = deployment
    ? getDurationUntilNow({
        isoDateString: deployment.createdAt,
        shortFormat: true,
      })
    : 'No deployments yet';

  return (
    <S.Container>
      <Link href={routes.project.site.overview({ projectId, siteId: id })}>
        <SiteImage src={deployment?.previewImageUrl} />
        <S.Details>
          <S.DetailsRow>
            <S.TextContainer>
              <Text
                variant="primary"
                weight={700}
                size="md"
              >
                {name}
              </Text>
              <Text
                className={cn('truncate', { 'text-warning-11': !deployment })}
              >
                {siteLink || <Skeleton />}
              </Text>
            </S.TextContainer>
            <S.SiteIconWrapper>
              {avatar ? (
                <Image src={avatar} alt="site logo" />
              ) : (
                <AvatarMarble name={id} rounded={false} />
              )}
            </S.SiteIconWrapper>
          </S.DetailsRow>
          <S.DetailsFooter>
            <Text size="xs">{footerText}</Text>
            <Avatar icon={getUploadIcon(sourceProvider)} enableIcon />
          </S.DetailsFooter>
        </S.Details>
      </Link>
    </S.Container>
  );
};

const SiteSkeleton: React.FC = () => (
  <S.Container isLoading>
    <SiteImage isLoading />
    <S.Details>
      <S.DetailsRow>
        <Box>
          <S.SiteName>
            <Skeleton />
          </S.SiteName>
          <S.SiteUrl>
            <Skeleton />
          </S.SiteUrl>
        </Box>
        <S.SiteIconWrapper isLoading>
          <Skeleton />
        </S.SiteIconWrapper>
      </S.DetailsRow>
      <S.DetailsFooter>
        <Skeleton />
      </S.DetailsFooter>
    </S.Details>
  </S.Container>
);

type SiteImageProps = {
  src?: Deployment['previewImageUrl'];
  isLoading?: SiteCardProps['isLoading'];
};

const SiteImage: React.FC<SiteImageProps> = ({ src, isLoading }) => {
  return (
    <S.Image src={src || ''}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <Icon name="image" />
          <Text>No preview available</Text>
        </>
      )}
    </S.Image>
  );
};

const getUploadIcon = (
  sourceProvider: Deployment['sourceProvider'],
): IconName => {
  switch (sourceProvider) {
    case SourceProvider.GITHUB:
      return 'github';
    default:
      return 'cloud-upload'; // default icon
  }
};
