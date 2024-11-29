import { routes } from '@fleek-platform/utils-routes';

import { Link } from '@/components';
import { useProjectContext } from '@/providers/ProjectProvider';
import { useSessionContext } from '@/providers/SessionProvider';
import type { Project } from '@/types/Project';
import { Avatar, AvatarMarble, Icon, Menu } from '@/ui';

import { ProjectDropdownStyles as S } from './ProjectDropdown.styles';
import { RenameBadge } from './RenameBadge';

type MenuItemProps = {
  project: Project;
  selectedProject?: Project;
  onClick: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({
  project,
  selectedProject,
  onClick,
}) => {
  return (
    <S.MenuItem.Wrapper
      checked={selectedProject?.id === project.id}
      onClick={onClick}
    >
      <S.MenuItem.Container>
        {project.avatar ? (
          <Avatar title={project.id} src={project.avatar} />
        ) : (
          <AvatarMarble name={project.id} rounded />
        )}{' '}
        {project.name}
      </S.MenuItem.Container>
      {project.id === selectedProject?.id && (
        <Menu.ItemIndicator>
          <Icon name="check" />
        </Menu.ItemIndicator>
      )}
    </S.MenuItem.Wrapper>
  );
};

export type ProjectDropdownProps = {
  selectedProject?: Project;
  projects: Project[];
  onProjectChange: (project: Project) => void;
};

export const ProjectDropdown: React.FC<ProjectDropdownProps> = ({
  projects,
  selectedProject,
  onProjectChange,
}) => {
  const session = useSessionContext();
  const projectId = session.project.id;
  // eslint-disable-next-line fleek-custom/valid-argument-types
  const { setIsCreateProjectModalOpen } = useProjectContext();

  // eslint-disable-next-line fleek-custom/valid-argument-types
  const handleProjectChange = (project: Project): void => {
    onProjectChange(project);
  };

  const handleCreateProjectClick = (): void => {
    setIsCreateProjectModalOpen(true);
  };

  return (
    <Menu.Root>
      <Menu.Trigger>
        <S.ProjectSelected>
          <Link
            href={routes.project.home({ projectId })}
            className="flex gap-2.5 items-center text-neutral-12"
          >
            {selectedProject?.avatar ? (
              <Avatar
                enableIcon
                icon="image"
                title={selectedProject?.id}
                src={selectedProject?.avatar}
              />
            ) : (
              <AvatarMarble name={selectedProject?.id} rounded />
            )}
            {selectedProject?.name}
          </Link>

          <Icon name="caret-sort" />
        </S.ProjectSelected>
      </Menu.Trigger>

      <RenameBadge selectedProject={selectedProject} />

      <Menu.Content align="center">
        <Menu.Label>Projects</Menu.Label>
        <S.Scrollable.Root type="auto">
          <S.Scrollable.Viewport scrollbarEnabled={projects.length > 5}>
            <S.Scrollable.Content>
              {projects.map((project) => (
                <MenuItem
                  key={project.id}
                  project={project}
                  selectedProject={selectedProject}
                  onClick={() => handleProjectChange(project)}
                />
              ))}
            </S.Scrollable.Content>
          </S.Scrollable.Viewport>

          <S.Scrollable.Bar />
        </S.Scrollable.Root>
        <Menu.Separator />
        <S.CreateProject.MenuItem onClick={handleCreateProjectClick}>
          <Icon name="add-circle" />
          Create project
        </S.CreateProject.MenuItem>
      </Menu.Content>
    </Menu.Root>
  );
};
