import { useEffect, useState } from 'react';

import { BadgeText, CreateProject, ExternalLink, Link } from '@/components';
import { constants } from '@/constants';
import {
  useDeploymentStatusQuery,
  useProjectsQuery,
  useSiteQuery,
} from '@/generated/graphqlClient';
import { useMediaQueryWindow } from '@/hooks/useMediaQueryWindow';
import { useRouter } from '@/hooks/useRouter';
import { useFeedbackModal } from '@/providers/FeedbackModalProvider';
import { useProjectContext } from '@/providers/ProjectProvider';
import { useSessionContext } from '@/providers/SessionProvider';
import { Project } from '@/types/Project';
import { ChildrenProps } from '@/types/Props';
import { Box, Skeleton } from '@/ui';

import { Navbar } from '../Navbar/Navbar';
import { ProjectDropdown } from './ProjectDropdown/ProjectDropdown';
import { UserMenu } from './UserMenu/UserMenu';

type NavbarProjectProps = ChildrenProps;

export const NavbarProject: React.FC<NavbarProjectProps> = ({ children }) => {
  const router = useRouter();
  const projectContext = useProjectContext();
  const session = useSessionContext();
  const { openModalWithTab } = useFeedbackModal();

  const [enableNavigation, setEnableNavigation] = useState(true);
  const isDesktop = useMediaQueryWindow('(min-width: 768px)');

  const siteId = router.query.siteId!;
  const deploymentId = router.query.deploymentId!;

  const [projectsQuery] = useProjectsQuery({
    pause: !projectContext.accessTokenProjectId,
    variables: {},
  });
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
          <Skeleton variant="text" className="w-[8.75rem] h-6" />
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
        <Box className="flex-row gap-3 text-sm font-medium">
          <BadgeText colorScheme="yellow">Internal User</BadgeText>
          <ExternalLink href={constants.EXTERNAL_LINK.FLEEK_DOCS}>
            Docs
          </ExternalLink>
          <ExternalLink href={constants.EXTERNAL_LINK.FLEEK_SUPPORT}>
            Help
          </ExternalLink>
          <Link href="#" onClick={() => openModalWithTab('FEEDBACK')}>
            Feedback
          </Link>
        </Box>
      )}

      <UserMenu />
    </Navbar.Container>
  );
};
