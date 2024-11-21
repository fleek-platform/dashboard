import type { NextApiRequest, NextApiResponse } from 'next';

import type {
  CryptoPaymentNetwork,
  CryptoPaymentOption,
} from '@/types/Billing';

/**
 * Warning: This is a POC for getting payment token options for Cryptomus.
 */

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetCryptoPaymentOptionsResponse>,
) => {
  try {
    /**
     * As we are going to use stablecoins and lock the payment for its amounts,
     * we will not need to fetch the exchange rates.
     * 
     * In case we decide to have it, here is an example of how to do it:
     * 
     *
    ```
      const exchangeRatesResponse = await fetch(`${API_URL}/exchange-rate/USD/list`).then((res) => res.json());

      if (exchangeRatesResponse.state !== 0) {
        // eslint-disable-next-line fleek-custom/no-default-error
        throw new Error('Failed to get exchange rates');
      }

      const exchangeRates: Record<string, number> = {};

      for (const rate of exchangeRatesResponse.result as CryptomusExchangeRate[]) {
        exchangeRates[rate.to] = parseFloat(rate.course);
      }

      console.log('exchangeRates', exchangeRates);
    ```
     *
     */

    const options = Object.entries(coins).map<CryptoPaymentOption>(
      ([coin, coinNetworks]) => ({
        title: coin,
        symbol: coin,
        iconSrc: `https://storage.cryptomus.com/currencies/${coin}.svg`,
        networks: coinNetworks.map(
          (network) => networks[network] as CryptoPaymentNetwork,
        ),
        // exchangeRate: exchangeRates[coin] || 0,
      }),
    );

    res.status(200).json({ options });
  } catch (error) {
    console.error('Failed to get crypto payment options', error);

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;

/**
 * Cryptomus Exchange Rate typing:
```
type CryptomusExchangeRate = {
  course: string;
  from: string;
  to: string;
};
```
 */

/**
 * This are the coins we allow to be used for payments, the IDs matches Cryptomus API.
 * Check more here: https://doc.cryptomus.com/reference
 */

const coins = {
  USDC: ['ETH', 'BSC', 'POLYGON', 'ARBITRUM', 'AVALANCHE', 'TRON'],
  USDT: ['ETH', 'BSC', 'POLYGON', 'ARBITRUM', 'AVALANCHE', 'TRON', 'SOL'],
  DAI: ['ETH', 'BSC', 'POLYGON'],
};

const networks: Record<string, CryptoPaymentNetwork> = {
  ARBITRUM: {
    id: 'ARBITRUM',
    title: 'Arbitrum',
    iconSrc:
      'https://pbs.twimg.com/profile_images/1653532864309239810/ZjT_zBAS_400x400.png',
  },
  AVALANCHE: {
    id: 'Avalanche C-Chain',
    title: 'Avalanche',
    iconSrc: 'https://storage.cryptomus.com/currencies/AVAX.svg',
  },
  BSC: {
    id: 'BSC',
    title: 'Binance',
    iconSrc: 'https://storage.cryptomus.com/currencies/BNB.svg',
  },
  ETH: {
    id: 'ETH',
    title: 'Ethereum',
    iconSrc: 'https://storage.cryptomus.com/currencies/ETH.svg',
  },
  POLYGON: {
    id: 'POLYGON',
    title: 'Polygon',
    iconSrc: 'https://storage.cryptomus.com/currencies/MATIC.svg',
  },
  TRON: {
    id: 'TRON',
    title: 'Tron',
    iconSrc: 'https://storage.cryptomus.com/currencies/TRX.svg',
  },
  SOL: {
    id: 'SOL',
    title: 'Solana',
    iconSrc: 'https://storage.cryptomus.com/networks/SOL.svg',
  },
};

export type GetCryptoPaymentOptionsResponse =
  | {
      options: CryptoPaymentOption[];
    }
  | {
      error: string;
    };
