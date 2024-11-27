import { usePollSiteForDeployment } from '@/hooks/usePollSiteForDeployment';
import { Text } from '@/ui';

import { SelfManagedPollingStyles as S } from './SelfMangedPolling.styles';

type SelfManagedPollingProps = {
  siteId: string;
};

export const SelfManagedPolling: React.FC<SelfManagedPollingProps> = ({
  siteId,
}) => {
  usePollSiteForDeployment({ siteId });

  return (
    <S.Container>
      <S.Icon name="spinner" />
      <Text as="h2" variant="primary" size="xl" weight={700}>
        Waiting for Initial Deployment
      </Text>
      <Text>
        Once we detect the deployment, your site will begin to build on Fleek.
      </Text>
    </S.Container>
  );
};
