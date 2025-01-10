import { routes } from '@fleek-platform/utils-routes';

import { LayoutHead, PageNavigation } from '@/components';
import { App } from '@/fragments/App/App';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { Box } from '@/ui';

import { SubmitFooter } from '../../SubmitFooter/SubmitFooter';

export type DetailsLayout = React.PropsWithChildren<{
  nav?: React.ReactNode | React.ReactNode[];
  title: string;
  description?: string;
}>;

export const DetailsLayout: React.FC<DetailsLayout> = ({ children, nav: pageNavContent, title, description }) => {
  const flags = useFeatureFlags();

  return (
    <>
      <LayoutHead title={title} description={description} />
      <App.Navbar.Combined />
      <App.Content>
        <PageNavigation
          items={[
            { icon: 'arrow-left', label: 'Go back', path: routes.template.list(), isExact: true, variant: 'primary', hasAccess: true },
          ]}
        >
          {pageNavContent}
        </PageNavigation>
        <Box className="grid grid-cols-1 sm:[grid-template-areas:'overview_overview'_'content_details'_'spacer_spacer'_'similar_similar'] sm:grid-cols-[1fr_15.125rem]">
          {children}
        </Box>
      </App.Content>
      {flags.enableTemplateCreation && <SubmitFooter />}
      <App.Footer />
    </>
  );
};
