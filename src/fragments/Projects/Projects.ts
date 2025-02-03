import { AgentsList } from './Agents/AgentsList';
import { AddNewDropdown } from './Home/AddNewDropdown';
import { HomeStyles } from './Home/Home.styles';
import { Articles } from './Home/Sections/Articles';
import { Invitation } from './Home/Sections/Invitation/Invitation';
import { LocalDevelopment } from './Home/Sections/LocalDevelopment';
import { Main } from './Home/Sections/Main';
import { MainSites } from './Home/Sections/MainSites';
import { OutsideLinks } from './Home/Sections/OutsideLinks';
import { HomeTemplates } from './Home/Sections/Templates';
import { Layout } from './Layout';
import { Settings } from './Settings/Settings';
import { AddSiteDropdown } from './Sites/AddSiteDropdown';
import { EmptyMessage } from './Sites/EmptyMessage';
import { Templates } from './Sites/Templates';
import { ButtonsContainer } from './Storage/ButtonsContainer';
import { StorageProvider } from './Storage/Storage.context';
import { StorageTable } from './Storage/StorageTable/StorageTable';
import { StorageUploadDropdown } from './Storage/StorageUploadDropdown';
import { Widget } from './Storage/Widget';

export const Projects = {
  Layout,

  Sites: {
    AddSiteDropdown,
    EmptyMessage,
    Templates,
  },

  Storage: {
    // fragments
    ButtonsContainer,
    StorageUploadDropdown,
    StorageTable,
    Widget,

    //context
    Provider: StorageProvider,
  },

  Agents: {
    List: AgentsList,
  },

  Home: {
    AddNewDropdown,
    Grid: HomeStyles.Grid,
    MainSites: MainSites,

    Sections: {
      Articles,
      LocalDevelopment,
      Main,
      Invitation,
      OutsideLinks,
      Templates: HomeTemplates,
    },
  },

  Settings,
};
