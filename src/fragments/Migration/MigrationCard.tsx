import { LearnMoreMessage } from '@/components';
import type { ChildrenProps } from '@/types/Props';
import { Text } from '@/ui';

import type { MigrationRequest, OverallMigrationStatus } from './Migration';
import { MigrationStyles } from './Migration.styles';
import { MigrationStatusBox } from './MigrationStatusBox';
import { ProjectMigrationTable } from './ProjectMigrationTable';

export type MigrationCardProps = ChildrenProps<{
  migrationRequests?: MigrationRequest[];
  status: OverallMigrationStatus;
  startDate: string;
}>;

export const MigrationCard: React.FC<MigrationCardProps> = ({
  migrationRequests,
  status,
  startDate,
  children,
}) => {
  const { title, description } = migrationCopyMap[status];

  return (
    <MigrationStyles.Content.Container>
      <Text>{title}</Text>
      <MigrationDescription descriptionItems={description} />
      <ProjectMigrationTable
        migrationRequests={migrationRequests}
        isLoading={status === 'FETCHING_DATA'}
      />
      <MigrationStatusBox status={status} date={startDate} triggeredBy="me" />
      {children}
    </MigrationStyles.Content.Container>
  );
};

export const MigrationDescription: React.FC<{
  descriptionItems: DescriptionItem[];
}> = ({ descriptionItems }) => (
  <>
    {descriptionItems.map((descriptionData) => {
      switch (descriptionData.type) {
        case 'TEXT':
          return <Text key={descriptionData.text}>{descriptionData.text}</Text>;
        case 'LEARN_MORE':
          return (
            <LearnMoreMessage
              key={descriptionData.content}
              href={descriptionData.href}
              prefix={descriptionData.prefix}
            >
              {descriptionData.content}
            </LearnMoreMessage>
          );
      }
    })}
  </>
);

type DescriptionItem =
  | {
      type: 'TEXT';
      text: string;
    }
  | {
      type: 'LEARN_MORE';
      href: string;
      prefix: string;
      content: string;
    };

type MigrationCopy = {
  title: string;
  description: DescriptionItem[];
};

const migrationCopyMap: Record<OverallMigrationStatus, MigrationCopy> = {
  FETCHING_DATA: {
    title: 'Fetching Migration Status',
    description: [
      {
        type: 'TEXT',
        text: 'We are fetching all your projects, sites, and files, please allow a moment.',
      },
    ],
  },
  IN_PROGRESS: {
    title: 'Migration in Progress',
    description: [
      { type: 'TEXT', text: 'Below are the details of your data migration.' },
    ],
  },
  FAILED: {
    title: 'Migration Failed',
    description: [
      {
        type: 'TEXT',
        text: 'We encountered an issue migrating your data, we recommend to retry the action.',
      },
      {
        type: 'LEARN_MORE',
        href: '#',
        prefix: 'If the issue persists, please',
        content: 'reach out to support',
      },
    ],
  },
  PARTIALLY_COMPLETE: {
    title: 'Migration Partially Complete',
    description: [
      {
        type: 'TEXT',
        text: 'Migration is partially complete, the successfully migrated projects and data should now be seen within this app.',
      },
      {
        type: 'TEXT',
        text: 'We encountered an issue migrating some of your data, we recommend to retry the action. ',
      },
      {
        type: 'LEARN_MORE',
        href: '#',
        prefix: 'If the issue persists, please',
        content: 'reach out to support',
      },
    ],
  },
  COMPLETED: {
    title: 'Migration Complete',
    description: [
      {
        type: 'TEXT',
        text: 'Migration is complete, the migrated projects and data should now be seen within this app.',
      },
    ],
  },
};
