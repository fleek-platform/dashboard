import { constants } from '@/constants';
import { Projects } from '@/fragments';
import { Page } from '@/types/App';
import { withAccess } from '@/utils/withAccess';

const Storage: Page = () => {
  return (
    <Projects.Storage.Provider>
      <Projects.Storage.ButtonsContainer />
      <Projects.Storage.StorageTable />
      <Projects.Storage.Widget />
    </Projects.Storage.Provider>
  );
};

Storage.getLayout = (page) => (
  <Projects.Layout>{page}</Projects.Layout>
);

export default withAccess({
  Component: Storage,
  requiredPermissions: [constants.PERMISSION.STORAGE.VIEW_LIST],
});
