import { constants } from '@/constants';
import { Site } from '@/fragments';
import { Page } from '@/types/App';
import { withAccess } from '@/utils/withAccess';

const EnsDomains: Page = () => {
  return <Site.Onchain.EnsRecords />;
};

EnsDomains.getLayout = (page) => (
  <Site.Onchain.Layout>{page}</Site.Onchain.Layout>
);

export default withAccess({
  Component: EnsDomains,
  requiredPermissions: [
    constants.PERMISSION.SITE.ADD_AND_VERIFY_ENS,
    constants.PERMISSION.SITE.DELETE_ENS,
  ],
});
