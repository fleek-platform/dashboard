import { routes } from '@fleek-platform/utils-routes';
import { useState } from 'react';
import { useClient } from 'urql';

import { constants } from '@/constants';
import { Projects } from '@/fragments';
import {
  ProjectsDocument,
  useAcceptInvitationMutation,
  useDeclineInvitationMutation,
  useInvitationQuery,
  useListFolderQuery,
  useMeQuery,
  useSitesQuery,
} from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { useAuthContext } from '@/providers/AuthProvider';
import { useCookies } from '@/providers/CookiesProvider';
import { useSessionContext } from '@/providers/SessionProvider';
import { Page } from '@/types/App';

const useFetchInvitation = () => {
  const auth = useAuthContext();
  const router = useRouter();
  const invitationHash = router.query.invitation;
  const [cachedInvitationHash, setCachedInvitationHash] =
    useState(invitationHash);

  if (invitationHash && invitationHash !== cachedInvitationHash) {
    // this is safe
    setCachedInvitationHash(invitationHash);
  }

  // fetch invitation data from hash (when a user is invited through link)
  const [invitationQuery] = useInvitationQuery({
    variables: { where: { hash: cachedInvitationHash! } },
    pause: !cachedInvitationHash,
  });

  const linkInvitation = invitationQuery.data?.invitation;

  // fetch invitation data when is invited through email
  const [meQuery] = useMeQuery({ pause: !auth.accessToken });

  // TODO really we should show all invitations, not only the first one
  const userPendingInvitation = meQuery.data?.user?.pendingInvitations?.[0];

  return {
    invitation: linkInvitation ?? userPendingInvitation,
    isFetchingInvitation: invitationQuery.fetching || meQuery.fetching,
  };
};

const HomePage: Page = () => {
  const session = useSessionContext();
  const toast = useToast();
  const router = useRouter();
  const cookies = useCookies();

  const projectId = router.query.projectId!;

  useSitesQuery({
    variables: {
      where: {},
      filter: { take: constants.SITES_PAGE_SIZE, page: 1 },
    },
    pause: !session.accesTokenProjectId,
  });

  useListFolderQuery({
    variables: {
      where: {},
      filter: { take: constants.SITES_PAGE_SIZE, page: 1 },
    },
    pause: !session.accesTokenProjectId,
  });

  const client = useClient();

  const [, acceptInvitation] = useAcceptInvitationMutation();
  const [, declineInvitation] = useDeclineInvitationMutation();

  const { invitation, isFetchingInvitation } = useFetchInvitation();

  const [hideInvitation, setHideInvitation] = useState(false);

  const handleAcceptInvitation = async () => {
    try {
      const acceptInvitationResult = await acceptInvitation({
        where: { hash: invitation!.hash },
      });

      if (!acceptInvitationResult.data?.acceptInvitation) {
        throw (
          acceptInvitationResult.error ||
          new Error('Error trying to accept invitation')
        );
      }

      toast.success({ message: 'Invitation accepted' });

      await client.query(
        ProjectsDocument,
        {},
        {
          requestPolicy: 'network-only',
        },
      );

      setHideInvitation(true);
      cookies.set('projectId', invitation!.projectId);
    } catch (error) {
      toast.error({ error, log: 'Accept invitation failed' });
    }
  };

  const handleDeclineInvitation = async () => {
    console.log(`[debug] [projectId]/home.tsx: handleDeclineInvitation: 1`)
    try {
      const declineInvitationResult = await declineInvitation({
        where: { hash: invitation!.hash },
      });

      if (!declineInvitationResult.data?.declineInvitation) {
        throw (
          declineInvitationResult.error ||
          new Error('Error trying to accept invitation')
        );
      }

      setHideInvitation(true);
      toast.success({ message: 'Invitation declined' });
      router.replace(routes.project.home({ projectId }));
    } catch (error) {
      toast.error({ error, log: 'Decline invitation failed' });
    }
  };

  const showInvitation =
    (isFetchingInvitation || !!invitation) && !hideInvitation;

  return (
    <>
      {showInvitation && (
        <Projects.Home.Sections.Invitation
          isLoading={isFetchingInvitation}
          projectId={invitation?.projectId}
          projectName={invitation?.projectName}
          avatarSrc={invitation?.projectAvatar}
          onAcceptInvitation={handleAcceptInvitation}
          onDeclineInvitation={handleDeclineInvitation}
        />
      )}
      <Projects.Home.Grid>
        <Projects.Home.Sections.Main />
        <Projects.Home.Sections.LocalDevelopment />
        <Projects.Home.MainSites />
        <Projects.Home.Sections.OutsideLinks />
        <Projects.Home.Sections.Articles />
        <Projects.Home.Sections.Templates />
      </Projects.Home.Grid>
    </>
  );
};

const PageNavContent: React.FC = () => {
  return <Projects.Home.AddNewDropdown />;
};

HomePage.getLayout = (page) => (
  <Projects.Layout nav={<PageNavContent />}>{page}</Projects.Layout>
);

export default HomePage;
