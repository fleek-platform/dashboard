import { routes } from '@fleek-platform/utils-routes';
import React from 'react';

import { ExternalLink, Link } from '@/components';
import { ChildrenProps, DisabledProps, LoadingProps } from '@/types/Props';
import { Box, Icon, IconName, Skeleton, Text } from '@/ui';
import { cn } from '@/utils/cn';
import { getLinkForDomain } from '@/utils/getLinkForDomain';
import {
  getLinkForSiteSlug,
  getLinkPartsForSiteSlug,
} from '@/utils/siteSlugLinks';

import { BadgeText } from '../BadgeText/BadgeText';
import { PreviewImage } from '../PreviewImage/PreviewImage';

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
      <IconContainer variant={iconVariant}>
        <Icon name={avatarName} className="text-xs" />
      </IconContainer>
      <Text size="md" variant="primary">
        {title} {subtitle && `/ ${subtitle}`}
      </Text>
      {badgeText && <BadgeText colorScheme="slate">{badgeText}</BadgeText>}
    </Container>
  );
};

type IconContainerProps = ChildrenProps<{
  variant: 'gitProvider' | 'web' | 'loading';
}>;

const IconContainer: React.FC<IconContainerProps> = ({ children, variant }) => (
  <Box
    className={cn('h-fit p-1 w-auto rounded-full', {
      'p-0': variant === 'loading',
      'bg-monochrome-reverse text-monochrome-normal': variant === 'gitProvider',
      'bg-neutral-5': variant === 'web',
    })}
  >
    {children}
  </Box>
);

const SkeletonOverview: React.FC = () => (
  <Container>
    <PreviewImage isLoading />
    <DetailsContainer>
      <StatusRow>
        <BadgeText colorScheme="slate">
          <Skeleton className="w-9 h-3 my-[0.125rem]" />
        </BadgeText>
      </StatusRow>
      <Skeleton className="w-[40%] h-[1.625rem]" />
      <SiteDetail href="#" isLoading />
      <SiteDetail href="#" isLoading />
      <SiteDetail href="#" isLoading />
    </DetailsContainer>
  </Container>
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
    title={message || 'Pending'}
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

const Container: React.FC<ChildrenProps> = ({ children }) => (
  <Box
    variant="container"
    className="flex-row items-center justify-between flex-wrap gap-6 bg-surface-content"
  >
    {children}
  </Box>
);

const DetailsContainer: React.FC<ChildrenProps> = ({ children }) => (
  <Box className="flex-1 gap-5">{children}</Box>
);

const StatusRow: React.FC<ChildrenProps> = ({ children }) => (
  <Box className="flex-row justify-between text-xs">{children}</Box>
);

const ElapsedTime: React.FC<ChildrenProps> = ({ children }) => (
  <Box className="flex-row items-center gap-1 text-neutral-11">{children}</Box>
);

const ProviderWrapper: React.FC<ChildrenProps> = ({ children }) => (
  <Box className="flex flex-row flex-wrap  gap-2.5  items-center">
    {children}
  </Box>
);

export const SiteOverviewBox = {
  Container,
  Domain,
  GitCommit,
  DetailsContainer,
  StatusRow,
  ElapsedTime,
  SiteDetail,
  SiteSourceDetail,
  SkeletonOverview,
  ProviderWrapper,
};

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SiteOverviewBox {
  export type SiteDetailProps = LoadingProps<
    DisabledProps<{
      avatarName: IconName;
      title: string;
      subtitle?: string;
      iconVariant: 'gitProvider' | 'web' | 'loading';
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
    message?: string | null;
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
