import { routes } from '@fleek-platform/utils-routes';
import { useMemo, useState } from 'react';

import { BadgeText, SettingsBox, SettingsListItem } from '@/components';
import {
  Project,
  Role,
  useLeaveProjectMutation,
  useMeQuery,
  useProjectsQuery,
} from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { useCookies } from '@/providers/CookiesProvider';
import { Icon } from '@/ui';
import { firstLetterUpperCase } from '@/utils/stringFormat';

export const ManageProjects: React.FC = () => {
  const router = useRouter();
  const cookies = useCookies();
  const toast = useToast();
  const [meQuery] = useMeQuery();
  const [projectsQuery] = useProjectsQuery();
  const [, leaveProject] = useLeaveProjectMutation();
  const [leavingProjects, setLeavingProjects] = useState<Project['id'][]>([]);

  const projects = projectsQuery.data?.projects.data;

  const isLoading = useMemo(
    () => meQuery.fetching || projectsQuery.fetching,
    [meQuery.fetching, projectsQuery.fetching],
  );

  if (isLoading) {
    return (
      <SettingsBox.Container>
        <SettingsBox.Title>Manage Projects</SettingsBox.Title>
        <SettingsBox.Text>
          Manage projects you own, or that you are a part of.
        </SettingsBox.Text>
        <SettingsListItem.Skeleton enableAvatar />
        <SettingsListItem.Skeleton enableAvatar />
        <SettingsListItem.Skeleton enableAvatar />
      </SettingsBox.Container>
    );
  }

  const handleViewProject = ({ projectId }: HandleViewProjectProps) => {
    cookies.set('projectId', projectId);
    router.push(routes.project.home({ projectId }));
  };

  const handleLeaveProject = async ({ projectId }: HandleLeaveProjectProps) => {
    setLeavingProjects([...leavingProjects, projectId]);
    try {
      const result = await leaveProject({ where: { projectId } });

      if (!result.data) {
        throw result.error || Error('Error trying to leave project');
      }
    } catch (error) {
      toast.error({ error, log: 'Failed to leave Project' });
    }
  };

  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Manage Projects</SettingsBox.Title>
      <SettingsBox.Text>
        Manage projects you own, or that you are a part of.
      </SettingsBox.Text>
      {projects?.map((project) => {
        const projectMembershipRole =
          project.currentUserMembership.permissionGroup.name || '';
        const membershipLabel = firstLetterUpperCase(
          projectMembershipRole.toLowerCase(),
        );

        return (
          <SettingsListItem
            key={project.id}
            title={project.name}
            subtitle={membershipLabel}
            avatarSrc={project.avatar || ''}
            marbleSrc={project.id}
          >
            {leavingProjects.includes(project.id) && (
              <BadgeText colorScheme="slate">
                Leaving <Icon name="spinner" />
              </BadgeText>
            )}
            {projects?.length > 1 && (
              <SettingsListItem.DropdownMenu
                isDisabled={leavingProjects.includes(project.id)}
              >
                <SettingsListItem.DropdownMenuItem
                  icon="arrow-up-right"
                  onClick={() => handleViewProject({ projectId: project.id })}
                >
                  View
                </SettingsListItem.DropdownMenuItem>

                {/* TO CONSIDER: now we have the name permission as Owner by default, 
                  but if in the future we allow users to change the name of the permission group,
                  we'll have yo check the role in a different way since ROLE is gonna be deprecated */}

                {projectMembershipRole.toUpperCase() !== Role.OWNER && (
                  <>
                    <SettingsListItem.DropdownMenuSeparator />
                    <SettingsListItem.DropdownMenuItem
                      icon="close-circle"
                      onClick={() =>
                        handleLeaveProject({ projectId: project.id })
                      }
                    >
                      Leave Project
                    </SettingsListItem.DropdownMenuItem>
                  </>
                )}
              </SettingsListItem.DropdownMenu>
            )}
          </SettingsListItem>
        );
      })}
    </SettingsBox.Container>
  );
};

type HandleLeaveProjectProps = {
  projectId: Project['id'];
};

type HandleViewProjectProps = {
  projectId: Project['id'];
};
