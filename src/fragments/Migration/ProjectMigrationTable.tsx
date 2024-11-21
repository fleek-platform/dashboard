import type { MigrationStatus } from '@/generated/graphqlClient';
import type { LoadingProps } from '@/types/Props';
import { Icon, type IconName, Text } from '@/ui';

import type { MigrationRequest } from './Migration';
import { MigrationStyles as S } from './Migration.styles';

export const ProjectMigrationTable: React.FC<ProjectMigrationtableProps> = ({
  migrationRequests,
  isLoading,
}) => {
  return (
    <S.Content.Table.Container>
      <S.Content.Table.Root>
        <S.Content.Table.Header>
          <S.Content.Table.Row>
            <col span={1} style={{ width: '55%' }} />
            <col span={1} style={{ width: '15%' }} />
            <col span={1} style={{ width: '15%' }} />
            <col span={1} style={{ width: '15%' }} />
          </S.Content.Table.Row>
          <S.Content.Table.Row>
            <S.Content.Table.HeaderCell>Projects</S.Content.Table.HeaderCell>
            <S.Content.Table.HeaderCell>Sites</S.Content.Table.HeaderCell>
            <S.Content.Table.HeaderCell>Files</S.Content.Table.HeaderCell>
            <S.Content.Table.HeaderCell />
          </S.Content.Table.Row>
        </S.Content.Table.Header>
        {migrationRequests && !isLoading ? (
          <S.Content.Table.Body>
            {migrationRequests.map(({ status, teamInfo, teamId }) => (
              <MigrationRow
                key={teamId}
                project={teamInfo?.name}
                sites={teamInfo?.sitesCount}
                files={teamInfo?.filesCount}
                status={MigrationStatusIconMap[status]}
              />
            ))}
          </S.Content.Table.Body>
        ) : (
          <S.Content.Table.Body isLoading>
            <S.Content.Table.LoadingContainer>
              <Icon name="spinner" />
              <Text>Fetching data...</Text>
            </S.Content.Table.LoadingContainer>
          </S.Content.Table.Body>
        )}
      </S.Content.Table.Root>
    </S.Content.Table.Container>
  );
};

const MigrationRow: React.FC<MigrationRowProps> = ({
  project = '',
  sites = 0,
  files = 0,
  status,
}) => {
  const cellStatusVariant = MigrationStatusCellColorMap[status] || undefined;

  return (
    <S.Content.Table.Row>
      <S.Content.Table.Cell>{project}</S.Content.Table.Cell>
      <S.Content.Table.Cell>{sites}</S.Content.Table.Cell>
      <S.Content.Table.Cell>{files}</S.Content.Table.Cell>
      <S.Content.Table.Cell status={cellStatusVariant}>
        <Icon name={status} />
      </S.Content.Table.Cell>
    </S.Content.Table.Row>
  );
};

type CellVariants = Omit<
  React.ComponentProps<typeof S.Content.Table.Cell>,
  'td'
>['status'];

const MigrationStatusIconMap: Record<
  MigrationStatus,
  MigrationRowProps['status']
> = {
  IN_PROGRESS: 'spinner',
  COMPLETED: 'check-circled',
  FAILED: 'close-circle',
};

const MigrationStatusCellColorMap: Record<
  MigrationRowProps['status'],
  CellVariants
> = {
  spinner: 'white',
  'check-circled': 'green',
  'close-circle': 'red',
};

export type ProjectMigrationtableProps = {
  migrationRequests?: MigrationRequest[];
} & LoadingProps;

type MigrationRowProps = {
  project: string | undefined;
  sites: number | undefined;
  files: number | undefined;
  status: (IconName & 'spinner') | 'check-circled' | 'close-circle';
};
