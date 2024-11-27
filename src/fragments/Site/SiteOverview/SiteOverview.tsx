import { useMemo } from 'react';
import { UseQueryState } from 'urql';

import { BadgeText, PreviewImage, SiteOverviewBox } from '@/components';
import { useRouter } from '@/hooks/useRouter';
import { useSiteLink } from '@/hooks/useSiteLink';
import { DeploymentStatus } from '@/types/Deployment';
import { Site } from '@/types/Site';
import { Icon, Text } from '@/ui';
import { statusDataMap } from '@/utils/deployUtils';
import { getDurationUntilNow } from '@/utils/getDurationUntilNow';
import { getLinkForRepository } from '@/utils/getLinkForRepository';
import { getSiteCurrentDeployment } from '@/utils/getSiteCurrentDeployment';
import { isSiteSelfManaged } from '@/utils/isSiteSelfManaged';
import { parseAPIDeploymentStatus } from '@/utils/parseAPIDeploymentStatus';
import { parseAPISourceProvider } from '@/utils/parseAPISourceProvider';

type SiteOverviewProps = {
  siteQuery: UseQueryState<{ site: Site }, { where: { id: string } }>;
};

export const SiteOverview: React.FC<SiteOverviewProps> = ({ siteQuery }) => {
  const router = useRouter();
  const siteId = router.query.siteId as string;
  const projectId = router.query.projectId as string;

  const siteLink = useSiteLink({ siteId, noHttps: true });

  const site = siteQuery.data?.site;

  // Determine if the site is self-managed
  const isSelfManaged = isSiteSelfManaged(site);
  const currentDeployment = getSiteCurrentDeployment(site);

  const parsedStatus = useMemo<DeploymentStatus>(() => {
    if (!isSelfManaged && !currentDeployment) {
      return 'loading';
    }

    return parseAPIDeploymentStatus(currentDeployment?.status);
  }, [isSelfManaged, currentDeployment]);

  // Calculate time elapsed since deployment
  const timeElapsed =
    currentDeployment &&
    getDurationUntilNow({
      isoDateString: currentDeployment.createdAt,
      shortFormat: true,
    });

  // Handle loading state
  if (siteQuery.fetching) {
    return <SiteOverviewBox.SkeletonOverview />;
  }

  // Handle error state
  if (siteQuery.error) {
    return <SiteOverviewBox.SkeletonOverview />;
  }

  // Handle absence of site data
  if (!site) {
    return <SiteOverviewBox.SkeletonOverview />;
  }

  // Extract repository details
  const repositoryOwner = site.sourceRepositoryOwner;
  const provider = parseAPISourceProvider(site.sourceProvider);
  const repositoryName = site.sourceRepositoryName;

  // Generate repository link
  const visitRepoSource =
    provider && repositoryOwner && repositoryName
      ? getLinkForRepository({
          provider,
          slug: repositoryOwner,
          name: repositoryName,
        })
      : undefined;

  // Parse deployment status
  const statusData = statusDataMap[parsedStatus];

  return (
    <SiteOverviewBox.Container>
      <PreviewImage
        status={statusData.imageStatus}
        text={statusData.imageText}
        src={currentDeployment?.previewImageUrl || ''}
      />
      <SiteOverviewBox.DetailsContainer>
        {/* Status Row */}
        <SiteOverviewBox.StatusRow>
          <BadgeText colorScheme={statusData.color} className="font-medium">
            <Icon name={statusData.icon} animated={statusData.animation} />
            {statusData.label}
          </BadgeText>
          <SiteOverviewBox.ElapsedTime>
            {(parsedStatus === 'loading' || parsedStatus === 'created') && (
              <Icon name="gear" animated="spin" />
            )}
            {timeElapsed}
          </SiteOverviewBox.ElapsedTime>
        </SiteOverviewBox.StatusRow>

        {/* Site Name */}
        <Text as="h2" variant="primary" size="2xl" weight={700}>
          {site.name}
        </Text>

        {/* Site Source Details */}
        <SiteOverviewBox.SiteSourceDetail
          siteName={site.name}
          isSelfManaged={isSelfManaged}
          visitRepoSource={visitRepoSource}
          repositoryName={repositoryName}
          repositoryOwner={repositoryOwner}
        />

        {/* Domain Information */}
        <SiteOverviewBox.Domain
          projectId={projectId}
          siteId={siteId}
          siteLink={siteLink}
          isDisabled={!Boolean(currentDeployment)}
        />

        {/* IPFS View */}
        <SiteOverviewBox.ViewOnIPFS cid={currentDeployment?.cid} />
      </SiteOverviewBox.DetailsContainer>
    </SiteOverviewBox.Container>
  );
};
