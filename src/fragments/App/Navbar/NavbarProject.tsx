import { useEffect, useState } from 'react';

import { BadgeText, CreateProject } from '@/components';
import { constants } from '@/constants';
import {
  useDeploymentStatusQuery,
  useProjectsQuery,
  useSiteQuery,
} from '@/generated/graphqlClient';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { useMediaQueryWindow } from '@/hooks/useMediaQueryWindow';
import { useRouter } from '@/hooks/useRouter';
import { useFeedbackModal } from '@/providers/FeedbackModalProvider';
import { useProjectContext } from '@/providers/ProjectProvider';
import { useSessionContext } from '@/providers/SessionProvider';
import type { Project } from '@/types/Project';
import type { ChildrenProps } from '@/types/Props';

import { Navbar } from '../Navbar/Navbar';
import { NavbarStyles as S } from './Navbar.styles';
import { ProjectDropdown } from './ProjectDropdown/ProjectDropdown';
import { UserMenu } from './UserMenu/UserMenu';

type NavbarProjectProps = ChildrenProps;

export const NavbarProject: React.FC<NavbarProjectProps> = ({ children }) => {
  const [projectsQuery] = useProjectsQuery();
  const router = useRouter();
  const projectContext = useProjectContext();
  const session = useSessionContext();
  const flags = useFeatureFlags();
  const { openModal } = useFeedbackModal();

  const [enableNavigation, setEnableNavigation] = useState(true);
  const isDesktop = useMediaQueryWindow('(min-width: 768px)');

  const siteId = router.query.siteId!;
  const deploymentId = router.query.deploymentId!;

  const [siteQuery] = useSiteQuery({
    variables: { where: { id: siteId } },
    pause: !siteId,
  });
  const [deploymentStatusQuery] = useDeploymentStatusQuery({
    variables: { where: { id: deploymentId } },
    pause: !deploymentId,
  });
  // eslint-disable-next-line fleek-custom/valid-argument-types
  const handleProjectChange = (project: Project): void => {
    session.setProject(project.id);
  };

  useEffect(() => {
    setEnableNavigation(isDesktop);
  }, [setEnableNavigation, isDesktop]);

  const projects = projectsQuery.data?.projects.data;
  const shouldShowSkeleton =
    projectContext.loading ||
    siteQuery.fetching ||
    deploymentStatusQuery.fetching;

  return (
    <Navbar.Container layout="project" mobile={!enableNavigation}>
      <CreateProject />
      <Navbar.Logo>
        {shouldShowSkeleton ? (
          <S.Skeleton.Projects />
        ) : (
          <>
            <ProjectDropdown
              projects={projects || []}
              selectedProject={projectContext.project}
              onProjectChange={handleProjectChange}
            />
            {children}
          </>
        )}
      </Navbar.Logo>

      {enableNavigation && (
        <S.Navigation.Container>
          {flags.isInternalUser && (
            <BadgeText colorScheme="yellow">Internal User</BadgeText>
          )}
          <S.Navigation.Link
            href={constants.EXTERNAL_LINK.FLEEK_DOCS}
            target={constants.EXTERNAL_LINK.FLEEK_DOCS}
          >
            Docs
          </S.Navigation.Link>
          <S.Navigation.Link
            href={constants.EXTERNAL_LINK.FLEEK_SUPPORT}
            target={constants.EXTERNAL_LINK.FLEEK_SUPPORT}
          >
            Help
          </S.Navigation.Link>
          <S.Navigation.Link href={'#'} onClick={openModal}>
            Feedback
          </S.Navigation.Link>
        </S.Navigation.Container>
      )}

      <UserMenu />
    </Navbar.Container>
  );
};
