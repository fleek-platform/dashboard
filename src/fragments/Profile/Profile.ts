import { ProfileSettingsLayout } from './Settings/Layout';
import { CreateApiToken } from './Settings/Sections/ApiTokens/CreateApiToken/CreateApiToken';
import { ManageApiTokens } from './Settings/Sections/ApiTokens/ManageApiTokens/ManageApiTokens';
import { ChangeAvatar } from './Settings/Sections/ChangeAvatar';
import { CreatePAT } from './Settings/Sections/CreatePAT/CreatePAT';
import { DeleteUser } from './Settings/Sections/DeleteUser/DeleteUser';
import { LoginConnections } from './Settings/Sections/LoginConnections';
import { ManageConnections } from './Settings/Sections/ManageConnections';
import { ManagePAT } from './Settings/Sections/ManagePAT/ManagePAT';
import { ManageProjects } from './Settings/Sections/ManageProjects';
import { ManageNotifications } from './Settings/Sections/Notifications/ManageNotifications';
import { Project } from './Settings/Sections/Project';
import { RenameUser } from './Settings/Sections/RenameUser';

export const Profile = {
  Settings: {
    Layout: ProfileSettingsLayout,

    Sections: {
      RenameUser,
      ChangeAvatar,
      DeleteUser,
      Project,
      ManageProjects,
      CreatePAT,
      CreateApiToken,
      ManagePAT,
      ManageApiTokens,
      LoginConnections,
      ManageConnections,
      ManageNotifications,
    },
  },
};
