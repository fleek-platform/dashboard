import { Text } from '@/ui';

import { SitesStyles } from './Sites.styles';

export const EmptyMessage: React.FC = () => {
  return (
    <SitesStyles.Empty.Wrapper>
      <Text as="h2" variant="primary" size="2xl" weight={700}>
        No sites yet :(
      </Text>
      <Text size="md">Use the Add New button or select a template below to deploy your first site on Fleek.</Text>
    </SitesStyles.Empty.Wrapper>
  );
};
