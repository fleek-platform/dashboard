import { routes } from '@fleek-platform/utils-routes';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

import { ComingSoon } from '@/components';
import { constants } from '@/constants';
import { Projects } from '@/fragments';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { useBillingContext } from '@/providers/BillingProvider';
import { useSessionContext } from '@/providers/SessionProvider';
import { useTheme } from '@/providers/ThemeProvider';
import { Page } from '@/types/App';
import { withAccess } from '@/utils/withAccess';

const BillingPage: Page = () => {
  const flags = useFeatureFlags();

  if (isEmpty(flags)) {
    return null;
  }

  if (flags.enableBilling) {
    return <FeaturePage />;
  }

  return <ComingSoonPage />;
};

const FeaturePage: React.FC = () => {
  const flags = useFeatureFlags();
  const router = useRouter();
  const session = useSessionContext();
  const toast = useToast();
  const { team } = useBillingContext();

  const success = router.query.success;
  const canceled = router.query.canceled;

  // TODO handle error with callback
  useEffect(() => {
    if (team.error) {
      toast.error({ message: 'Error fetching team data. Please try again' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team.error]);

  useEffect(() => {
    if (success) {
      toast.success({ message: 'Plan upgraded successfully' });
    }

    router.replace(routes.project.billing({ projectId: session.project.id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, canceled]);

  return (
    <>
      {flags.billingPlan && <Projects.Settings.Sections.Billing.Plan isLoading={session.loading} />}
      {flags.billingPayment && <Projects.Settings.Sections.Billing.PaymentMethod isLoading={session.loading} />}
      {flags.billingInvoices && <Projects.Settings.Sections.Billing.Invoices />}
    </>
  );
};

const ComingSoonPage: React.FC = () => {
  const { resolvedTheme = 'dark' } = useTheme();

  return (
    <ComingSoon.Modal
      imgSrc={`/assets/static/${resolvedTheme}/billing-coming-soon.png`}
      modalContent={
        <>
          <ComingSoon.Modal.Description>
            Soon we will introduce a credit-based billing system to Fleek, with a usage-based model. Pay storage, hosting, and other Fleek
            services granularly and only by usage with crypto or credit-card.
          </ComingSoon.Modal.Description>
        </>
      }
    >
      <ComingSoon.Skeleton.Container>
        <ComingSoon.Skeleton.Box>
          <ComingSoon.Skeleton.Row variant="small">
            <ComingSoon.Skeleton.TextSkeleton />
            <ComingSoon.Skeleton.TextSkeleton />
          </ComingSoon.Skeleton.Row>
          <ComingSoon.Skeleton.BigSkeleton />
          <ComingSoon.Skeleton.TextSkeleton />
        </ComingSoon.Skeleton.Box>
        <ComingSoon.Skeleton.Box>
          <ComingSoon.Skeleton.Row variant="small">
            <ComingSoon.Skeleton.TextSkeleton />
            <ComingSoon.Skeleton.TextSkeleton />
          </ComingSoon.Skeleton.Row>
          <ComingSoon.Skeleton.BigSkeleton variant="medium" />
        </ComingSoon.Skeleton.Box>

        <ComingSoon.Skeleton.Box>
          <ComingSoon.Skeleton.TextSkeleton />
          <ComingSoon.Skeleton.TextSkeleton variant="large" />
          <ComingSoon.Skeleton.TextSkeleton variant="large" />
          <ComingSoon.Skeleton.TextSkeleton variant="large" />
        </ComingSoon.Skeleton.Box>

        <ComingSoon.Skeleton.Box>
          <ComingSoon.Skeleton.TextSkeleton />
          <ComingSoon.Skeleton.Row>
            <ComingSoon.Skeleton.BigSkeleton />
            <ComingSoon.Skeleton.BigSkeleton />
            <ComingSoon.Skeleton.BigSkeleton />
          </ComingSoon.Skeleton.Row>
        </ComingSoon.Skeleton.Box>
      </ComingSoon.Skeleton.Container>
    </ComingSoon.Modal>
  );
};

BillingPage.getLayout = (page) => <Projects.Layout>{page}</Projects.Layout>;

export default withAccess({ Component: BillingPage, requiredPermissions: [constants.PERMISSION.BILLING.VIEW] });
