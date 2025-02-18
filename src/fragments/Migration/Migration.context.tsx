import { routes } from '@fleek-platform/utils-routes';
import { useMemo, useState } from 'react';

import {
  useCreateMigrationRequestsFromTokenMutation,
  useCreateMigrationTokenMutation,
  useProjectsQuery,
} from '@/generated/graphqlClient';
import { usePollMigrationRequests } from '@/hooks/usePollMigrationRequests';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { ChildrenProps } from '@/types/Props';
import { Stepper } from '@/ui';
import { createContext } from '@/utils/createContext';

import { getMigrationStatus } from './getMigrationStatus';
import { MigrationRequest, OverallMigrationStatus } from './Migration';

type MigrationContext = {
  isStep1Loading: boolean;
  isSubmittingMigration: boolean;
  migrationRequests: MigrationRequest[];
  overallStatus: OverallMigrationStatus;
  asideTitle: string;
  migrationToken?: string;

  handleBeginMigration: () => void;
  handleRetryFailedMigrations: () => void;
};

const AsideTitleMap: Record<number, string> = {
  0: 'Begin Migration from Fleek.co to Fleek.xyz',
  1: 'Fleek.co data is being migrated to Fleek.xyz',
  2: 'Fleek.co data has finished migrating to Fleek.xyz',
};

export const MigrationProvider: React.FC<ChildrenProps> = ({ children }) => {
  const toast = useToast();
  const router = useRouter();

  const { migrationToken } = router.query;
  const { currentStep, nextStep, setStep } = Stepper.useContext();

  const [shouldPollMigration, setShouldPollMigration] =
    useState<boolean>(false);
  const [createdMigrationRequests, setCreatedMigrationRequests] = useState<
    MigrationRequest[]
  >([]);
  const [isSubmittingMigration, setIsSubmittingMigration] =
    useState<boolean>(false);

  const [createMigrationTokenMutation, createMigrationToken] =
    useCreateMigrationTokenMutation();
  const [
    createMigrationRequestsFromTokenMutation,
    createMigrationRequestsFromToken,
  ] = useCreateMigrationRequestsFromTokenMutation();
  const [, refetchProjectsQuery] = useProjectsQuery();

  const [polledMigrationsResult] = usePollMigrationRequests({
    migrationRequestIds: createdMigrationRequests.map(
      (migrationRequest) => migrationRequest.id,
    ),
    onFinishedCallback: () => {
      if (currentStep === 1) {
        refetchProjectsQuery({ requestPolicy: 'network-only' });
        nextStep();
      }
    },
    pause:
      (!shouldPollMigration && !createdMigrationRequests) ||
      createdMigrationRequests.length === 0,
  });

  const polledMigrations = useMemo(
    () => polledMigrationsResult.data || createdMigrationRequests || [],
    [polledMigrationsResult.data, createdMigrationRequests],
  );

  const asideTitle = AsideTitleMap[currentStep] || '';

  const isStep1Loading =
    createMigrationTokenMutation.fetching ||
    createMigrationRequestsFromTokenMutation.fetching ||
    (shouldPollMigration && polledMigrations.length > 0);

  const migrationStatus = getMigrationStatus(polledMigrations);

  const handleCreateToken = async (teamIds: string[]) => {
    try {
      const result = await createMigrationToken({ data: { teamIds } });

      if (!result.data) {
        throw (
          result.error ||
          new Error('There was an error creating the migration token')
        );
      }

      const token = result.data.createMigrationToken;

      return token;
    } catch (error) {
      setStep(1);
      setIsSubmittingMigration(false);
      toast.error({ error, log: 'Failed to Create migration token' });
    }
  };

  const handleCreateMigration = async (migrationToken?: string) => {
    if (!migrationToken) {
      return false;
    }

    try {
      const result = await createMigrationRequestsFromToken({
        data: { token: migrationToken },
      });

      if (!result.data) {
        throw (
          result.error ||
          new Error('There was an error creating the migration from token')
        );
      }

      const migrationRequests = result.data.createMigrationRequestsFromToken;

      setCreatedMigrationRequests(() => migrationRequests);
      setShouldPollMigration(() => true);

      return true;
    } catch (error) {
      setStep(1);
      setIsSubmittingMigration(false);
      toast.error({ error, log: 'Failed to Create migration token' });

      return false;
    }
  };

  const handleBeginMigration = async () => {
    setIsSubmittingMigration(true);
    setStep(2);
    await handleCreateMigration(migrationToken);
  };

  const handleRetryFailedMigrations = async () => {
    setIsSubmittingMigration(true);
    const failedMigrationsTeamIds = polledMigrations
      .filter((migration) => migration.status === 'FAILED')
      .map((migration) => migration.teamId);
    const newMigrationToken = await handleCreateToken(failedMigrationsTeamIds);

    router.push(
      {
        pathname: routes.migration(),
        query: { migrationToken: newMigrationToken },
      },
      undefined,
      { shallow: true },
    );

    if (newMigrationToken) {
      setStep(2);
      await handleCreateMigration(newMigrationToken);
    }
  };

  const value = {
    asideTitle,
    isStep1Loading,
    migrationRequests: polledMigrations,
    handleBeginMigration,
    handleRetryFailedMigrations,
    isSubmittingMigration,
    overallStatus: migrationStatus,
    migrationToken,
  };

  return <Provider value={value}>{children}</Provider>;
};

const [Provider, useContext] = createContext<MigrationContext>({
  name: 'MigrationContext',
  hookName: 'useMigrationContext',
  providerName: 'MigrationProvider',
});

export const useMigrationContext = useContext;
