import { LearnMoreMessage, SettingsBox } from '@/components';
import { constants } from '@/constants';
import { useProjectContext } from '@/providers/ProjectProvider';
import { Button } from '@/ui';

export const Project: React.FC = () => {
  const { setIsCreateProjectModalOpen } = useProjectContext();

  const handleCreateProject = (): void => {
    setIsCreateProjectModalOpen(true);
  };

  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Projects</SettingsBox.Title>
      <SettingsBox.Text>
        Projects are used to organize your sites and storage on Fleek.
      </SettingsBox.Text>

      <SettingsBox.ActionRow>
        <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_DOCS_PROJECTS}>
          Projects
        </LearnMoreMessage>
        <Button onClick={handleCreateProject}>Create project</Button>
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};
