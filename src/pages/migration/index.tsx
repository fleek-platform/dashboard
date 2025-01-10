import { routes } from '@fleek-platform/utils-routes';

import { Link } from '@/components';
import { Migration } from '@/fragments';
import { useSessionContext } from '@/providers/SessionProvider';
import type { Page } from '@/types/App';
import { Button, Stepper } from '@/ui';
import { withAccess } from '@/utils/withAccess';

const MigrationPage: Page = () => {
  const session = useSessionContext();

  return (
    <>
      {session.auth.accessToken && (
        <Link href={routes.home()}>
          <Button intent="neutral" iconLeft="arrow-left">
            Go back
          </Button>
        </Link>
      )}
      <Migration.Grid.Wrapper>
        <Stepper.Root>
          <Migration.Provider>
            <Migration.Grid.Aside>
              <Migration.AsideContent />
            </Migration.Grid.Aside>
            <Migration.Grid.Content>
              <Stepper.Container>
                <Stepper.Step>
                  <Migration.Steps.Step1 />
                </Stepper.Step>

                <Stepper.Step>
                  <Migration.Steps.Step2 />
                </Stepper.Step>

                <Stepper.Step>
                  <Migration.Steps.Step3 />
                </Stepper.Step>
              </Stepper.Container>
            </Migration.Grid.Content>
          </Migration.Provider>
        </Stepper.Root>
      </Migration.Grid.Wrapper>
    </>
  );
};

MigrationPage.getLayout = (page) => <Migration.Layout>{page}</Migration.Layout>;

// eslint-disable-next-line fleek-custom/no-unequal-resolver-names
export default withAccess({
  Component: MigrationPage,
  requiredPermissions: null,
  featureFlagName: 'enableMigrationFlow',
});
