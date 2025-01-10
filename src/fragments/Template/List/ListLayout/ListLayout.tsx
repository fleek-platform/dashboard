import { LayoutHead } from '@/components';
import { App } from '@/fragments/App/App';
import { Box } from '@/ui';

export type ListLayoutProps = React.PropsWithChildren<{}>;

export const ListLayout: React.FC<ListLayoutProps> = ({ children }) => {
  return (
    <>
      <LayoutHead title={LayoutHead.titles.templates} />
      <App.Navbar.Combined />
      <Box className="grid grid-cols-1 [grid-template-rows:'min-content'] [grid-template-areas:'hero'_'filter'_'explorer'] sm:grid-cols-[13.875rem_1fr] sm:[grid-template-areas:'hero_hero'_'filter_explorer'] gap-9 max-w-[75rem] mx-auto py-9 px-6">
        {children}
      </Box>
      <App.Footer />
    </>
  );
};
