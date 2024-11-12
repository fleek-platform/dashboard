import { DeploymentStatus as APIDeploymentStatus } from '@/generated/graphqlClient';
import { DeploymentStatus } from '@/types/Deployment';

type ParseAPIDeploymentStatusArgs = APIDeploymentStatus;

export const parseAPIDeploymentStatus = (status?: ParseAPIDeploymentStatusArgs): DeploymentStatus => {
  switch (status) {
    case APIDeploymentStatus.SOURCE_CLONE_FAILED:
    case APIDeploymentStatus.CHECK_RUN_CREATING_FAILED:
    case APIDeploymentStatus.BUILD_FAILED:
    case APIDeploymentStatus.UPLOAD_FAILED:
    case APIDeploymentStatus.READY_CHECK_FAILED:
    case APIDeploymentStatus.RELEASE_FAILED:
      return 'failed';

    case APIDeploymentStatus.SOURCE_CLONE_IN_PROGRESS:
    case APIDeploymentStatus.SOURCE_CLONE_COMPLETED:
    case APIDeploymentStatus.CHECK_RUN_CREATING_COMPLETED:
    case APIDeploymentStatus.BUILD_IN_PROGRESS:
    case APIDeploymentStatus.BUILD_COMPLETED:
    case APIDeploymentStatus.ARTIFACT_READY:
    case APIDeploymentStatus.UPLOAD_IN_PROGRESS:
    case APIDeploymentStatus.UPLOAD_COMPLETED:
    case APIDeploymentStatus.READY_CHECK_IN_PROGRESS:
    case APIDeploymentStatus.READY_CHECK_COMPLETED:
    case APIDeploymentStatus.RELEASE_IN_PROGRESS:
      return 'loading';

    case APIDeploymentStatus.RELEASE_COMPLETED:
      return 'success';

    case APIDeploymentStatus.BUILD_CANCELLED:
      return 'cancelled';
    case APIDeploymentStatus.BUILD_CANCELLING:
      return 'cancelling';

    case APIDeploymentStatus.CREATED:
    default:
      return 'created';
  }
};
