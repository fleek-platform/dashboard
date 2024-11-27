import { useMemo } from 'react';

import { BadgeText, PreviewImage } from '@/components';
import { SiteOverviewBox } from '@/components';
import { DeployStatus } from '@/fragments/Site/Deployments/Deploy/DeployStatus';
import { useDeploymentQuery, useSiteQuery } from '@/generated/graphqlClient';
import { useDeploymentPoll } from '@/hooks/useDeploymentPoll';
import { useRouter } from '@/hooks/useRouter';
import { useSiteLink } from '@/hooks/useSiteLink';
import { Accordion, Box, Skeleton, Text } from '@/ui';
import { statusDataMap } from '@/utils/deployUtils';
import { getLinkForRepository } from '@/utils/getLinkForRepository';
import { getSiteCurrentDeployment } from '@/utils/getSiteCurrentDeployment';
import { isSiteSelfManaged } from '@/utils/isSiteSelfManaged';
import { parseAPIDeploymentStatus } from '@/utils/parseAPIDeploymentStatus';
import { parseAPISourceProvider } from '@/utils/parseAPISourceProvider';
import { shortStringFormat } from '@/utils/stringFormat';

import { DeploymentStyles as S } from './DeploymentDetail.styles';
import { DeploymentLogs } from './DeploymentLogs';

export const DeploymentOverview: React.FC = () => {
  const router = useRouter();

  const deploymentId = router.query.deploymentId!;
  const siteId = router.query.siteId!;
  const projectId = router.query.projectId!;

  const [deploymentQuery] = useDeploymentQuery({ variables: { where: { id: deploymentId } } });
  const [siteQuery] = useSiteQuery({ variables: { where: { id: siteId } } });

  const currentDeployment = getSiteCurrentDeployment(siteQuery.data?.site);
  const siteLink = useSiteLink({ siteId, noHttps: true });
  let deployment = deploymentQuery.data?.deployment;
  const site = siteQuery.data?.site;

  const deploymentPoll = useDeploymentPoll({
    deploymentId: deployment?.id,
    siteId,
  });

  if (deploymentPoll.data) {
    deployment = deploymentPoll.data;
  }

  const parsedStatus = parseAPIDeploymentStatus(deploymentQuery.data?.deployment.status);

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

          <S.ProviderWrapper>
            <SiteOverviewBox.SiteSourceDetail
              siteName={site.name}
              isSelfManaged={isSelfManaged}
              visitRepoSource={sourceLink}
              repositoryName={repositoryName || undefined}
              repositoryOwner={repositoryOwner || undefined}
            />
            {!isSelfManaged && <BadgeText colorScheme="slate">{`branch: ${deployment.sourceBranch || 'Not found'}`}</BadgeText>}
          </S.ProviderWrapper>

          <SiteOverviewBox.Domain
            siteId={siteId}
            projectId={projectId}
            siteLink={siteLink}
            isDisabled={parsedStatus !== 'success'}
            isPreview={isPreview}
            previewURL={deployment.previewUrlSlug ?? undefined}
          />

          <SiteOverviewBox.ViewOnIPFS cid={deployment?.cid} isDisabled={parsedStatus !== 'success'} />
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
  <S.Accordion.Root type="multiple" defaultValue={['logs']}>
    <Accordion.Item value="logs">
      <S.Accordion.Header>
        <Skeleton />
      </S.Accordion.Header>
      <S.Accordion.Content>
        <S.Log.Row>
          <S.RowSkeleton variant="text" />
          <S.RowSkeleton variant="message" />
        </S.Log.Row>
        <S.Log.Row>
          <S.RowSkeleton variant="text" />
          <S.RowSkeleton variant="message" />
        </S.Log.Row>
        <S.Log.Row>
          <S.RowSkeleton variant="text" />
          <S.RowSkeleton variant="message" />
        </S.Log.Row>
        <S.Log.Row>
          <S.RowSkeleton variant="text" />
          <S.RowSkeleton variant="message" />
        </S.Log.Row>
        <S.Log.Row>
          <S.RowSkeleton variant="text" />
          <S.RowSkeleton variant="message" />
        </S.Log.Row>
        <S.Log.Row>
          <S.RowSkeleton variant="text" />
          <S.RowSkeleton variant="message" />
        </S.Log.Row>
      </S.Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="breakdown">
      <S.Accordion.Header>
        <Skeleton />
      </S.Accordion.Header>
      <S.Accordion.Content>
        <Skeleton />
      </S.Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="domains">
      <S.Accordion.Header>
        <Skeleton />
      </S.Accordion.Header>
      <S.Accordion.Content>
        <Skeleton />
      </S.Accordion.Content>
    </Accordion.Item>
  </S.Accordion.Root>
);
