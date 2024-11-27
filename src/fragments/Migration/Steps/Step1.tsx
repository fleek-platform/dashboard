import { LearnMoreMessage } from '@/components';
import { useSessionContext } from '@/providers/SessionProvider';
import { Button, Text } from '@/ui';

import { useMigrationContext } from '../Migration.context';
import { MigrationStyles as S } from '../Migration.styles';

export const Step1: React.FC = () => {
  const session = useSessionContext();
  const { isStep1Loading: isLoading, handleBeginMigration, isSubmittingMigration, migrationToken } = useMigrationContext();

  const isDisabled = !session.auth.token || isLoading || !migrationToken;

  return (
    <S.Content.Container>
      <S.Content.BannerImage alt="The new fleek" src="/assets/static/migration.png" />
      <Text>This is the process to migrate your projects and data from our legacy app to the new app.</Text>
      <Text>
        We want to take a moment and say we appreciate you for being a Fleek user, we look forward to better serving you in the all new
        Fleek app.
      </Text>
      <LearnMoreMessage prefix="Need Migration Help?" href="#">
        Follow instructions Here
      </LearnMoreMessage>
      <Button onClick={handleBeginMigration} disabled={isDisabled} loading={isSubmittingMigration}>
        Begin Migration
      </Button>
    </S.Content.Container>
  );
};
