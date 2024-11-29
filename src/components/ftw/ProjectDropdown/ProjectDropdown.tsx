import { useProjectsQuery } from '@/generated/graphqlClient';
import { useProjectContext } from '@/providers/ProjectProvider';
import { useSessionContext } from '@/providers/SessionProvider';
import type { Project } from '@/types/Project';
import {
  Avatar,
  AvatarMarble,
  Box,
  Icon,
  Scrollable,
  SidebarDropdown,
  Skeleton,
  Text,
} from '@/ui';
import { cn } from '@/utils/cn';

import { CreateProject } from '../../CreateProject/CreateProject';

type ProjectDropdownAvatarProps = { project: Project; className: string };

const ProjectDropdownAvatar: React.FC<ProjectDropdownAvatarProps> = ({
  project,
  className,
}) => {
  if (!project.avatar) {
    return (
      <AvatarMarble name={project.id} className={cn('shrink-0', className)} />
    );
  }

  return (
    <Avatar
      enableIcon
      icon="image"
      title={project.id}
      src={project.avatar}
      className={cn('shrink-0', className)}
    />
  );
};

type HandleProjectChangeProps = Project;

export const ProjectDropdown: React.FC = () => {
  const session = useSessionContext(true);
  const projectContext = useProjectContext();

  const [projectsQuery] = useProjectsQuery();
  const { setIsCreateProjectModalOpen } = useProjectContext();

  const handleProjectChange = (project: HandleProjectChangeProps) =>
    session.setProject(project.id);
  const handleCreateProjectClick = () => setIsCreateProjectModalOpen(true);

  const selectedProject = projectContext.project;
  const projects =
    projectsQuery.data?.projects.data.filter(
      (project) => project.id !== selectedProject.id,
    ) || [];
  const isLoading = projectContext.loading;

  if (isLoading) {
    return (
      <Box className="p-2.5 flex-row items-center h-[3.375rem] gap-3 bg-neutral-1 border border-neutral-6 rounded-lg">
        <Skeleton className="size-[2rem] rounded" />
        <Box className="w-1/2 gap-2">
          <Skeleton variant="text" className="h-2.5 w-1/2" />
          <Skeleton variant="text" className="h-2.5" />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <SidebarDropdown.Root>
        <SidebarDropdown.Trigger className="group rounded-lg focus-visible:ring-2 focus-visible:ring-neutral-8">
          <Box className="p-2.5 flex-row items-center justify-between bg-neutral-1 hover:bg-neutral-2 border border-neutral-6 rounded-lg transition-colors group-data-[state=open]:rounded-b-none group-data-[state=open]:border-b-transparent">
            <Box className="flex-row gap-3 items-center">
              <ProjectDropdownAvatar
                project={selectedProject}
                className="rounded size-7"
              />
              <Box className="select-none">
                <Text size="xs">Project</Text>
                <Text
                  as="span"
                  variant="primary"
                  weight={500}
                  className="line-clamp-1"
                >
                  {selectedProject.name}
                </Text>
              </Box>
            </Box>
            <Box className="group-hover:bg-neutral-3 items-center justify-center size-[1.75rem] rounded transition-colors shrink-0">
              <Icon
                name="chevron-down"
                className="group-data-[state=open]:rotate-180 transition-all"
              />
            </Box>
          </Box>
        </SidebarDropdown.Trigger>
        <SidebarDropdown.Content className="data-[state=open]:animate-fade-in-top -mt-[1px] w-[14.438rem] flex flex-col gap-2.5 p-2.5 pt-1 bg-neutral-1 border border-t-0 rounded-b-lg border-neutral-6 shadow-xl z-20">
          {!!projects.length && (
            <>
              <SidebarDropdown.Separator />
              <Scrollable.Root>
                <Scrollable.Viewport className="max-h-[calc(100vh-18.75rem)]">
                  <Scrollable.VerticalBar />
                  <Box className="gap-2">
                    {projects.map((project) => (
                      <SidebarDropdown.Item
                        key={project.id}
                        onClick={() => handleProjectChange(project)}
                      >
                        <ProjectDropdownAvatar
                          project={project}
                          className="rounded-sm size-4"
                        />
                        <Text className="line-clamp-1">{project.name}</Text>
                      </SidebarDropdown.Item>
                    ))}
                  </Box>
                </Scrollable.Viewport>
              </Scrollable.Root>
            </>
          )}
          <SidebarDropdown.Separator />
          <SidebarDropdown.Item onClick={handleCreateProjectClick}>
            <Icon name="add-circle" className="text-accent-11" /> Create project
          </SidebarDropdown.Item>
        </SidebarDropdown.Content>
      </SidebarDropdown.Root>

      <CreateProject />
    </>
  );
};
