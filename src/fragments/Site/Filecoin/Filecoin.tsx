import { BadgeText, BoxWithFooter } from '@/components';
import { Text } from '@/ui';

import { FilecoinStyles as S } from './Filecoin.styles';

export type FilecoinProps = {
  dealID?: string;
};

export const Filecoin: React.FC<FilecoinProps> = ({ dealID }) => {
  const hasDealId = Boolean(dealID);

  return (
    <BoxWithFooter
      footerIcon="filecoin"
      footerIconLabel="Filecoin"
      footer="The hash for your site content"
      iconContainerVariant="filecoin"
    >
      <S.Container>
        <S.Header>
          <Text as="h3" variant="primary" size="lg" weight={700}>
            Filecoin
          </Text>
          <BadgeText colorScheme={hasDealId ? 'yellow' : 'amber'}>
            {hasDealId ? 'Backed Up' : 'Syncing'}
          </BadgeText>
        </S.Header>
        <S.Main>
          <Text size="xs" weight={500}>
            Deal ID
          </Text>
          <Text variant="primary" size="md">
            {hasDealId ? dealID : '-'}
          </Text>
        </S.Main>
      </S.Container>
    </BoxWithFooter>
  );
};
