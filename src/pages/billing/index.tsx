import { useState } from 'react';

import { Billing } from '@/components';
import { constants } from '@/constants';
import { BillingPlans, NotFound } from '@/fragments';
import { useMeQuery } from '@/generated/graphqlClient';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import type { Page } from '@/types/App';
import { withAccess } from '@/utils/withAccess';

type BillingPageProps = Awaited<ReturnType<typeof getServerSideProps>>['props'];

const BillingPage: Page<BillingPageProps> = (props) => {
  const flags = useFeatureFlags();

  if (flags.enableBilling) {
    return <FeaturePage {...props} />;
  }

  return <NotFound.Page.Content />;
};

const FeaturePage: React.FC<BillingPageProps> = ({ plans, sections }) => {
  const [meQuery] = useMeQuery();
  const [isContactSalesModalOpen, setIsContactSalesModalOpen] = useState(false);

  const plansWithHandler = plans.map((plan) => {
    return {
      ...plan,
      onSelect: () => {
        // TODO: check how the enterprise plan is identified
        if (plan.name === 'Enterprise Plan') {
          setIsContactSalesModalOpen(true);
        }

        // TODO: Implement plan selection logic
        if (plan.isActive) {
          console.log('Plan is already active');

          return;
        }

        console.log('Plan selected:', plan.name);
      },
    };
  });

  return (
    <>
      <BillingPlans.Hero />

      <Billing.HorizontalPlanCard title="Free Plan" description="Our most popular plan for hobby developers." price="0" isActive />

      <BillingPlans.PlanCardsWrapper>
        {plansWithHandler.slice(1).map((plan, index) => (
          <Billing.VerticalPlanCard
            key={index}
            benefits={plan.benefits}
            buttonText={plan.buttonText}
            colorScheme={plan.color.scheme}
            description={plan.description}
            isActive={plan.isActive}
            price={plan.price}
            title={plan.name}
            onSelect={plan.onSelect}
          />
        ))}
      </BillingPlans.PlanCardsWrapper>

      <BillingPlans.Table plans={plansWithHandler} sections={sections} />

      <BillingPlans.ContactSalesModal
        initialEmail={meQuery.data?.user.email ?? undefined}
        open={isContactSalesModalOpen}
        setOpen={setIsContactSalesModalOpen}
      />
    </>
  );
};

BillingPage.getLayout = (page) => <BillingPlans.Layout>{page}</BillingPlans.Layout>;

export const getServerSideProps = async () => {
  return {
    props: {
      plans: [
        {
          name: 'Free Plan',
          description: 'Our most popular plan for hobby developers.',
          benefits: ['Domain/ENS not configured', 'Domain/ENS not configured', 'Domain/ENS not configured', 'Domain/ENS not configured'],
          color: {
            scheme: 'neutral' as const,
          },
          price: '0',
          isActive: true,
          buttonText: 'Select Free plan',
          values: [
            ['1', '1', '1'],
            ['1', '1', '1', '1'],
            ['1', '1', '1'],
          ],
        },
        {
          name: 'Basic Plan',
          description: 'Our most popular plan for hobby developers.',
          benefits: ['Domain/ENS not configured', 'Domain/ENS not configured', 'Domain/ENS not configured', 'Domain/ENS not configured'],
          price: '10',
          color: {
            scheme: 'success' as const,
          },
          isActive: false,
          buttonText: 'Upgrade to Basic',
          values: [
            ['1', '2', '4'],
            ['8', '16', '32', '64'],
            ['128', '256', '512'],
          ],
        },
        {
          name: 'Pro Plan',
          description: 'Our most popular plan for hobby developers.',
          benefits: ['Domain/ENS not configured', 'Domain/ENS not configured', 'Domain/ENS not configured', 'Domain/ENS not configured'],
          price: '20',
          color: {
            scheme: 'accent' as const,
          },
          isActive: false,
          buttonText: 'Upgrade to Pro',
          values: [
            ['1', '3', '9'],
            ['27', '81', '243', '729'],
            ['2187', '6561', '19683'],
          ],
        },
        {
          name: 'Enterprise Plan',
          description: 'Our most popular plan for hobby developers.',
          benefits: ['Domain/ENS not configured', 'Domain/ENS not configured', 'Domain/ENS not configured', 'Domain/ENS not configured'],
          price: 'Custom',
          color: {
            scheme: 'neutral' as const,
          },
          isActive: false,
          buttonText: 'Contact Sales',
          values: [
            ['1', '4', '16'],
            ['64', '256', '1024', '4096'],
            ['16384', '65536', '262144'],
          ],
        },
      ],
      sections: [
        {
          name: 'Section 1',
          icon: 'fleek' as const,
          rows: ['First', 'Second', 'Third'],
        },
        {
          name: 'Section 2',
          icon: 'gear' as const,
          rows: ['Fourth', 'Fifth', 'Sixth', 'Seventh'],
        },
        {
          name: 'Section 3',
          icon: 'grid' as const,
          rows: ['Eighth', 'Ninth', 'Tenth'],
        },
      ],
    },
  };
};

export default withAccess({ Component: BillingPage, requiredPermissions: [constants.PERMISSION.BILLING.VIEW] });
