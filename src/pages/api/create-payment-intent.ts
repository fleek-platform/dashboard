import type { NextApiRequest, NextApiResponse } from 'next';
import { Stripe } from 'stripe';

/**
 * Warning: This is a POC for creating a payment intent with Stripe.
 */

/**
 * The STRIPE_PRIVATE_KEY environment must not be exposed in the client-side code.
 */
// eslint-disable-next-line no-process-env
const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) => {
  try {
    if (!STRIPE_PRIVATE_KEY) {
      throw new CreatePaymentIntentError('Stripe secret key is not set');
    }

    /**
     * `stripePriceId` must be stored with the plan in our database
     *
     * `email` must be the user's email used to create the customer
     *
     * `customer` must be the customer ID from our database if present that reflects the stripe customer ID,
     * otherwise, a new customer will be created in stripe using the email.
     */
    const { stripePriceId, email } = req.body;
    let { customer } = req.body;

    const stripe = new Stripe(STRIPE_PRIVATE_KEY);

    if (!customer) {
      const newCustomer = await stripe.customers.create({ email });
      // TODO: Save the customer ID to the database
      console.log('New customer:', newCustomer);
      customer = newCustomer.id;
    }

    /**
     * The arguments used to create the subscription must match the arguments used to create the
     * payment elements in the frontend. If the arguments don't match, the payment will fail on submit.
     */
    const subscription = await stripe.subscriptions.create({
      customer,
      items: [{ price: stripePriceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    console.log('Subscription:', subscription);

    const latestInvoice = subscription.latest_invoice;

    if (typeof latestInvoice === 'string') {
      throw new CreatePaymentIntentError('Latest invoice is a string');
    }

    if (!latestInvoice) {
      throw new CreatePaymentIntentError('Latest invoice is null');
    }

    const paymentIntent = latestInvoice.payment_intent;

    if (typeof paymentIntent === 'string') {
      throw new CreatePaymentIntentError('Payment intent is a string');
    }

    if (!paymentIntent) {
      throw new CreatePaymentIntentError('Payment intent is null');
    }

    const clientSecret = paymentIntent.client_secret;

    if (!clientSecret) {
      throw new CreatePaymentIntentError('Client secret is null');
    }

    /**
     * The `clientSecret` is the token that the frontend will use to submit the payment.
     */
    res.status(200).json({ subscriptionId: subscription.id, clientSecret });
  } catch (error) {
    console.error('Failed to create payment intent:', error);

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;

class CreatePaymentIntentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

type ResponseData =
  | {
      subscriptionId: string;
      clientSecret: string;
    }
  | {
      error: string;
    };
