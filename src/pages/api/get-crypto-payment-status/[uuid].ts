import type { NextApiRequest, NextApiResponse } from 'next';

import { CryptoPaymentStatus } from '@/types/Billing';

import { request } from '../create-crypto-payment';

/**
 * Warning: This is a POC for getting payment status with Cryptomus.
 *
 * This function is only an example of how to get the payment status from Cryptomus API.
 * The better way would be handling it through webhooks.
 * Read more about it: https://doc.cryptomus.com/payments/webhook
 */
const handler = async (req: NextApiRequest, res: NextApiResponse<GetCryptoPaymentStatusResponse>) => {
  try {
    const { uuid } = req.query;

    const response = await request('/payment/info', {
      uuid,
    });

    if (response.state === 0) {
      return res.status(200).json({
        status: response.result.payment_status,
        transactionId: response.result.txid,
        network: response.result.network,
      });
    }

    throw response;
  } catch (error) {
    console.error('Failed to get crypto payment status', error);

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;

export type GetCryptoPaymentStatusResponse =
  | CryptoPaymentStatus
  | {
      error: string;
    };
