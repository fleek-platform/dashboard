import { Analytics } from './Analytics/Analytics';
import { Audit } from './Audit/Audit';
import { AuditLog } from './AuditLog/AuditLog';
import { CustomDomain } from './CustomDomain/CustomDomain';
import { CustomENS } from './CustomENS/CustomENS';
import { Deployments } from './Deployments/Deployments';
import { Ipfs } from './Ipfs/Ipfs';
import { SiteLayout } from './Layout';
import { Performance } from './Performance/Performance';
import { RecentDeploy } from './RecentDeploy/RecentDeploy';
import { SelfManagedBanner } from './SelfManagedBanner/SelfManagedBanner';
import { SelfManagedPolling } from './SelfManagedPolling/SelfManagedPolling';
import { SelfManagedSetup } from './SelfManagedSetup/SelfManagedSetup';
import { Settings } from './Settings/Settings';
import { SiteStyles as S } from './Site.styles';
import { SiteList, SkeletonList } from './SiteList/SiteList';
import { SiteOverview } from './SiteOverview/SiteOverview';

export const Site = {
  Layout: SiteLayout,

  Elements: {
    AuditLog,
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
    Ipfs,
    CustomDomain,
    CustomENS,
  },

  Containers: {
    RightColumn: S.RightColumn,
    MainColumn: S.MainColumn,
    Row: S.Row,
  },

  Audit,
  Deployments,
  Settings,
  Analytics,
};
