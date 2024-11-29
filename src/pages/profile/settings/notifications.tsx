import { Profile } from '@/fragments';
import type { Page } from '@/types/App';

const NotificationsPage: Page = () => {
  return <Profile.Settings.Sections.ManageNotifications />;
};

NotificationsPage.getLayout = (page) => (
  <Profile.Settings.Layout>{page}</Profile.Settings.Layout>
);

export default NotificationsPage;
