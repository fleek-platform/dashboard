import { SettingsBox, SettingsListItem } from '@/components';
import type { SiteENSRecord } from '@/types/Site';

import { EnsRecordsListItem } from './EnsRecordsListItem';

type EnsRecordsListProps = {
  isLoading: boolean;
  ensRecords?: SiteENSRecord[];
};

export const EnsRecordsList: React.FC<EnsRecordsListProps> = ({
  isLoading,
  ensRecords = [],
}) => {
  if (isLoading) {
    return <SettingsListItem.Skeleton />;
  }

  if (ensRecords.length === 0) {
    return (
      <SettingsBox.Container>
        <SettingsBox.EmptyContent
          title="No ENS"
          description="Once you add domains, they will appear here."
        />
      </SettingsBox.Container>
    );
  }

  return (
    <>
      <SettingsBox.Title>Manage ENS</SettingsBox.Title>
      <SettingsBox.Text>
        Below are a list of ENS used for this site.
      </SettingsBox.Text>
      {ensRecords.map((ens) => (
        <EnsRecordsListItem key={ens.id} {...ens} />
      ))}
    </>
  );
};
