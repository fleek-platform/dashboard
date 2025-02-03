import { SettingsBox, SettingsListItem } from '@/components';
import { SiteENSRecord } from '@/types/Site';
import { Box } from '@/ui';

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
    return (
      <SettingsListItem.FlatRow>
        <SettingsListItem.DataSkeleton />
        <SettingsListItem.DataSkeleton />
        <Box />
      </SettingsListItem.FlatRow>
    );
  }

  if (ensRecords.length === 0) {
    return (
      <SettingsBox.EmptyContent
        title="No ENS"
        description="Once you add domains, they will appear here."
      />
    );
  }

  return (
    <>
      {ensRecords.map((ens) => (
        <EnsRecordsListItem key={ens.id} {...ens} />
      ))}
    </>
  );
};
