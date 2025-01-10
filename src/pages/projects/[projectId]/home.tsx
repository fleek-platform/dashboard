import { routes } from '@fleek-platform/utils-routes';

import { constants } from '@/constants';
import { Projects } from '@/fragments';
import {
  useAcceptInvitationMutation,
  useDeclineInvitationMutation,
  useInvitationQuery,
  useListFolderQuery,
  useMeQuery,
  useProjectsQuery,
  useSitesQuery,
} from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { Page } from '@/types/App';
import { useAuthContext } from '@/providers/AuthProvider';

const HomePage: Page = () => {
  const auth = useAuthContext();
  const router = useRouter();
  const toast = useToast();

  const invitationHashQueryParam = router.query.invitation;
  const projectId = router.query.projectId!;

  // fetch invitation data from hash (when a user is invited through link)
  const [invitationQuery, refetchInvitationQuery] = useInvitationQuery({
    variables: { where: { hash: invitationHashQueryParam || '' } },
    pause: !invitationHashQueryParam || !auth.tokenProjectId,
  });

  // fetch invitation data when is invited through email
  const [meQuery, refetchMeQuery] = useMeQuery({ pause: !auth.tokenProjectId });

  useSitesQuery({
    variables: {
      where: {},
      filter: { take: constants.SITES_PAGE_SIZE, page: 1 },
    },
    pause: !auth.tokenProjectId,
  });
  useListFolderQuery({
    variables: {
      where: {},
      filter: { take: constants.SITES_PAGE_SIZE, page: 1 },
    },
    pause: !auth.tokenProjectId,
  });

  const [, acceptInvitation] = useAcceptInvitationMutation();
  const [, declineInvitation] = useDeclineInvitationMutation();
  const [, refetchProjectsQuery] = useProjectsQuery({
    variables: {},
    pause: !auth.token,
  });

  const handleAcceptInvitation = async (invitationHash: string) => {
    try {
      const acceptInvitationResult = await acceptInvitation({
        where: { hash: invitationHash },
      });

      if (!acceptInvitationResult.data?.acceptInvitation) {
        throw (
          acceptInvitationResult.error ||
          new Error('Error trying to accept invitation')
        );
      }

      // TODO handle this through cache update
      if (invitationHashQueryParam) {
        // means it's through link invitation
        refetchInvitationQuery({ requestPolicy: 'network-only' });
      } else {
        // means it's through email invitation
        refetchMeQuery({ requestPolicy: 'network-only' });
      }

      // update projects list
      refetchProjectsQuery({ requestPolicy: 'network-only' });

      return new Promise((resolve) => {
        setTimeout(() => {
          toast.success({ message: 'Invitation accepted' });

          router.replace(routes.project.home({ projectId }));

          resolve(true);
        }, 2000);
      });
    } catch (error) {
      toast.error({ error, log: 'Accept invitation failed' });
    }
  };

  const handleDeclineInvitation = async (invitationHash: string) => {
    try {
      const declineInvitationResult = await declineInvitation({
        where: { hash: invitationHash },
      });

      if (!declineInvitationResult.data?.declineInvitation) {
        throw (
          declineInvitationResult.error ||
          new Error('Error trying to accept invitation')
        );
      }

      // TODO handle this through cache update
      if (invitationHashQueryParam) {
        // means it's through link invitation
        refetchInvitationQuery({ requestPolicy: 'network-only' });
      } else {
        // means it's through email invitation
        refetchMeQuery({ requestPolicy: 'network-only' });
      }

      // update projects list
      refetchProjectsQuery({ requestPolicy: 'network-only' });

      return new Promise((resolve) => {
        setTimeout(() => {
          toast.success({ message: 'Invitation declined' });

          router.replace(routes.project.home({ projectId }));

          resolve(true);
        }, 2000);
      });
    } catch (error) {
      toast.error({ error, log: 'Decline invitation failed' });
    }
  };

  // TODO handle error for fetching invitation

  const userPendingInvitations = meQuery.data?.user.pendingInvitations || [];

  return (
    <>
      {(invitationQuery.fetching ||
        invitationQuery.data?.invitation ||
        userPendingInvitations.length > 0) && (
        <Projects.Home.Sections.Invitation
          isLoading={invitationQuery.fetching}
          invitationHash={
            invitationHashQueryParam || userPendingInvitations[0]?.hash
          }
          projectId={invitationQuery.data?.invitation.projectId}
          projectName={
            invitationQuery.data?.invitation.projectName ||
            userPendingInvitations[0]?.projectName
          }
          avatarSrc={
            invitationQuery.data?.invitation.projectAvatar ||
            userPendingInvitations[0]?.projectAvatar
          }
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
