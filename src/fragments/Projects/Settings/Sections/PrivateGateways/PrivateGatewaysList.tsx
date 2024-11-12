import { useEffect } from 'react';

import { SettingsBox, SettingsListItem } from '@/components';
import { useSettingsItemContext } from '@/fragments/Site/Settings/Elements/SettingsItem.context';
import { PrivateGateway } from '@/types/PrivateGateway';
import { LoadingProps } from '@/types/Props';
import { SiteDomain } from '@/types/Site'; // TODO unify type between Site Domain and PGW Domain
import { Box } from '@/ui';
import { isActiveDomain } from '@/utils/isActiveDomain';

import { PrivateGatewayListItem } from './PrivateGatewayListItem';
import { PrivateGatewaysStyles as S } from './PrivateGateways.styles';

type PrivateGatewayListProps = LoadingProps<{
  privateGateways: PrivateGateway[];
}>;

export const PrivateGatewaysList: React.FC<PrivateGatewayListProps> = ({ isLoading, privateGateways = [] }) => {
  const { setActiveDomains } = useSettingsItemContext();

  useEffect(() => {
    const activeDomains: SiteDomain[] = [];

    privateGateways.forEach((privateGateway) =>
      privateGateway.domains.forEach((domain) => {
        if (isActiveDomain({ domain, primaryDomainId: privateGateway.primaryDomain?.id! })) {
          activeDomains.push(domain);
        }
      })
    );

    setActiveDomains(activeDomains);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privateGateways]);

  return (
    <>
      {!isLoading &&
        privateGateways.map((privateGateway) => <PrivateGatewayListItem key={privateGateway.id} privateGateway={privateGateway} />)}
      {!isLoading && privateGateways.length === 0 && <EmptyPrivateGatewaysList />}
      {isLoading && <CardSkeleton />}
    </>
  );
};

const EmptyPrivateGatewaysList: React.FC = () => (
  <SettingsBox.Container>
    <SettingsBox.Title>Manage Private Gateways</SettingsBox.Title>
    <SettingsBox.EmptyContent title="No Private Gateways" description="Once you create a private gateway, it will appear here." />
  </SettingsBox.Container>
);

export const CardSkeleton: React.FC = () => (
  <SettingsBox.Container>
    <Box>
      <S.DataSkeleton variant="title" />
    </Box>
    <Box>
      <S.DataSkeleton variant="text" />
    </Box>
    <SettingsListItem.Skeleton />
  </SettingsBox.Container>
);
