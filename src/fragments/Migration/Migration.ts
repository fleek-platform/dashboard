import { MigrationRequest as MigrationRequestType } from '@/generated/graphqlClient';

import { AsideContent } from './AsideContent';
import { Layout } from './Layout';
import { MigrationProvider } from './Migration.context';
import { MigrationStyles as S } from './Migration.styles';
import { Step1 } from './Steps/Step1';
import { Step2 } from './Steps/Step2';
import { Step3 } from './Steps/Step3';

export type OverallMigrationStatus = 'FETCHING_DATA' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'PARTIALLY_COMPLETE';

export type MigrationRequest = Pick<MigrationRequestType, 'id' | 'createdAt' | 'status' | 'teamInfo' | 'teamId'>;

export const Migration = {
  Grid: S.Grid,
  BackButton: S.Layout.BackButton,
  AsideContent,
  Layout,
  Provider: MigrationProvider,

  Steps: {
    Step1,
    Step2,
    Step3,
  },
};
