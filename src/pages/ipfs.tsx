import { constants } from '@/constants';
import { IpfsPropagation } from '@/fragments';
import { Page } from '@/types/App';

export const metadata = {
  title: 'Fleek | IPFS Gateway Browser',
  description: "Check the availability of your content on several public IPFS gateways, including Fleek's on flk-ipfs.xyz",
};

const IpfsPropagationPage: Page = () => {
  return (
    <>
      <IpfsPropagation.Provider publicGateways={constants.IPFS_PROPAGATION_TOOL.DEFAULT_PUBLIC_GATEWAYS}>
        <IpfsPropagation.Hero />
        <IpfsPropagation.CreateGatewayButton />
        <IpfsPropagation.GatewaysTable />
      </IpfsPropagation.Provider>
    </>
  );
};

IpfsPropagationPage.getLayout = (page) => <IpfsPropagation.Layout>{page}</IpfsPropagation.Layout>;

export default IpfsPropagationPage;
