import { ComingSoon } from '@/components';
import { constants } from '@/constants';
import { Site } from '@/fragments';
import { useTheme } from '@/providers/ThemeProvider';
import { Page } from '@/types/App';
import { withAccess } from '@/utils/withAccess';

const AnalyticsPage: Page = () => {
  const { resolvedTheme = 'dark' } = useTheme();

  return (
    <ComingSoon.Modal
      imgSrc={`/assets/static/${resolvedTheme}/analytics-coming-soon.png`}
      modalContent={
        <>
          <ComingSoon.Modal.Description>
            Keep track of visitors coming to your page, the pages they view, and the performance of your website. Analytics are
            privacy-friendly and don&apos;t store personal information.
          </ComingSoon.Modal.Description>
        </>
      }
    >
      <ComingSoon.Skeleton.Container>
        <ComingSoon.Skeleton.Row>
          <ComingSoon.Skeleton.Box width="column">
            <ComingSoon.Skeleton.TextSkeleton />
            <ComingSoon.Skeleton.BigSkeleton variant="circle" />
            <ComingSoon.Skeleton.TextSkeleton />
          </ComingSoon.Skeleton.Box>

          <ComingSoon.Skeleton.Box>
            <ComingSoon.Skeleton.Row small>
              <ComingSoon.Skeleton.TextSkeleton />
              <ComingSoon.Skeleton.TextSkeleton />
            </ComingSoon.Skeleton.Row>
            <ComingSoon.Skeleton.BigSkeleton />
            <ComingSoon.Skeleton.TextSkeleton />
          </ComingSoon.Skeleton.Box>
        </ComingSoon.Skeleton.Row>

        <ComingSoon.Skeleton.Box>
          <ComingSoon.Skeleton.Row small>
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

AnalyticsPage.getLayout = (page) => <Site.Analytics.Layout>{page}</Site.Analytics.Layout>;

export default withAccess({ Component: AnalyticsPage, requiredPermissions: [constants.PERMISSION.SITE.VIEW_ANALYTICS] });
