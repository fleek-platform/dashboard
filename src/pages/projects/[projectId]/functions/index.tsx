import { Functions as F } from '@/fragments';
import type { Page } from '@/types/App';

const Functions: Page = () => {
  return <F.Sections.List />;
};

Functions.getLayout = (page) => <F.Layout>{page}</F.Layout>;

export default Functions;
