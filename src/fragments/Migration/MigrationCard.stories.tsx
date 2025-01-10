import { Meta, StoryObj } from '@storybook/react';

import { MigrationStatus } from '@/generated/graphqlClient';
import { Box, Button } from '@/ui';

import { MigrationStyles } from './Migration.styles';
import { MigrationCard, MigrationCardProps } from './MigrationCard';

const meta: Meta = {
  title: 'Library/Fragments/Migration/Card',
};

export default meta;

export const Fetching: StoryObj<MigrationCardProps> = {
  render: (args) => {
    return (
      <Box className="max-w-[26.5rem]">
        <MigrationStyles.Content.Container>
          <MigrationCard {...args} />
        </MigrationStyles.Content.Container>
      </Box>
    );
  },

  args: {
    status: 'FETCHING_DATA',
    startDate: '03/12/2024',
  },
};

export const InProgress: StoryObj<MigrationCardProps> = {
  render: (args) => {
    return (
      <Box className="max-w-[26.5rem]">
        <MigrationStyles.Content.Container>
          <MigrationCard {...args} />
        </MigrationStyles.Content.Container>
      </Box>
    );
  },

  args: {
    status: 'IN_PROGRESS',
    startDate: '03/12/2024',
    migrationRequests: [
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: 'cl1qzdx9tj000208l7dabp4x00',
        status: MigrationStatus.IN_PROGRESS,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c2n0c846de-277b-407e-a017-d706af3d0001',
          name: 'first',
          sitesCount: 5,
          usersCount: 3,
        },
      },
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: '23nclqzdx9tj000208l7dabp4x00',
        status: MigrationStatus.IN_PROGRESS,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c34n0c846de-277b-407e-a017-d706af3d0001',
          name: 'second',
          sitesCount: 5,
          usersCount: 3,
        },
      },
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: 'clqz235dx9tj000208l7dabp4x00',
        status: MigrationStatus.IN_PROGRESS,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c032c846de-277b-407e-a017-d706af3d0001',
          name: 'third',
          sitesCount: 5,
          usersCount: 3,
        },
      },
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: 'c223lqzdx9tj000208l7dabp4x00',
        status: MigrationStatus.IN_PROGRESS,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c1230c846de-277b-407e-a017-d706af3d0001',
          name: 'last',
          sitesCount: 5,
          usersCount: 3,
        },
      },
    ],
  },
};

export const Completed: StoryObj<MigrationCardProps> = {
  render: (args) => {
    return (
      <Box className="max-w-[26.5rem]">
        <MigrationStyles.Content.Container>
          <MigrationCard {...args} />
        </MigrationStyles.Content.Container>
      </Box>
    );
  },

  args: {
    status: 'COMPLETED',
    startDate: '03/12/2024',
    migrationRequests: [
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: 'cl1qzdx9tj000208l7dabp4x00',
        status: MigrationStatus.COMPLETED,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c2n0c846de-277b-407e-a017-d706af3d0001',
          name: 'first',
          sitesCount: 5,
          usersCount: 3,
        },
      },
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: '23nclqzdx9tj000208l7dabp4x00',
        status: MigrationStatus.COMPLETED,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c34n0c846de-277b-407e-a017-d706af3d0001',
          name: 'second',
          sitesCount: 5,
          usersCount: 3,
        },
      },
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: 'clqz235dx9tj000208l7dabp4x00',
        status: MigrationStatus.COMPLETED,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c032c846de-277b-407e-a017-d706af3d0001',
          name: 'third',
          sitesCount: 5,
          usersCount: 3,
        },
      },
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: 'c223lqzdx9tj000208l7dabp4x00',
        status: MigrationStatus.COMPLETED,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c1230c846de-277b-407e-a017-d706af3d0001',
          name: 'last',
          sitesCount: 5,
          usersCount: 3,
        },
      },
    ],
  },
};

export const PartiallyComplete: StoryObj<MigrationCardProps> = {
  render: (args) => {
    return (
      <Box className="max-w-[26.5rem]">
        <MigrationStyles.Content.Container>
          <MigrationCard {...args} />
        </MigrationStyles.Content.Container>
      </Box>
    );
  },

  args: {
    status: 'PARTIALLY_COMPLETE',
    startDate: '03/12/2024',
    migrationRequests: [
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: 'cl1qzdx9tj000208l7dabp4x00',
        status: MigrationStatus.COMPLETED,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c2n0c846de-277b-407e-a017-d706af3d0001',
          name: 'first',
          sitesCount: 5,
          usersCount: 3,
        },
      },
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: '23nclqzdx9tj000208l7dabp4x00',
        status: MigrationStatus.FAILED,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c34n0c846de-277b-407e-a017-d706af3d0001',
          name: 'second',
          sitesCount: 5,
          usersCount: 3,
        },
      },
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: 'clqz235dx9tj000208l7dabp4x00',
        status: MigrationStatus.COMPLETED,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c032c846de-277b-407e-a017-d706af3d0001',
          name: 'third',
          sitesCount: 5,
          usersCount: 3,
        },
      },
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: 'c223lqzdx9tj000208l7dabp4x00',
        status: MigrationStatus.FAILED,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c1230c846de-277b-407e-a017-d706af3d0001',
          name: 'last',
          sitesCount: 5,
          usersCount: 3,
        },
      },
    ],
  },
};

export const Failed: StoryObj<MigrationCardProps> = {
  render: (args) => {
    return (
      <Box className="max-w-[26.5rem]">
        <MigrationStyles.Content.Container>
          <MigrationCard {...args} />
        </MigrationStyles.Content.Container>
      </Box>
    );
  },

  args: {
    status: 'FAILED',
    startDate: '03/12/2024',
    migrationRequests: [
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: 'cl1qzdx9tj000208l7dabp4x00',
        status: MigrationStatus.FAILED,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c2n0c846de-277b-407e-a017-d706af3d0001',
          name: 'first',
          sitesCount: 5,
          usersCount: 3,
        },
      },
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: '23nclqzdx9tj000208l7dabp4x00',
        status: MigrationStatus.FAILED,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c34n0c846de-277b-407e-a017-d706af3d0001',
          name: 'second',
          sitesCount: 5,
          usersCount: 3,
        },
      },
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: 'clqz235dx9tj000208l7dabp4x00',
        status: MigrationStatus.FAILED,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c032c846de-277b-407e-a017-d706af3d0001',
          name: 'third',
          sitesCount: 5,
          usersCount: 3,
        },
      },
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: 'c223lqzdx9tj000208l7dabp4x00',
        status: MigrationStatus.FAILED,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c1230c846de-277b-407e-a017-d706af3d0001',
          name: 'last',
          sitesCount: 5,
          usersCount: 3,
        },
      },
    ],
  },
};

export const WithChildren: StoryObj<MigrationCardProps> = {
  render: (args) => {
    return (
      <Box className="max-w-[26.5rem]">
        <MigrationStyles.Content.Container>
          <MigrationCard {...args} />
        </MigrationStyles.Content.Container>
      </Box>
    );
  },

  args: {
    children: (
      <MigrationStyles.Content.ButtonRow>
        <Button intent="neutral" onClick={() => console.log('retry-clicked')}>
          Retry
        </Button>
        <Button onClick={() => console.log('done-clicked')}>Done</Button>
      </MigrationStyles.Content.ButtonRow>
    ),
    status: 'IN_PROGRESS',
    startDate: '03/12/2024',
    migrationRequests: [
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: 'cl1qzdx9tj000208l7dabp4x00',
        status: MigrationStatus.IN_PROGRESS,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c2n0c846de-277b-407e-a017-d706af3d0001',
          name: 'first',
          sitesCount: 5,
          usersCount: 3,
        },
      },
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: '23nclqzdx9tj000208l7dabp4x00',
        status: MigrationStatus.IN_PROGRESS,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c34n0c846de-277b-407e-a017-d706af3d0001',
          name: 'second',
          sitesCount: 5,
          usersCount: 3,
        },
      },
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: 'clqz235dx9tj000208l7dabp4x00',
        status: MigrationStatus.IN_PROGRESS,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c032c846de-277b-407e-a017-d706af3d0001',
          name: 'third',
          sitesCount: 5,
          usersCount: 3,
        },
      },
      {
        createdAt: '2024-01-04T11:05:13.641Z',
        id: 'c223lqzdx9tj000208l7dabp4x00',
        status: MigrationStatus.IN_PROGRESS,
        teamId: 'c0c846de-277b-407e-a017-d706af3d0001',
        teamInfo: {
          __typename: 'MigrationTeamInfo',
          filesCount: 10,
          id: 'c1230c846de-277b-407e-a017-d706af3d0001',
          name: 'last',
          sitesCount: 5,
          usersCount: 3,
        },
      },
    ],
  },
};
