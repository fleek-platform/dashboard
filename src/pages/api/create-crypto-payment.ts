import { createHash } from 'crypto';
import { DateTime } from 'luxon';
import type { NextApiRequest, NextApiResponse } from 'next';

import { CryptoPayment } from '@/types/Billing';

/**
 * Warning: This is a POC for creating a payment intent with Cryptomus.
 *
 * The example provided will create an payment intent in Cryptomus API, using the provided currency.
 * This method allows us to lock the payment for the selected token and amount,
 * so we don't need to worry about exact exchange rates.
 *
 * Read more about this in the conversation: https://discord.com/channels/1045027913260617789/1212043885950537728/1221823763239272498
 */

// eslint-disable-next-line no-process-env
const PRIVATE_KEY = process.env.CRYPTOMUS_PRIVATE_KEY as string;
// eslint-disable-next-line no-process-env
const MERCHANT_ID = process.env.CRYPTOMUS_MERCHANT_ID as string;
// eslint-disable-next-line no-process-env
const API_URL = process.env.CRYPTOMUS_API_URL as string;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreateCryptoPaymentResponse>,
) => {
  try {
    const { planId, currency, network } = req.body;

    const planParams = await getPlanParams(planId);

    const response = await request('/payment', {
      order_id: Date.now().toString(),
      amount: planParams.amount.toString(),
      /**
       * We are keeping the payment created for the selected currency and locked for given token.
       * This will only works correctly if the token is a stablecoin 1:1 to USD.
       * In case we want to create the payment with conversion to plan currency:
      ```
      currency: planParams.currency,
      ```
       */
      currency: currency,
      to_currency: currency,
      network,
    });

    /**
     * This log will contain all the information about the payment intent.
     * Read more about it: https://doc.cryptomus.com/payments/creating-invoice
     */
    console.log('payment', response);

    if (response.state === 0) {
      return res.status(200).json({
        uuid: response.result.uuid,
        orderId: response.result.order_id,
        address: response.result.address,
        amount: response.result.payer_amount,
        status: response.result.payment_status,
        transactionId: response.result.transaction_id,
        network: response.result.network,

        paymentUri: generatePaymentUri({
          network: response.result.network,
          address: response.result.address,
          amount: response.result.payer_amount,
          token: currency,
        }),

        expireAt: DateTime.fromSeconds(response.result.expired_at).toISO(),
      });
    }

    throw response.error;
  } catch (error) {
    console.error('Failed to create payment intent:', error);

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;

const getPlanParams = async (_planId: string) => {
  return {
    amount: 20,
    currency: 'USD',
  };
};

type GeneratePaymentUriArgs = {
  network: string;
  address: string;
  amount: string;
  token: string;
};

const generatePaymentUri = ({
  network,
  address,
  amount,
  token,
}: GeneratePaymentUriArgs) => {
  switch (network) {
    case 'eth':
      if (token === 'USDC') {
        return `ethereum:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48@${1}/transfer?address=${address}&uint256=${amount}e6`;
      }

      return `ethereum:${address}@${1}?value=${amount}e18`;
    case 'bsc':
      return `ethereum:${address}@${56}?value=${amount}`;

    default:
      return '';
  }
};

type RequestArgs = Record<string, unknown>;

export const request = async (endpoint: string, payload?: RequestArgs) => {
  const body = payload ? JSON.stringify(payload) : undefined;

  const sign = createHash('md5')
    .update(
      Buffer.from(body || '')
        .toString('base64')
        .concat(PRIVATE_KEY),
    )
    .digest('hex');

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      merchant: MERCHANT_ID,
      sign,
    },
    body,
  });

  return await response.json();
};

export type CreateCryptoPaymentResponse =
  | CryptoPayment
  | {
      error: string;
    };
