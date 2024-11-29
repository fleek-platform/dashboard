import { routes } from '@fleek-platform/utils-routes';

import { ExternalLink, Link } from '@/components';
import { constants } from '@/constants';
import type { DisabledProps, LoadingProps } from '@/types/Props';
import { Box, Icon, type IconName, Menu, Skeleton, Text } from '@/ui';
import { getLinkForDomain } from '@/utils/getLinkForDomain';
import {
  getLinkForIPFSGateway,
  type GetLinkForIPFSGatewayArgs,
  getSubDomainResolutionIpfsGatewayUrl,
} from '@/utils/getLinkForIPFSGateway';
import {
  getLinkForSiteSlug,
  getLinkPartsForSiteSlug,
} from '@/utils/siteSlugLinks';

import { BadgeText } from '../BadgeText/BadgeText';
import { PreviewImage } from '../PreviewImage/PreviewImage';
import { SiteOverviewBoxStyles as S } from './SiteOverviewBox.styles';

const SiteDetail: React.FC<SiteOverviewBox.SiteDetailProps> = ({
  isLoading,
  avatarName,
  title,
  subtitle,
  badgeText,
  iconVariant,
  href = '#',
  localLink,
  isDisabled = false,
  ...props
}) => {
  if (isLoading) {
    return <SiteDetailSkeleton />;
  }

  const Container: React.ElementType = localLink ? Link : ExternalLink;

  return (
    <Container
      variant="neutral"
      href={!isDisabled && href ? href : '#'}
      disabled={isDisabled}
      className="flex gap-2.5"
      {...props}
    >
      <S.SiteDetail.IconContainer variant={iconVariant}>
        <Icon name={avatarName} />
      </S.SiteDetail.IconContainer>
      <Text size="md" variant="primary">
        {title} {subtitle && `/ ${subtitle}`}
      </Text>
      {badgeText && <BadgeText colorScheme="slate">{badgeText}</BadgeText>}
    </Container>
  );
};

const SkeletonOverview: React.FC = () => (
  <S.Container>
    <PreviewImage isLoading />
    <S.DetailsContainer>
      <S.StatusRow>
        <BadgeText colorScheme="slate">
          <Skeleton />
        </BadgeText>
      </S.StatusRow>
      <Skeleton />
      <SiteDetail href="#" isLoading />
      <SiteDetail href="#" isLoading />
      <SiteDetail href="#" isLoading />
    </S.DetailsContainer>
  </S.Container>
);

const SiteDetailSkeleton: React.FC = () => (
  <Box className="flex-row gap-2.5 items-center">
    <Skeleton variant="avatar" className="size-[23px]" />
    <Skeleton className="w-1/2 h-4" />
  </Box>
);

const Domain: React.FC<SiteOverviewBox.DomainProps> = ({
  projectId,
  siteId,
  siteLink,
  previewURL,
  isPreview = false,
  isDisabled,
}) => {
  if (previewURL && isPreview) {
    return (
      <SiteDetail
        avatarName="domain"
        iconVariant="web"
        title={
          isDisabled
            ? 'URL Pending'
            : getLinkPartsForSiteSlug({ slug: previewURL }).getLinkNoHttps()
        }
        href={getLinkForSiteSlug(previewURL)}
        isDisabled={isDisabled}
      />
    );
  }

  if (siteLink) {
    return (
      <SiteDetail
        avatarName="domain"
        iconVariant="web"
        title={isDisabled ? 'URL Pending' : siteLink}
        href={getLinkForDomain(siteLink)}
        isDisabled={isDisabled}
      />
    );
  }

  // we can consider to remove the props and just get them here
  return (
    <SiteDetail
      avatarName="domain"
      iconVariant="web"
      title="Add custom domain"
      href={routes.project.site.settings.domains({ projectId, siteId })}
      localLink
      isDisabled={isDisabled}
    />
  );
};

const GitCommit: React.FC<SiteOverviewBox.GitCommitProps> = ({ message }) => (
  <SiteDetail
    href="#"
    avatarName="git-commit"
    iconVariant="web"
    title={message}
  />
);

const SiteSourceDetail: React.FC<SiteOverviewBox.SiteSourceDetail> = ({
  repositoryName,
  repositoryOwner,
  isSelfManaged,
  visitRepoSource = '#',
  siteName,
}) => {
  if (repositoryName && repositoryOwner && !isSelfManaged) {
    return (
      <SiteDetail
        avatarName="github"
        iconVariant="gitProvider"
        title={repositoryOwner}
        subtitle={repositoryName}
        href={visitRepoSource}
      />
    );
  }

  return (
    <SiteDetail
      avatarName="cloud-upload"
      iconVariant="web"
      title={siteName}
      href={visitRepoSource}
    />
  );
};

const ViewOnIPFS: React.FC<SiteOverviewBox.ViewOnIPFSProps> = ({
  cid,
  isDisabled,
}) => {
  if (!cid || isDisabled) {
    return (
      <SiteDetail
        avatarName="ipfs-colored"
        iconVariant="ipfs"
        title="IPFS Hash Pending"
        href="#"
        isDisabled
      />
    );
  }

  return (
    <Menu.Root>
      <Menu.Trigger>
        <SiteOverviewBox.SiteDetail
          href="#"
          avatarName="ipfs-colored"
          iconVariant="ipfs"
          title="View on IPFS"
        />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content align="start">
          {publicGateways.map(({ baseURL, name, urlResolution }) => (
            <ExternalLink href={urlResolution({ cid, baseURL })} key={name}>
              <Menu.Item>
                View on {name}
                <Icon name="external-link" />
              </Menu.Item>
            </ExternalLink>
          ))}
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
};

export const SiteOverviewBox = {
  Container: S.Container,
  Domain,
  GitCommit,
  DetailsContainer: S.DetailsContainer,
  StatusRow: S.StatusRow,
  ElapsedTime: S.ElapsedTime,
  SiteDetail,
  SiteSourceDetail,
  SkeletonOverview,
  ViewOnIPFS,
};

export namespace SiteOverviewBox {
  export type ContainerProps = React.ComponentPropsWithRef<typeof S.Container>;
  export type DetailsContainerProps = React.ComponentPropsWithRef<
    typeof S.DetailsContainer
  >;
  export type StatusRowProps = React.ComponentPropsWithRef<typeof S.StatusRow>;
  export type ElapsedTimeProps = React.ComponentPropsWithRef<
    typeof S.ElapsedTime
  >;
  export type SiteDetailProps = LoadingProps<
    DisabledProps<{
      avatarName: IconName;
      title: string;
      subtitle?: string;
      iconVariant: React.ComponentProps<
        typeof S.SiteDetail.IconContainer
      >['variant'];
      badgeText?: string;
      localLink?: boolean;
    }>
  > &
    Omit<
      React.ComponentPropsWithRef<typeof ExternalLink | typeof Link>,
      'disabled'
    >;
  export type DomainProps = DisabledProps<{
    siteId: string;
    projectId: string;
    siteLink: string | undefined;
    previewURL?: string;
    isPreview?: boolean;
  }>;
  export type GitCommitProps = {
    message: string;
  };
  export type SiteSourceDetail = {
    siteName: string;
    isSelfManaged?: boolean;
    visitRepoSource?: string;
    repositoryName?: string | null;
    repositoryOwner?: string | null;
  };
  export type ViewOnIPFSProps = DisabledProps<{
    cid?: string | null;
  }>;
}

type PublicGateway = {
  baseURL: string;
  name: string;
  urlResolution: (input: GetLinkForIPFSGatewayArgs) => string;
};

const publicGateways: PublicGateway[] = [
  {
    name: 'flk-ipfs.xyz',
    baseURL: constants.IPFS_GATEWAYS.FLEEK_GW,
    urlResolution: getLinkForIPFSGateway,
  },
  {
    name: 'ipfs.io',
    baseURL: constants.IPFS_GATEWAYS.IPFS_IO,
    urlResolution: getLinkForIPFSGateway,
  },
  {
    name: 'dweb.link',
    baseURL: constants.IPFS_GATEWAYS.DWEB_LINK,
    urlResolution: getSubDomainResolutionIpfsGatewayUrl,
  },
  {
    name: 'fleek.cool',
    baseURL: constants.IPFS_GATEWAYS.FLEEK_COOL,
    urlResolution: getSubDomainResolutionIpfsGatewayUrl,
  },
];
