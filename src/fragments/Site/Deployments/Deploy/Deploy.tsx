import { routes } from '@fleek-platform/utils-routes';

import { Link } from '@/components';
import { useDeploymentPoll } from '@/hooks/useDeploymentPoll';
import { useRouter } from '@/hooks/useRouter';
import { Deployment } from '@/types/Deployment';
import { ChildrenProps } from '@/types/Props';
import { Box, Icon, Skeleton, Text } from '@/ui';
import { cn } from '@/utils/cn';
import { getDurationUntilNow } from '@/utils/getDurationUntilNow';
import { shortStringFormat } from '@/utils/stringFormat';

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
    <ItemRow className={className}>
      <Link
        href={routes.project.site.deployments.detail({
          projectId,
          siteId,
          deploymentId: deployment.id,
        })}
        className={cn('grid gap-4 sm:gap-8 justify-between w-full', {
          'sm:[grid-template-columns:2fr_2.5fr_0.5fr]': isSelfManaged,
          'sm:[grid-template-columns:1.5fr_1.5fr_2.5fr_1fr]': !isSelfManaged,
        })}
      >
        <ItemContainer>
          <Text variant="primary" weight={700}>
            {shortStringFormat({ str: deployment?.id, index: 6 })}
          </Text>
          <Text size="xs">
            {isSelfManaged ? 'Deployed from CLI' : environment}
          </Text>
        </ItemContainer>

        <ItemContainer>
          <DeployStatus
            deployment={deployment}
            isMostRecentDeployment={isMostRecentDeployment}
          />
        </ItemContainer>

        {!isSelfManaged && (
          <ItemContainer>
            <Text variant="primary" weight={700} className="truncate">
              {deployment?.sourceMessage || ''}
            </Text>
            <Text size="xs" className="flex gap-2">
              <Icon name="git-pull-request" />
              {deployment?.sourceBranch || '-'}
            </Text>
          </ItemContainer>
        )}

        <AuthorContainer>
          <Text size="xs">
            <TimeElapsed deployment={deployment} />
          </Text>
          <Text size="xs" className="truncate w-fit">
            {author}
          </Text>
        </AuthorContainer>
      </Link>
      {deployment && (
        <DropdownMenu
          isSelfManaged={isSelfManaged}
          deployment={deployment}
          onRedeploy={onRedeploy}
          canRedeploy={canRedeploy}
        />
      )}
    </ItemRow>
  );
};

type DeploymentProps = {
  deployment?: Deployment;
};

const TimeElapsed: React.FC<DeploymentProps> = ({ deployment }) => {
  const timeElapsed = getDurationUntilNow({
    isoDateString: deployment?.createdAt,
    shortFormat: true,
  });

  return <>{timeElapsed}</>;
};

type DeploySkeletonProps = ChildrenProps<{
  className?: string;
}>;

export const DeploySkeleton: React.FC<DeploySkeletonProps> = ({
  children,
  className,
}) => <ItemRow className={className}>{children}</ItemRow>;

export const DeployItemSkeleton: React.FC = () => (
  <ItemContainer>
    <Skeleton className="w-full h-[0.875rem] my-[0.125rem]" />
    <Skeleton className="w-3/4 h-3 my-[0.125rem]" />
  </ItemContainer>
);

export const DeployAuthorSkeleton: React.FC = () => (
  <AuthorContainer>
    <Skeleton className="w-full h-5 my-1" />
  </AuthorContainer>
);

const ItemRow: React.FC<
  ChildrenProps<{ className?: string; testId?: string }>
> = ({ children, className, testId }) => (
  <Box
    data-testid={testId}
    className={cn('flex-row justify-between gap-3', className)}
  >
    {children}
  </Box>
);

const ItemContainer: React.FC<ChildrenProps> = ({ children }) => (
  <Box className="justify-between gap-2 min-w-[10%]">{children}</Box>
);

const AuthorContainer: React.FC<ChildrenProps> = ({ children }) => (
  <Box className="flex-col items-end self-center min-w-[10%]">{children}</Box>
);
