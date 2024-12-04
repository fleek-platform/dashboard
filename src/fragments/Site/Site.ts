import { Analytics } from './Analytics/Analytics';
import { Audit } from './Audit/Audit';
import { Deployments } from './Deployments/Deployments';
import { SiteLayout } from './Layout';
import { Onchain } from './Onchain/Onchain';
import { Analytics as AnalyticsOverview } from './Overview/Analytics/Analytics';
import { Performance } from './Overview/Performance/Performance';
import { RecentDeploy } from './Overview/RecentDeploy';
import { SelfManagedBanner } from './Overview/SelfManagedBanner';
import { SelfManagedPolling } from './Overview/SelfManagedPolling/SelfManagedPolling';
import { SelfManagedSetup } from './Overview/SelfManagedSetup/SelfManagedSetup';
import { SiteOverview } from './Overview/SiteOverview';
import { Settings } from './Settings/Settings';
import { SiteList, SkeletonList } from './SiteList/SiteList';

export const Site = {
  Layout: SiteLayout,

  Elements: {
    Analytics: AnalyticsOverview,
    List: SiteList,
    SkeletonList: SkeletonList,
    Overview: SiteOverview,
    SelfManaged: {
      Banner: SelfManagedBanner,
      Setup: SelfManagedSetup,
      Polling: SelfManagedPolling,
    },
    Performance,
    RecentDeploy,
  },

  Onchain,

  Audit,
  Deployments,
  Settings,
  Analytics,
};
