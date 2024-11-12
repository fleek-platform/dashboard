import { Form } from '@/components';
import { BillingCheckout, NotFound } from '@/fragments';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import type { Page } from '@/types/App';
import { BillingPlan } from '@/types/Billing';

type BillingPageProps = Awaited<ReturnType<typeof getServerSideProps>>['props'];

const BillingPage: Page<BillingPageProps> = (props) => {
  const flags = useFeatureFlags();

  if (flags.enableBilling) {
    return <FeaturePage {...props} />;
  }

  return <NotFound.Page.Content css={{ gridArea: 'plan' }} />;
};

const FeaturePage: React.FC<BillingPageProps> = ({ plan }) => {
  const form = Form.useForm({ values: { promoCode: '' }, onSubmit: async () => {} });

  return (
    <Form.Provider value={form}>
      <BillingCheckout.Provider initialMethod="crypto" plan={plan}>
        <BillingCheckout.SelectedPlan />

        <BillingCheckout.PaymentDescription />

        <BillingCheckout.PaymentMethods />
      </BillingCheckout.Provider>
    </Form.Provider>
  );
};

BillingPage.getLayout = (page) => <BillingCheckout.Layout>{page}</BillingCheckout.Layout>;

export default BillingPage;

export const getServerSideProps = async () => {
  return {
    props: {
      plan: {
        id: 'plan-id',
        name: 'Pro Plan',
        description: 'Our most popular plan for hobby developers.',
        benefits: ['Domain/ENS not configured', 'Domain/ENS not configured', 'Domain/ENS not configured', 'Domain/ENS not configured'],
        price: 20,
        stripePriceId: 'price_1OrOi1LFrhXIfuJy8zKfqUKn',
      } satisfies BillingPlan,
    },
  };
};
