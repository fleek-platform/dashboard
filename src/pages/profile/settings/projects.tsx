import { Profile } from '@/fragments';
import { Page } from '@/types/App';

const ProjectSettingsPage: Page = () => {
  return (
    <>
      <Profile.Settings.Sections.Project />
      <Profile.Settings.Sections.ManageProjects />
    </>
  );
};

ProjectSettingsPage.getLayout = (page) => <Profile.Settings.Layout>{page}</Profile.Settings.Layout>;

export default ProjectSettingsPage;
