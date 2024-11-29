import {
  loadStripe,
  type Stripe,
  type StripeElements,
  type StripeElementsOptionsMode,
} from '@stripe/stripe-js';

import type { ThemeHook } from '@/providers/ThemeProvider';
import { secrets } from '@/secrets';
import type { BillingPlan } from '@/types/Billing';
import { Log } from '@/utils/log';

import { createElementsAppearance, type ThemeArgs } from './createElementsArguments';

export class StripeCheckout {
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private plan: BillingPlan;
  private customer: string | undefined;
  private email: string;

  private setMessage: StripeCheckout.Arguments['setMessage'];
  private setState: StripeCheckout.Arguments['setState'];

  constructor(args: StripeCheckout.Arguments) {
    this.setMessage = args.setMessage;
    this.setState = args.setState;
    this.plan = args.plan;
    this.customer = args.customer;
    this.email = args.email;
  }

  initialize: StripeCheckout.Initialize = async ({ theme, domSelector }) => {
    this.setState('initial');

    this.stripe = await loadStripe(secrets.STRIPE_PUBLIC_KEY);

    if (!this.stripe) {
      throw new StripeCheckoutError('Failed to load Stripe');
    }

    this.setState('stripe-loaded');

    const elementsArguments = this.createElementsArguments({ theme });
    this.elements = this.stripe.elements(elementsArguments);
    const paymentElement = this.elements.create('payment', {
      layout: 'tabs',
    });
    paymentElement.mount(domSelector);

    this.setState('elements-mounted');

    return this;
  };

  submit: StripeCheckout.Submit = async (event) => {
    event.preventDefault();

    if (!this.stripe || !this.elements) {
      Log.error('Failed to submit: Stripe or Elements not loaded properly');
      this.setMessage('An unexpected error occurred. Please contact support');

      return;
    }

    this.setMessage('');

    // check if the form is valid
    const { error: validationError } = await this.elements.submit();

    if (validationError) {
      return;
    }

    this.setState('submitting');

    const clientSecret = await this.requestClientSecret({ plan: this.plan });
    const { error } = await this.stripe.confirmPayment({
      clientSecret,
      elements: this.elements,
      redirect: 'if_required',
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        this.setMessage(error.message as string);
      } else {
        Log.error('Failed to create payment intent', error);
        this.setMessage('An unexpected error occurred. Please contact support');
      }

      this.setState('submit-failed');

      return;
    }

    this.setState('submit-success');
  };

  updateAppearance: StripeCheckout.UpdateAppearance = ({ theme }) => {
    if (!this.elements) {
      return;
    }

    this.elements.update({ appearance: createElementsAppearance({ theme }) });
  };

  private requestClientSecret: StripeCheckout.RequestClientSecret =
    async () => {
      /**
       * TODO: This is a placeholder for the actual API call to create a payment intent.
       * We will need to replace this with the correct call when backend is done.
       */
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stripePriceId: this.plan.stripePriceId,
          customer: this.customer,
          email: this.email,
        }),
      });

      const { clientSecret } = await response.json();

      return clientSecret;
    };

  private createElementsArguments: StripeCheckout.CreateElementsArguments = ({
    theme,
  }) => {
    return {
      /**
       * It is important that these arguments match with backend's client secret creation.
       * If the arguments don't match, the payment will fail on submit.
       */
      mode: 'payment',
      amount: this.plan.price,
      currency: 'usd',
      setup_future_usage: 'off_session',
      payment_method_types: ['card'],

      /**
       * These arguments are for the appearance of the elements, so they can be customized.
       */
      appearance: createElementsAppearance({ theme }),
      fonts: [
        {
          cssSrc:
            'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap',
        },
      ],
    };
  };
}

class StripeCheckoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StripeCheckoutError';
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace StripeCheckout {
  export type State =
    | 'initial'
    | 'stripe-loaded'
    | 'elements-mounted'
    | 'submitting'
    | 'submit-success'
    | 'submit-failed';

  export type Arguments = {
    setMessage: (message: string) => void;
    setState: (state: State) => void;

    plan: BillingPlan;
    customer?: string;
    email: string;
  };

  export type InitializeArgs = {
    domSelector: string;
    theme: NonNullable<ThemeHook['constants']>;
  };

  export type Initialize = (args: InitializeArgs) => Promise<StripeCheckout>;

  export type UpdateAppearance = (args: ThemeArgs) => void;

  export type Submit = React.MouseEventHandler<HTMLButtonElement>;

  export type RequestClientSecret = (args: {
    plan: BillingPlan;
  }) => Promise<string>;

  export type CreateElementsArguments = (
    args: ThemeArgs,
  ) => StripeElementsOptionsMode;
}
