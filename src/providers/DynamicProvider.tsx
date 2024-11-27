import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { DynamicContextProvider, WalletConnector } from '@dynamic-labs/sdk-react-core';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';

import { useMeQuery, useUpdateUserMutation } from '@/generated/graphqlClient';
import { secrets } from '@/secrets';

import { useCookies } from './CookiesProvider';

export type DynamicProviderProps = React.PropsWithChildren<{}>;

export const DynamicProvider: React.FC<DynamicProviderProps> = ({ children }) => {
  const [, updateUser] = useUpdateUserMutation();
  const [meQuery] = useMeQuery();
  const cookies = useCookies();

  return (
    <DynamicContextProvider
      settings={{
        environmentId: secrets.NEXT_PUBLIC_UI__DYNAMIC_ENVIRONMENT_ID,
        walletConnectors: [EthereumWalletConnectors],
        eventsCallbacks: {
          onLogout: () => {
            cookies.remove('authProviderToken');
            cookies.remove('accessToken');
          },
          onLinkSuccess: async (args) => {
            // for now we want to save the first wallet linked
            if (!meQuery.fetching && !meQuery.data?.user.walletAddress && args.walletConnector) {
              const wallet = await (args.walletConnector as WalletConnector).fetchPublicAddress();

              updateUser({ data: { walletAddress: wallet } });
            }
          },
          onUnlinkSuccess: async (wallet) => {
            // remove wallet if is the one we have stored
            if (!meQuery.fetching && meQuery.data?.user.walletAddress && meQuery.data?.user.walletAddress === wallet.address) {
              updateUser({ data: { walletAddress: null, walletChain: null } });
            }
          },
        },
      }}
    >
      <DynamicWagmiConnector>
        <>{children}</>
      </DynamicWagmiConnector>
    </DynamicContextProvider>
  );
};
