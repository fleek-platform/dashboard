import { constants } from '@/constants';
import { DeploymentDetail } from '@/fragments';
import { Page } from '@/types/App';
import { withAccess } from '@/utils/withAccess';

const DeploymentDetailPage: Page = () => {
  return <DeploymentDetail.DeploymentOverview />;
};

const PageNavContent: React.FC = () => {
  return <DeploymentDetail.NavButtons />;
};

DeploymentDetailPage.getLayout = (page) => <DeploymentDetail.Layout nav={<PageNavContent />}>{page}</DeploymentDetail.Layout>;

export default withAccess({ Component: DeploymentDetailPage, requiredPermissions: [constants.PERMISSION.SITE.VIEW_DEPLOYMENTS] });
