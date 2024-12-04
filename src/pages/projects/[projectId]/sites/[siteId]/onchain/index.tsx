import { Site } from '@/fragments';
import { Page } from '@/types/App';

const OnchainPage: Page = () => {
  return <Site.Onchain.General />;
};

OnchainPage.getLayout = (page) => (
  <Site.Onchain.Layout>{page}</Site.Onchain.Layout>
);

export default OnchainPage;
