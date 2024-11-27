import { routes } from '@fleek-platform/utils-routes';

import { Link } from '@/components';
import { useDeploymentPoll } from '@/hooks/useDeploymentPoll';
import { useRouter } from '@/hooks/useRouter';
import { TEST_ID } from '@/test/testId';
import { Deployment } from '@/types/Deployment';
import { ChildrenProps } from '@/types/Props';
import { Icon, Skeleton, Text } from '@/ui';
import { cn } from '@/utils/cn';
import { getDurationUntilNow } from '@/utils/getDurationUntilNow';
import { shortStringFormat } from '@/utils/stringFormat';

import { DeployStyles as S } from './Deploy.styles';
import { DeployStatus } from './DeployStatus';
import { DropdownMenu, DropdownMenuProps } from './DropdownMenu';

export type DeployProps = {
  deployment: Deployment;
  siteUrl?: string;
  isSelfManaged: boolean;
  canRedeploy: boolean;
  isMostRecentDeployment?: boolean;
  className?: string;
} & Pick<DropdownMenuProps, 'onRedeploy'>;

export const Deploy: React.FC<DeployProps> = ({
  deployment,
  onRedeploy,
  isSelfManaged,
  canRedeploy,
  isMostRecentDeployment = false,
  className,
}) => {
  const router = useRouter();
  const siteId = router.query.siteId!;

  const deploymentPoll = useDeploymentPoll({
    deploymentId: deployment.id,
    siteId,
  });

  if (deploymentPoll.data) {
    deployment = deploymentPoll.data;
  }

  const projectId = router.query.projectId!;

  const author = deployment?.sourceAuthor && `by ${deployment.sourceAuthor}`;

  const environment = deployment?.previewOnly ? 'Preview' : 'Production';

  return (
    <S.ItemRow data-testid={TEST_ID.DEPLOYMENT_CONTAINER} className={className}>
      <Link
        href={routes.project.site.deployments.detail({ projectId, siteId, deploymentId: deployment.id })}
        className={cn('grid gap-4 sm:gap-8 justify-between w-full', {
          'sm:[grid-template-columns:2fr_2.5fr_0.5fr]': isSelfManaged,
          'sm:[grid-template-columns:1.5fr_1.5fr_2.5fr_1fr]': !isSelfManaged,
        })}
      >
        <S.ItemContainer>
          <Text variant="primary" weight={700}>
            {shortStringFormat({ str: deployment?.id, index: 6 })}
          </Text>
          <Text size="xs">{isSelfManaged ? 'Deployed from CLI' : environment}</Text>
        </S.ItemContainer>

        <S.ItemContainer>
          <DeployStatus deployment={deployment} isMostRecentDeployment={isMostRecentDeployment} />
        </S.ItemContainer>

        {!isSelfManaged && (
          <S.ItemContainer>
            <Text variant="primary" weight={700} className="truncate">
              {deployment?.sourceMessage || ''}
            </Text>
            <Text size="xs" className="flex gap-2">
              <Icon name="git-pull-request" />
              {deployment?.sourceBranch || '-'}
            </Text>
          </S.ItemContainer>
        )}

        <S.AuthorContainer>
          <Text size="xs">
            <TimeElapsed deployment={deployment} />
          </Text>
          <Text size="xs" className="truncate w-full">
            {author}
          </Text>
        </S.AuthorContainer>
      </Link>
      {deployment && (
        <DropdownMenu isSelfManaged={isSelfManaged} deployment={deployment} onRedeploy={onRedeploy} canRedeploy={canRedeploy} />
      )}
    </S.ItemRow>
  );
};

type DeploymentProps = {
  deployment?: Deployment;
};

const TimeElapsed: React.FC<DeploymentProps> = ({ deployment }) => {
  const timeElapsed = getDurationUntilNow({ isoDateString: deployment?.createdAt, shortFormat: true });

  return <>{timeElapsed}</>;
};

type DeploySkeletonProps = ChildrenProps<{
  className?: string;
}>;

export const DeploySkeleton: React.FC<DeploySkeletonProps> = ({ children, className }) => (
  <S.ItemRow className={className}>{children}</S.ItemRow>
);

export const DeployItemSkeleton: React.FC = () => (
  <S.ItemContainer>
    <S.TextSkeleton>
      <Skeleton />
    </S.TextSkeleton>
    <S.LabelSkeleton>
      <Skeleton />
    </S.LabelSkeleton>
  </S.ItemContainer>
);

export const DeployAuthorSkeleton: React.FC = () => (
  <S.AuthorContainer>
    <Skeleton />
  </S.AuthorContainer>
);
