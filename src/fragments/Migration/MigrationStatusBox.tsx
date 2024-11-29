import { Text } from '@/ui';

import type { OverallMigrationStatus } from './Migration';
import { MigrationStyles as S } from './Migration.styles';

type MigrationStatusBoxProps = {
  status: OverallMigrationStatus;
  date: string;
  triggeredBy: string;
};

const migrationStatusMap: Record<
  MigrationStatusBoxProps['status'],
  { text: string; className: string }
> = {
  FETCHING_DATA: { text: 'Fetching Data', className: 'text-warning-11' },
  IN_PROGRESS: { text: 'In Progress', className: 'text-warning-11' },
  COMPLETED: { text: 'Completed', className: 'text-success-11' },
  PARTIALLY_COMPLETE: {
    text: 'Partially Complete',
    className: 'text-success-11',
  },
  FAILED: { text: 'Failed', className: 'text-danger-11' },
};

export const MigrationStatusBox: React.FC<MigrationStatusBoxProps> = ({
  status,
  date,
  triggeredBy,
}) => {
  return (
    <S.Content.MigrationStatus.Container>
      <S.Content.MigrationStatus.Row>
        <Text>Status</Text>
        <Text
          variant="primary"
          weight={500}
          className={migrationStatusMap[status].className}
        >
          {migrationStatusMap[status].text}
        </Text>
      </S.Content.MigrationStatus.Row>
      <S.Content.MigrationStatus.Row>
        <Text>Date</Text>
        <Text variant="primary" weight={500}>
          {date}
        </Text>
      </S.Content.MigrationStatus.Row>
      <S.Content.MigrationStatus.Row>
        <Text>Triggered by</Text>
        <Text variant="primary" weight={500}>
          {triggeredBy}
        </Text>
      </S.Content.MigrationStatus.Row>
    </S.Content.MigrationStatus.Container>
  );
};
