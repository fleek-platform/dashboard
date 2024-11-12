import { Functions as F, Site } from '@/fragments';
import { Page } from '@/types/App';

const Functions: Page = () => {
  return <F.Sections.List source="site" />;
};

Functions.getLayout = (page) => <Site.Layout nav={null}>{page}</Site.Layout>;

export default Functions;
