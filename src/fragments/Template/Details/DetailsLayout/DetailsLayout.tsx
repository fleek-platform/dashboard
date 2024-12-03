import { routes } from '@fleek-platform/utils-routes';

import { LayoutHead, PageNavigation } from '@/components';
import { App } from '@/fragments/App/App';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';

import { SubmitFooter } from '../../SubmitFooter/SubmitFooter';
import { TemplateStyles as S } from '../../Template.styles';

export type DetailsLayout = React.PropsWithChildren<{
  nav?: React.ReactNode | React.ReactNode[];
  title: string;
  description?: string;
}>;

export const DetailsLayout: React.FC<DetailsLayout> = ({
  children,
  nav: pageNavContent,
  title,
  description,
}) => {
  const flags = useFeatureFlags();

  return (
    <>
      <LayoutHead title={title} description={description} />
      <App.Navbar.Combined />
      <App.Content>
        <PageNavigation
          items={[
            {
              icon: 'arrow-left',
              label: 'Go back',
              path: routes.template.list(),
              isExact: true,
              variant: 'primary',
              hasAccess: true,
            },
          ]}
        >
          {pageNavContent}
        </PageNavigation>
        <S.Details.Layout>{children}</S.Details.Layout>
      </App.Content>
      {flags.enableTemplateCreation && <SubmitFooter />}
      <App.Footer />
    </>
  );
};
