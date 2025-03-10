import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import {
  DynamicContextProvider,
  WalletConnector,
} from '@dynamic-labs/sdk-react-core';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';

import { useMeQuery, useUpdateUserMutation } from '@/generated/graphqlClient';
import { secrets } from '@/secrets';

import { useCookies } from './CookiesProvider';
import { useGenerateUserSessionDetailsMutation } from '@/generated/graphqlClient';
import { useRouter } from 'next/router';

export type DynamicProviderProps = React.PropsWithChildren<{}>;

export const DynamicProvider: React.FC<DynamicProviderProps> = ({
  children,
}) => {
  const cookies = useCookies();
  const [, updateUser] = useUpdateUserMutation();
  const [meQuery] = useMeQuery({ pause: !cookies.values.accessToken });
  const [, generateUserSessionDetails] =
    useGenerateUserSessionDetailsMutation();
  const router = useRouter();

  return (
    <DynamicContextProvider
      settings={{
        environmentId: secrets.NEXT_PUBLIC_UI__DYNAMIC_ENVIRONMENT_ID,
        walletConnectors: [EthereumWalletConnectors],
        eventsCallbacks: {
          onAuthSuccess: async ({ authToken }) => {
            // TODO: Solved accessToken and projectId here
            // thus, remove previous handling elsewhere
            const { data, error } = await generateUserSessionDetails({
              data: { authToken },
            });

            if (error || !data?.generateUserSessionDetails?.projectId)
              throw Error('TODO: onAuthSuccess failed');

            cookies.set(
              'accessToken',
              data.generateUserSessionDetails.accessToken,
            );
            cookies.set('projectId', data.generateUserSessionDetails.projectId);
            cookies.set('authToken', authToken);
          },
          onLinkSuccess: async (args) => {
            // for now we want to save the first wallet linked
            if (
              !meQuery.fetching &&
              !meQuery.data?.user.walletAddress &&
              args.walletConnector
            ) {
              const wallet = await (
                args.walletConnector as WalletConnector
              ).fetchPublicAddress();

              updateUser({ data: { walletAddress: wallet } });
            }
          },
          onUnlinkSuccess: async (wallet) => {
            // remove wallet if is the one we have stored
            if (
              !meQuery.fetching &&
              meQuery.data?.user.walletAddress &&
              meQuery.data?.user.walletAddress === wallet.address
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
