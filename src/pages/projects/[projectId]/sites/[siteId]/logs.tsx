import { ComingSoon } from '@/components';
import { Site } from '@/fragments';
import { useTheme } from '@/providers/ThemeProvider';
import { Page } from '@/types/App';

const LogPage: Page = () => {
  const { resolvedTheme = 'dark' } = useTheme();

  return (
    <ComingSoon.Modal
      imgSrc={`/assets/static/${resolvedTheme}/audit-coming-soon.png`}
      modalContent={
        <>
          <ComingSoon.Modal.Description>
            Audit Log will keep track and display all configuration changes and
            activity for this site, associated to the user that performed it for
            accountability and troubleshooting purposes.
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

LogPage.getLayout = (page) => <Site.Audit.Layout>{page}</Site.Audit.Layout>;

export default LogPage;
