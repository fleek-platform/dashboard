import { routes } from '@fleek-platform/utils-routes';
import { DateTime } from 'luxon';

import { useRouter } from '@/hooks/useRouter';
import { useSessionContext } from '@/providers/SessionProvider';
import { Button } from '@/ui';
import { dateFormat } from '@/utils/dateFormats';

import { OverallMigrationStatus } from '../Migration';
import { useMigrationContext } from '../Migration.context';
import { MigrationStyles as S } from '../Migration.styles';
import { MigrationCard } from '../MigrationCard';

export const Step3: React.FC = () => {
  const { migrationRequests, overallStatus } = useMigrationContext();

  return (
    <MigrationCard
      status={overallStatus}
      migrationRequests={migrationRequests}
      startDate={dateFormat({ dateISO: migrationRequests[0]?.createdAt || DateTime.now().toISO() })}
    >
      <Buttons overallStatus={overallStatus} />
    </MigrationCard>
  );
};

const Buttons: React.FC<{ overallStatus: OverallMigrationStatus }> = ({ overallStatus }) => {
  const router = useRouter();
  const session = useSessionContext();
  const projectId = session.project.id;

  const { handleRetryFailedMigrations } = useMigrationContext();

  const handleDoneMigration = () => {
    router.push(routes.project.home({ projectId }));
  };

  switch (overallStatus) {
    case 'COMPLETED':
      return <Button onClick={handleDoneMigration}>Done</Button>;
    case 'PARTIALLY_COMPLETE':
      return (
        <S.Content.ButtonRow>
          <Button intent="neutral" onClick={handleRetryFailedMigrations}>
            Retry
          </Button>
          <Button onClick={handleDoneMigration}>Done</Button>
        </S.Content.ButtonRow>
      );
    case 'FAILED':
      return <Button onClick={handleRetryFailedMigrations}>Retry</Button>;
    default:
      return <></>;
  }
};
