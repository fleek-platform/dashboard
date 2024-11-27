import { routes } from '@fleek-platform/utils-routes';

import { useDeploymentStatusQuery } from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { parseAPIDeploymentStatus } from '@/utils/parseAPIDeploymentStatus';
import { shortStringFormat } from '@/utils/stringFormat';

import { BreadcrumbStyle as S } from './Breadcrumb.styles';

type DeployBreadcrumpProps = {
  projectId: string;
  siteId: string;
};

export const DeployBreadcrumb: React.FC<DeployBreadcrumpProps> = ({
  projectId,
  siteId,
}) => {
  const router = useRouter();
  const deploymentId = router.query.deploymentId!;
  const [deploymentStatusQuery] = useDeploymentStatusQuery({
    variables: { where: { id: deploymentId } },
    pause: !deploymentId,
  });
  const parsedStatus = parseAPIDeploymentStatus(
    deploymentStatusQuery.data?.deployment.status,
  );

  return (
    <S.Container>
      <S.Divider>/</S.Divider>
      <S.Link
        href={routes.project.site.deployments.detail({
          deploymentId,
          projectId,
          siteId,
        })}
      >
        <S.DeployStatus color={parsedStatus} />
        <S.Name>{shortStringFormat({ str: deploymentId, index: 5 })}</S.Name>
      </S.Link>
    </S.Container>
  );
};
