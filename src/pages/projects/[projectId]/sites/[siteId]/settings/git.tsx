import { constants } from '@/constants';
import { Site } from '@/fragments';
import { Page } from '@/types/App';
import { withAccess } from '@/utils/withAccess';

const GitSettingsPage: Page = () => {
  return <Site.Settings.Sections.Git />;
};

GitSettingsPage.getLayout = (page) => <Site.Settings.Layout>{page}</Site.Settings.Layout>;

export default withAccess({
  Component: GitSettingsPage,
  requiredPermissions: [constants.PERMISSION.SITE.ADD_GIT_INTEGRATION, constants.PERMISSION.SITE.REMOVE_GIT_INTEGRATION],
});
