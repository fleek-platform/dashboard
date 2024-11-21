import { Functions as F } from '@/fragments';
import type { Page } from '@/types/App';

const FunctionDetail: Page = () => {
  return <F.Sections.Detail />;
};

FunctionDetail.getLayout = (page) => <F.DetailLayout>{page}</F.DetailLayout>;

export default FunctionDetail;
