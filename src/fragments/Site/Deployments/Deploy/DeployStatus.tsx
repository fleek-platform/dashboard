import { BadgeText } from '@/components';
import { Deployment } from '@/types/Deployment';
import { Box, Icon, Text } from '@/ui';
import { statusDataMap } from '@/utils/deployUtils';
import { parseAPIDeploymentStatus } from '@/utils/parseAPIDeploymentStatus';

import { DeployElapsedTime } from './DeployElapsedTime';

type DeploymentProps = {
  deployment?: Deployment;
  isMostRecentDeployment?: boolean;
};

export const DeployStatus: React.FC<DeploymentProps> = ({
  deployment,
  isMostRecentDeployment,
}) => {
  const parsedStatus = parseAPIDeploymentStatus(deployment?.status);

  const statusData = statusDataMap[parsedStatus];

  const isCurrentDeploymentProd =
    parsedStatus === 'success' && isMostRecentDeployment;

  return (
    <>
      <Box className="flex-row gap-1 text-xs">
        <BadgeText colorScheme={statusData.color} className="font-medium">
          <Icon name={statusData.icon} animated={statusData.animation} />
          {statusData.label}
        </BadgeText>
        {isCurrentDeploymentProd && (
          <BadgeText colorScheme="slate" className="font-medium">
            <Icon name="arrow-up-circled" />
            Current
          </BadgeText>
        )}
      </Box>
      <Text size="xs">
        <DeployElapsedTime deployment={deployment} />
      </Text>
    </>
  );
};
