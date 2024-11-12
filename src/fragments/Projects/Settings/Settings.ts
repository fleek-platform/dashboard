import { AllowAccessFromOfacCountriesSwitch } from '@/fragments/Settings/AllowAccessFromOfacCountries/AllowAccessFromOfacCountriesSwitch';

import { ExtendedLayout } from './ExtendedLayout';
import { AddApplicationCredentials } from './Sections/ApplicationCredentials/AddApplicationCredentials';
import { ManageApplicationCredentials } from './Sections/ApplicationCredentials/ManageApplicationCredentials';
import { BillingPlan } from './Sections/Billing/BillingPlan/BillingPlan';
import { CurrentUsage } from './Sections/Billing/CurrentUsage/CurrentUsage';
import { Invoices } from './Sections/Billing/Invoices/Invoices';
import { PaymentMethod } from './Sections/Billing/PaymentMethod/PaymentMethod';
import { DeleteProject } from './Sections/DeleteProject/DeleteProject';
import { AddDomainModal } from './Sections/PrivateGateways/AddDomainModal';
import { DeletePrivateGatewayProvider } from './Sections/PrivateGateways/DeletePrivateGateway.context';
import { DeletePrivateGatewayModal } from './Sections/PrivateGateways/DeletePrivateGatewayModal';
import { PrivateGatewayProvider } from './Sections/PrivateGateways/PrivateGateway.context';
import { PrivateGateways } from './Sections/PrivateGateways/PrivateGateways';
import { PrivateGatewaysList } from './Sections/PrivateGateways/PrivateGatewaysList';
import { ProjectLogo } from './Sections/ProjectLogo';
import { RenameProject } from './Sections/RenameProject';
import { CloudStorage } from './Sections/Storage/CloudStorage';
import { StorageNotifications } from './Sections/Storage/StorageNotifications';
import { StorageSettingsProvider } from './Sections/Storage/StorageSettings.context';
import { AddTeamMember } from './Sections/Team/AddTeamMember';
import { TeamInvitationsList } from './Sections/Team/TeamInvitationsList';
import { TeamProjectList } from './Sections/Team/TeamProjectList';

export const Settings = {
  Layout: ExtendedLayout,

  Sections: {
    PrivateGateways: {
      Main: PrivateGateways,
      List: PrivateGatewaysList,
      Provider: PrivateGatewayProvider,
      AddDomainModal,

      Delete: {
        Modal: DeletePrivateGatewayModal,
        Provider: DeletePrivateGatewayProvider,
      },
    },

    RenameProject,
    ProjectLogo,
    DeleteProject,
    AllowAccessFromOfacCountriesSwitch,

    ApplicationCredentials: {
      Add: AddApplicationCredentials,
      Manage: ManageApplicationCredentials,
    },

    Team: {
      AddTeamMember,
      TeamInvitationsList,
      TeamProjectList,
    },
    Storage: {
      CloudStorage,
      StorageNotifications,
      Provider: StorageSettingsProvider,
    },

    Billing: {
      CurrentUsage,
      Plan: BillingPlan,
      PaymentMethod,
      Invoices,
    },
  },
};
