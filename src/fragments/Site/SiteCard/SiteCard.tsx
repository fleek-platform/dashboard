import { routes } from '@fleek-platform/utils-routes';

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
  LinkBox,
  Skeleton,
  Text,
} from '@/ui';
import { AvatarMarble } from '@/ui/AvatarMarble/AvatarMarble';
import { cn } from '@/utils/cn';
import { getDurationUntilNow } from '@/utils/getDurationUntilNow';

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
    <LinkBox
      href={routes.project.site.overview({ projectId, siteId: id })}
      className="p-0 gap-0"
    >
      <SiteImage src={deployment?.previewImageUrl} />
      <Box className="py-3 px-4 gap-3">
        <Box className="flex-row justify-between gap-4">
          <Box className="overflow-hidden">
            <Text variant="primary" weight={700}>
              {name}
            </Text>
            <Text
              className={cn('truncate', { 'text-warning-11': !deployment })}
            >
              {siteLink || <Skeleton />}
            </Text>
          </Box>
          <Box>
            {avatar ? (
              <Image
                src={avatar}
                alt="site logo"
                className="rounded-sm size-6"
              />
            ) : (
              <AvatarMarble name={id} className="rounded-sm size-6" />
            )}
          </Box>
        </Box>
        <Box className="flex-row gap-1 items-center">
          <Text size="xs">{footerText}</Text>
          <Avatar
            icon={getUploadIcon(sourceProvider)}
            className="text-2xs"
            enableIcon
          />
        </Box>
      </Box>
    </LinkBox>
  );
};

const SiteSkeleton: React.FC = () => (
  <Box variant="container" className="p-0 gap-0">
    <SiteImage isLoading />
    <Box className="py-3 px-4 gap-5">
      <Box className="flex-row justify-between gap-4">
        <Box className="flex-1 gap-2 h-[40px]">
          <Skeleton variant="text" className="w-1/2 h-3" />
          <Skeleton variant="text" className="w-[80%] h-3" />
        </Box>
        <Skeleton variant="avatar" className="rounded-sm size-6 shrink-0" />
      </Box>
      <Skeleton variant="text" className="w-1/4 h-3" />
    </Box>
  </Box>
);

type SiteImageProps = {
  src?: Deployment['previewImageUrl'];
  isLoading?: SiteCardProps['isLoading'];
};

const SiteImage: React.FC<SiteImageProps> = ({ src, isLoading }) => {
  return (
    <Image
      src={src || ''}
      alt="Site image"
      className="flex-1 max-h-[6.125rem] object-cover object-top aspect-[4.4083_/_1.225] p-0 bg-neutral-3"
    >
      {isLoading ? (
        <Skeleton variant="text" className="w-full h-full rounded-b-none" />
      ) : (
        <Box className="gap-1">
          <Icon name="image" />
          <Text size="xs">No preview available</Text>
        </Box>
      )}
    </Image>
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
