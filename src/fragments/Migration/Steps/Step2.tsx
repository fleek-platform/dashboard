import { DateTime } from 'luxon';

import { dateFormat } from '@/utils/dateFormats';

import { useMigrationContext } from '../Migration.context';
import { MigrationCard } from '../MigrationCard';

export const Step2: React.FC = () => {
  const { migrationRequests, overallStatus } = useMigrationContext();

  return (
    <MigrationCard
      status={overallStatus}
      migrationRequests={migrationRequests}
      startDate={dateFormat({ dateISO: migrationRequests[0]?.createdAt || DateTime.now().toISO() })}
    />
  );
};
