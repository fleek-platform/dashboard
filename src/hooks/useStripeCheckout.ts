import { useEffect, useState } from 'react';

import { useMeQuery } from '@/generated/graphqlClient';
import { StripeCheckout } from '@/integrations/stripe/StripeCheckout';
import { useTheme } from '@/providers/ThemeProvider';
import { BillingPlan } from '@/types/Billing';
import { Log } from '@/utils/log';

export type UseStripeCheckoutArgs = {
  plan: BillingPlan;
  domSelector: string;
};

export const useStripeCheckout = ({
  plan,
  domSelector,
}: UseStripeCheckoutArgs) => {
  const { constants } = useTheme();
  const [meQuery] = useMeQuery();
  const [checkout, setCheckout] = useState<StripeCheckout>();
  const [state, setState] = useState<StripeCheckout.State>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (!checkout && constants && meQuery.data) {
      if (!meQuery.data.user.email) {
        setMessage(
          'Please setup your email in your account settings before proceeding.',
        );

        return;
      }

      new StripeCheckout({
        setMessage,
        setState,
        plan,
        email: meQuery.data.user.email,
        /**
         * TODO: We must get the stripe customer ID from our database if present.
         * If the customer ID is not present, a new customer will be created in stripe using the email.
        ```
        customer: meQuery.data.user.stripeCustomerId // 'cus_PoXPZg8P8hbgBg',
        ```
         */
      })
        .initialize({ theme: constants, domSelector })
        .then((instance) => {
          setCheckout(instance);
        })
        .catch((error) => {
          Log.error('Failed to initialize StripeCheckout', error);
          setMessage(error.message);
        });
    }
  }, [constants, plan, meQuery.data, checkout, domSelector]);

  useEffect(() => {
    if (checkout && constants) {
      checkout.updateAppearance({ theme: constants });
    }
  }, [constants, checkout]);

  return {
    submit: checkout?.submit,
    message,
    state,
  };
};
