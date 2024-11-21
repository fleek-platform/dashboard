import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: 'G9w8Db_Z9KA9RyoIjMSs3KsxtReq_-6l' }),
    publicProvider(),
  ],
);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export const WagmiProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};
