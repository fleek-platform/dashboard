import { BadgeText } from '@/components';
import type { SiteENSRecord } from '@/types/Site';
import { Box, Icon, type IconName, Text } from '@/ui';

import { DeploymentStyles as S } from './DeploymentDetail.styles';

type DeploymentDomainsProps = {
  domain: string | undefined;
  ens: SiteENSRecord;
};

export const DeploymentDomains: React.FC<DeploymentDomainsProps> = ({
  domain,
  ens,
}) => {
  return (
    <>
      {domain && <DataRow label="DNS Updated" text={domain} icon="domain" />}
      {ens && (
        <DataRow
          label="ENS Updated"
          text={ens.name}
          icon="ens-colored"
          iconContainerVariant="ens"
        />
      )}
    </>
  );
};

type DataRowProps = {
  label: string;
  text?: string;
  icon: IconName;
  iconContainerVariant?: React.ComponentProps<
    typeof S.IconContainer
  >['variant'];
};

export const DataRow: React.FC<DataRowProps> = ({
  label,
  text = '-',
  icon,
  iconContainerVariant,
}) => (
  <S.Row.Container>
    <S.Domains.Container>
      <S.IconContainer variant={iconContainerVariant}>
        <Icon name={icon} />
      </S.IconContainer>
      <Box>
        <Text variant="primary">{label}</Text>
        <Text size="xs">{text}</Text>
      </Box>
    </S.Domains.Container>
    <BadgeText colorScheme="yellow">Live</BadgeText>
  </S.Row.Container>
);
