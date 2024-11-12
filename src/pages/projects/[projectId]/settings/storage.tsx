import { constants } from '@/constants';
import { Projects } from '@/fragments';
import { UpdateProjectDataInput } from '@/generated/graphqlClient';
import { useUpdateProject } from '@/hooks/useUpdateProject';
import { Page } from '@/types/App';
import { StorageProviderValue } from '@/types/StorageProviders';
import { withAccess } from '@/utils/withAccess';

const StoragePage: Page = () => {
  const { update: updateProject } = useUpdateProject();

  // eslint-disable-next-line fleek-custom/valid-argument-types
  const handleSaveChanges = async (cloudStorage: StorageProviderValue) => {
    const data: UpdateProjectDataInput = {};

    switch (cloudStorage) {
      case 'arweave':
        data.backupStorageOnArweave = true;
        data.backupStorageOnFilecoin = false;
        break;
      case 'filecoin':
        data.backupStorageOnArweave = false;
        data.backupStorageOnFilecoin = true;
        break;
      default:
        data.backupStorageOnArweave = true;
        data.backupStorageOnFilecoin = true;
    }

    await updateProject({
      updateProjectArgs: data,
      successMessage: 'Default storage changed successfully',
    });
  };

  return (
    <>
      <Projects.Settings.Sections.Storage.StorageNotifications />
      <Projects.Settings.Sections.Storage.Provider
        onSaveSubmit={handleSaveChanges}
      >
        <Projects.Settings.Sections.Storage.CloudStorage />
      </Projects.Settings.Sections.Storage.Provider>
    </>
  );
};

StoragePage.getLayout = (page) => (
  <Projects.Settings.Layout>{page}</Projects.Settings.Layout>
);

export default withAccess({
  Component: StoragePage,
  requiredPermissions: [constants.PERMISSION.STORAGE.EDIT_SETTINGS],
});
