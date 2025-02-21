import { useEffect, useMemo } from 'react';

import { BadgeText, PreviewImage } from '@/components';
import { SiteOverviewBox } from '@/components';
import { DeployStatus } from '@/fragments/Site/Deployments/Deploy/DeployStatus';
import { useDeploymentQuery, useSiteQuery } from '@/generated/graphqlClient';
import { useDeploymentPoll } from '@/hooks/useDeploymentPoll';
import { useRouter } from '@/hooks/useRouter';
import { useSiteLink } from '@/hooks/useSiteLink';
import { ChildrenProps } from '@/types/Props';
import { Accordion, Box, Skeleton, Text } from '@/ui';
import { statusDataMap } from '@/utils/deployUtils';
import { getLinkForRepository } from '@/utils/getLinkForRepository';
import { getSiteCurrentDeployment } from '@/utils/getSiteCurrentDeployment';
import { isSiteSelfManaged } from '@/utils/isSiteSelfManaged';
import { parseAPIDeploymentStatus } from '@/utils/parseAPIDeploymentStatus';
import { parseAPISourceProvider } from '@/utils/parseAPISourceProvider';
import { shortStringFormat } from '@/utils/stringFormat';

import { AccordionHeaderContainer, DeploymentLogs } from './DeploymentLogs';

export const DeploymentOverview: React.FC = () => {
  const router = useRouter();

  const deploymentId = router.query.deploymentId!;
  const siteId = router.query.siteId!;
  const projectId = router.query.projectId!;

  const [deploymentQuery] = useDeploymentQuery({ variables: { where: { id: deploymentId } } });
  const [siteQuery] = useSiteQuery({ variables: { where: { id: siteId } } });

  const currentDeployment = getSiteCurrentDeployment(siteQuery.data?.site);
  const commitMessage = currentDeployment?.sourceMessage;
  const siteLink = useSiteLink({ siteId, noHttps: true });
  let deployment = deploymentQuery.data?.deployment;
  const site = siteQuery.data?.site;

  const [deploymentPoll, setEnabled] = useDeploymentPoll({
    deploymentId: deployment?.id,
    siteId,
  });

  if (deploymentPoll.data) {
    deployment = deploymentPoll.data;
  }

  const parsedStatus = parseAPIDeploymentStatus(deploymentQuery.data?.deployment.status);

  const disablePollingOnStatusList = ['cancelled', 'failed', 'success'];

  useEffect(() => {
    if (disablePollingOnStatusList.includes(parsedStatus)) {
      setEnabled(false);

      return;
    }

    setEnabled(true);
  }, [parsedStatus]);

  const repositoryOwner = deployment?.sourceRepositoryOwner;
  const provider = parseAPISourceProvider(deployment?.sourceProvider);
  const repositoryName = deployment?.sourceRepositoryName;

  const sourceLink = useMemo(() => {
    const { sourceRef } = deployment || {};

    if (provider && repositoryName && repositoryOwner && sourceRef) {
      return getLinkForRepository({
        provider,
        name: repositoryName,
        slug: repositoryOwner,
        sourceRef: sourceRef,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deployment]);

  if (deploymentQuery.fetching || siteQuery.fetching) {
    return (
      <>
        <SiteOverviewBox.SkeletonOverview />
        <AccordionSkeleton />
      </>
    );
  }

  const isMostRecentDeployment = currentDeployment?.id === deployment?.id;

  const isSelfManaged = isSiteSelfManaged(site);
  const statusData = statusDataMap[parsedStatus];

  if (!site || !deployment) {
    // TODO handle error, show error screen
    return null;
  }

  const isPreview = deployment?.previewOnly;

  const environment = isPreview ? 'Preview' : 'Production';

  return (
    <>
      <SiteOverviewBox.Container>
        <PreviewImage status={statusData.imageStatus} text={statusData.imageText} src={deployment?.previewImageUrl || ''} />
        <SiteOverviewBox.DetailsContainer>
          <SiteOverviewBox.StatusRow>
            <DeployStatus deployment={deployment} isMostRecentDeployment={isMostRecentDeployment} />
          </SiteOverviewBox.StatusRow>
          <Box>
            <Text as="h2" variant="primary" size="2xl" weight={700}>
              {shortStringFormat({ str: deployment.id, index: 6 })}
            </Text>
            <Text size="sm">{isSelfManaged ? 'Deployed from CLI' : environment}</Text>
          </Box>

          <SiteOverviewBox.ProviderWrapper>
            <SiteOverviewBox.SiteSourceDetail
              siteName={site.name}
              isSelfManaged={isSelfManaged}
              visitRepoSource={sourceLink}
              repositoryName={repositoryName || undefined}
              repositoryOwner={repositoryOwner || undefined}
            />
            {!isSelfManaged && <BadgeText colorScheme="slate">{`branch: ${deployment.sourceBranch || 'Not found'}`}</BadgeText>}
          </SiteOverviewBox.ProviderWrapper>

          {/* Commit message */}
          {!isSelfManaged && <SiteOverviewBox.GitCommit message={commitMessage} />}

          <SiteOverviewBox.Domain
            siteId={siteId}
            projectId={projectId}
            siteLink={siteLink}
            isDisabled={parsedStatus !== 'success'}
            isPreview={isPreview}
            previewURL={deployment.previewUrlSlug ?? undefined}
          />
        </SiteOverviewBox.DetailsContainer>
      </SiteOverviewBox.Container>

      <DeploymentLogs
        build={deployment.build}
        isSelfManaged={isSelfManaged ?? false}
        deploymentStatus={deploymentQuery.data?.deployment.status}
        status={parsedStatus}
        startedAt={deployment.startedAt}
      />
    </>
  );
};

const AccordionSkeleton: React.FC = () => (
  <Accordion.Root type="multiple" defaultValue={['logs']}>
    <Accordion.Item value="logs">
      <AccordionHeaderContainer>
        <HeaderSkeleton />
      </AccordionHeaderContainer>
      <AccordionHeaderContainer>
        <HeaderSkeleton />
      </AccordionHeaderContainer>
      <Accordion.Content className="max-h-[30rem] bg-monochrome-normal">
        <LogRowSkeleton>
          <TextRowSkeleton />
          <TextMessageSkeleton />
        </LogRowSkeleton>
        <LogRowSkeleton>
          <TextRowSkeleton />
          <TextMessageSkeleton />
        </LogRowSkeleton>
        <LogRowSkeleton>
          <TextRowSkeleton />
          <TextMessageSkeleton />
        </LogRowSkeleton>
        <LogRowSkeleton>
          <TextRowSkeleton />
          <TextMessageSkeleton />
        </LogRowSkeleton>
        <LogRowSkeleton>
          <TextRowSkeleton />
          <TextMessageSkeleton />
        </LogRowSkeleton>
        <LogRowSkeleton>
          <TextRowSkeleton />
          <TextMessageSkeleton />
        </LogRowSkeleton>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="breakdown">
      <AccordionHeaderContainer>
        <HeaderSkeleton />
      </AccordionHeaderContainer>
      <Accordion.Content>
        <HeaderSkeleton />
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="domains">
      <AccordionHeaderContainer>
        <HeaderSkeleton />
      </AccordionHeaderContainer>
      <Accordion.Content>
        <Skeleton />
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);

const HeaderSkeleton: React.FC = () => <Skeleton className="w-1/3 h-[1.15rem] my-[0.175rem]" />;

const TextRowSkeleton: React.FC = () => <Skeleton className="h-5 w-[15%]" />;

const TextMessageSkeleton: React.FC = () => <Skeleton className="h-5 w-[90%]" />;

const LogRowSkeleton: React.FC<ChildrenProps> = ({ children }) => (
  <Box className="flex-row py-2.5 px-4 bg-monochrome-normal gap-6">{children}</Box>
);
