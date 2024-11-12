import { Billing } from '@/components';

import { useBillingCheckoutContext } from '../Context';
import { SelectedPlanStyles } from './SelectedPlan.styles';

export const SelectedPlan: React.FC = () => {
  const { plan } = useBillingCheckoutContext();

  return (
    <SelectedPlanStyles.Container>
      <Billing.HorizontalPlanCard
        title={`Upgrade to ${plan.name}`}
        description={plan.description}
        price={plan.price.toString()}
      />
    </SelectedPlanStyles.Container>
  );
};
