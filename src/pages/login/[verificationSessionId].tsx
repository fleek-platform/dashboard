import { routes } from '@fleek-platform/utils-routes';
import { useCallback } from 'react';

import { ExternalLink } from '@/components';
import { constants } from '@/constants';
import { Login } from '@/fragments';
import { useCreateLoginVerificationSessionMutation } from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { useSessionContext } from '@/providers/SessionProvider';
import { Page } from '@/types/App';
import { Button } from '@/ui';
import { Log } from '@/utils/log';

const LoginWithSessionPage: Page = () => {
  const router = useRouter();
  const session = useSessionContext();

  const [
    createLoginVerificationSessionMutation,
    createLoginVerificationSession,
  ] = useCreateLoginVerificationSessionMutation();

  const handleCliLoginReset = async () => {
    window.location.reload();
  };

  const handleRedirect = useCallback(() => {
    return router.replace(
      routes.project.home({ projectId: session.project.id }),
    );
  }, [router, session.project.id]);

  const handleCreateVerificationSession = useCallback(async () => {
    try {
      const result = await createLoginVerificationSession({
        where: { id: router.query.verificationSessionId! },
      });

      if (result.error) {
        throw result.error;
      }
    } catch (error) {
      Log.error('Failed to create login verification session', error);
    }
  }, [createLoginVerificationSession, router.query.verificationSessionId]);

  if (
    createLoginVerificationSessionMutation?.data?.createLoginVerificationSession
  ) {
    return (
      <Login.Dialog
        heading="Sign in Successful"
        description="You are now authenticated, continue in the CLI or visit your Fleek dashboard."
      >
        <Button onClick={handleRedirect} className="w-full">
          Visit dashboard
        </Button>
        <ExternalLink href={constants.EXTERNAL_LINK.FLEEK_DOCS_CLI}>
          <Button intent="neutral" className="w-full">
            Go to docs
          </Button>
        </ExternalLink>
      </Login.Dialog>
    );
  }

  if (createLoginVerificationSessionMutation?.error) {
    return (
      <Login.Dialog
        heading="Creating session failed"
        description="We attempted to create a verification session that is necessary to process CLI authentication. Please try resetting the login flow by clicking the button below."
      >
        <Button onClick={handleCliLoginReset}>Try again</Button>
      </Login.Dialog>
    );
  }

  if (
    session.auth.accessToken &&
    !createLoginVerificationSessionMutation?.data
      ?.createLoginVerificationSession
  ) {
    return (
      <Login.Dialog
        heading="Confirm sign in to CLI"
        description="Confirm the authentication with the Fleek CLI"
      >
        <Button
          onClick={handleCreateVerificationSession}
          loading={createLoginVerificationSessionMutation?.fetching}
          className="w-full"
        >
          Confirm
        </Button>
        <Button onClick={handleRedirect} intent="neutral" className="w-full">
          Cancel
        </Button>
      </Login.Dialog>
    );
  }

  return (
    <Login.Dialog
      heading="Sign in to Fleek via CLI"
      description="Using the CLI we will need you to auth into the platform, use the button below to get started."
      withExternalLink
    >
      <Button
        onClick={() => session.auth.login('dynamic')}
        loading={session.loading}
        className="w-full"
      >
        Sign in
      </Button>
    </Login.Dialog>
  );
};

LoginWithSessionPage.getLayout = (page) => <Login.Layout>{page}</Login.Layout>;

export default LoginWithSessionPage;
