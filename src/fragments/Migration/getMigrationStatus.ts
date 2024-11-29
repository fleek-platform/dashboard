import type { MigrationRequest, OverallMigrationStatus } from './Migration';

export const getMigrationStatus: (
  migrationRequests: MigrationRequest[],
) => OverallMigrationStatus = (migrationRequests) => {
  if (migrationRequests.length === 0) {
    return 'FETCHING_DATA';
  }

  if (
    migrationRequests.some(
      (migrationRequest) => migrationRequest.status === 'IN_PROGRESS',
    )
  ) {
    return 'IN_PROGRESS';
  }

  if (
    migrationRequests.every(
      (migrationRequest) => migrationRequest.status === 'COMPLETED',
    )
  ) {
    return 'COMPLETED';
  }

  if (
    migrationRequests.every(
      (migrationRequest) => migrationRequest.status === 'FAILED',
    )
  ) {
    return 'FAILED';
  }

  return 'PARTIALLY_COMPLETE';
};
