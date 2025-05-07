export type BillingPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  benefits: string[];
  stripePriceId: string;
};

export type CryptoPaymentOption = {
  title: string;
  symbol: string;
  iconSrc: string;
  networks: CryptoPaymentNetwork[];
};

export type CryptoPaymentNetwork = {
  id: string;
  title: string;
  iconSrc: string;
};

export type CryptoPayment = CryptoPaymentStatus & {
  uuid: string;
  orderId: string;
  address: string;
  amount: string;
  paymentUri: string;
  expireAt: string;
};

export type CryptoPaymentStatus = {
  status:
    | 'paid' /* The payment was successful and the client paid exactly as much as required. */
    | 'paid_over' /* The payment was successful and client paid more than required. */
    | 'wrong_amount' /* The client paid less than required */
    | 'process' /* 	Payment in processing  */
    | 'confirm_check' /* 	We have seen the transaction in the blockchain and are waiting for the required number of network confirmations. */
    | 'wrong_amount_waiting' /* The client paid less than required, with the possibility of an additional payment */
    | 'check' /* The payment is verified */
    | 'fail' /* Payment error */
    | 'cancel' /* Payment cancelled, the client did not pay */
    | 'system_fail' /* 	A system error has occurred */
    | 'refund_process' /* The refund is being processed */
    | 'refund_fail' /* An error occurred during the refund */
    | 'refund_paid' /* 	The refund was successful */
    | 'locked' /* Funds are locked due to the AML program */;
  transactionId: string;
  network: string;
};

export type ProjectResponse = {
  id: string;
  teamId: string;
  name: string;
  createdAt: string;
  updatedat: string;
};

export type TeamResponse = {
  id: string;
  name: string;
  externalBillingId: boolean | null;
  updatedAt: string;
  createdAt: string;
  subscriptionId: string | null;
  paymentMethodId: string | null;
};

/** A project with Active or Trialing statuses is considered to be subscribed. Any other status means the project is unsubscribed. */
export type SubscriptionStatus =
  | 'Incomplete'
  | 'IncompleteExpired'
  | 'Active'
  | 'Trialing'
  | 'Unpaid'
  | 'Canceled'
  | 'PastDue'
  | 'Paused';

export type SubscriptionResponse = {
  id: string;
  status: SubscriptionStatus;
  startDate: string;
  periodEndDate: string;
  trialEndDate: string | null;
  endDate: string | null;
};

export type PlanResponse = {
  id: string;
  name: string;
  price: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  metadata: { app: string };
};

export type PaymentMethodResponse = {
  id: string;
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  country: string;
};

export type CheckoutResponse = {
  url: string;
};

export type BillingPlanType = 'pro' | 'trial' | 'free' | 'none';

type Restriction = {
  limit: number;
  resource: string;
};

export type PlanRestriction = {
  sites: Restriction;
  customDomains: Restriction;
  members: Restriction;
};
