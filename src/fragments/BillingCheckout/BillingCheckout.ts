import { BillingCheckoutProvider } from './Context';
import { Layout } from './Layout';
import { PaymentDescription } from './PaymentDescription/PaymentDescription';
import { PaymentMethods } from './PaymentMethods/PaymentMethods';
import { SelectedPlan } from './SelectedPlan/SelectedPlan';

export const BillingCheckout = {
  Layout,

  SelectedPlan,
  PaymentDescription,
  PaymentMethods,

  Provider: BillingCheckoutProvider,
};
