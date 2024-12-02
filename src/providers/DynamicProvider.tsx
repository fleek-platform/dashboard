import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import {
  DynamicContextProvider,
  WalletConnector,
} from '@dynamic-labs/sdk-react-core';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { useCallback } from 'react';

import {
  MeDocument,
  MeQuery,
  MeQueryVariables,
} from '@/generated/graphqlClient';
import { useAuthCookie } from '@/hooks/useAuthCookie';
import { useUpdateUserMutation } from '@/hooks/useUpdateUserMutation';
import { GraphqlApiClient } from '@/integrations/graphql/GraphqlApi';
import { secrets } from '@/secrets';
import { ChildrenProps } from '@/types/Props';
import { Log } from '@/utils/log';

type DynamicProviderProps = ChildrenProps<{
  handleAuthSuccess: (authProviderToken: string) => void;
  handleLogout: () => void;
}>;

export const DynamicProvider: React.FC<DynamicProviderProps> = ({
  handleLogout,
  handleAuthSuccess,
  children,
}) => {
  const [accessToken] = useAuthCookie();
  const { mutate: updateUser } = useUpdateUserMutation();

  const getUserQuery = useCallback(() => {
    try {
      if (!accessToken) {
        return undefined;
      }

      const graphqlApi = new GraphqlApiClient({ accessToken });

      return graphqlApi.fetch<MeQuery, MeQueryVariables>({
        document: MeDocument.loc.source.body,
        variables: {},
      });
    } catch (error) {
      Log.error('Failed to get user on auth provider callbacks', error);
    }
  }, [accessToken]);

  return (
    <DynamicContextProvider
      settings={{
        environmentId: secrets.NEXT_PUBLIC_UI__DYNAMIC_ENVIRONMENT_ID,
        walletConnectors: [EthereumWalletConnectors],
        eventsCallbacks: {
          onAuthSuccess: (args) => {
            handleAuthSuccess(args.authToken);
          },
          onLogout: handleLogout,
          onLinkSuccess: async (args) => {
            const data = await getUserQuery();

            if (!data?.user) {
              return;
            }

            // for now we want to save the first wallet linked
            if (!data.user.walletAddress && args.walletConnector) {
              const wallet = await (
                args.walletConnector as WalletConnector
              ).fetchPublicAddress();
              updateUser({ data: { walletAddress: wallet } });
            }
          },
          onUnlinkSuccess: async (wallet) => {
            const data = await getUserQuery();

            if (!data?.user) {
              return;
            }

            // remove wallet if is the one we have stored
            if (
              data.user.walletAddress &&
              data.user.walletAddress === wallet.address
            ) {
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
