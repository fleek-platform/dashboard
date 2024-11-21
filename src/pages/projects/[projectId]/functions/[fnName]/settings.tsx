import { Functions as F } from '@/fragments';
import { Page } from '@/types/App';

const FunctionSettings: Page = () => {
  return <F.Sections.Settings />;
};

FunctionSettings.getLayout = (page) => <F.DetailLayout>{page}</F.DetailLayout>;

export default FunctionSettings;
