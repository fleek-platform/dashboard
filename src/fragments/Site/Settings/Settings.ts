import { ExtendedLayout } from './ExtendedLayout';
import { CustomDomains } from './Sections/CustomDomains/CustomDomains';
import { DeleteSite } from './Sections/DeleteSite/DeleteSite';
import { DeployContexts } from './Sections/DeployContexts';
import { AddEnvironmentVariable } from './Sections/EnvironmentVariables/AddEnvironmentVariable';
import { ManageEnvironmentVariables } from './Sections/EnvironmentVariables/ManageEnvironmentVariables';
import { PurgeCache } from './Sections/PurgeCache';
import { RenameSite } from './Sections/RenameSite';
import { SiteBuild } from './Sections/SiteBuild';
import { SiteGit } from './Sections/SiteGit';
import { SiteLogo } from './Sections/SiteLogo/SiteLogo';
import { SiteSlug } from './Sections/SiteSlug/SiteSlug';

export const Settings = {
  Layout: ExtendedLayout,

  Sections: {
    RenameSite,
    SiteLogo,
    SiteSlug,
    PurgeCache,
    DeleteSite,
    CustomDomains,
    SiteBuild,
    DeployContexts,
    AddEnvironmentVariable,
    ManageEnvironmentVariables,
    Git: SiteGit,
  },
};
