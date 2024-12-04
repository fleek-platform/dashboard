import { SettingsBox, SettingsListItem } from '@/components';
import { SiteENSRecord } from '@/types/Site';
import { Divider } from '@/ui';

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
      <SettingsBox.EmptyContent
        title="No ENS"
        description="Once you add domains, they will appear here."
      />
    );
  }

  return (
    <>
      {ensRecords.map((ens, index) => (
        <>
          <EnsRecordsListItem key={ens.id} {...ens} />
          {index < ensRecords.length - 1 && <Divider />}
        </>
      ))}
    </>
  );
};
