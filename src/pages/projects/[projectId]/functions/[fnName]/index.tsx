import { constants } from '@/constants';
import { Functions as F } from '@/fragments';
import type { Page } from '@/types/App';
import { withAccess } from '@/utils/withAccess';

const FunctionDetail: Page = () => {
  return <F.Sections.Detail />;
};

FunctionDetail.getLayout = (page) => <F.DetailLayout>{page}</F.DetailLayout>;

export default withAccess({
  Component: FunctionDetail,
  requiredPermissions: [constants.PERMISSION.FUNCTIONS.VIEW],
});
