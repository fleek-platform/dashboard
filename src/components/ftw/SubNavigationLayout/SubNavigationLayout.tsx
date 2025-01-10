import { useIsActivePage } from '@/hooks/useIsActivePage';
import { ChildrenProps } from '@/types/Props';
import { Box, Scrollable, Skeleton } from '@/ui';

import { LinkButton } from '../LinkButton/LinkButton';

export type SubNavigationItem = {
  label: string;
  path: string;
  hasAccess: boolean;
  isDisabled?: boolean;
};

type SidebarItemProps = {
  navItem: SubNavigationItem;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ navItem }) => {
  const isActivePage = useIsActivePage({ path: navItem.path, isExact: true });

  if (navItem.isDisabled) {
    return (
      <LinkButton href="#" className="px-3" disabled>
        {navItem.label}
      </LinkButton>
    );
  }

  return (
    <LinkButton
      href={navItem.path}
      intent={isActivePage ? 'accent' : 'ghost'}
      className="px-3"
    >
      {navItem.label}
    </LinkButton>
  );
};

type SubNavigationProps = {
  navigation: SubNavigationItem[];
  isNavigationLoading: boolean;
};

export const SubNavigationLayout: React.FC<
  SubNavigationProps & ChildrenProps
> = ({ navigation, isNavigationLoading, children }) => {
  return (
    <>
      <Scrollable.Root
        type="auto"
        className="max-w-[calc(100vw-48px)] w-full lg:max-w-[calc(100vw-300px)] overflow-hidden"
      >
        <Scrollable.HorizontalBar className="peer" />
        <Scrollable.Viewport className="w-full h-full peer-data-[state=visible]:pb-4">
          <Box className="flex-row gap-2 flex-nowrap overflow-auto">
            {isNavigationLoading ? (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    variant="text"
                    className="w-1/6 h-[2rem] rounded"
                  />
                ))}
              </>
            ) : (
              <>
                {navigation
                  .filter((navItem) => navItem.hasAccess)
                  .map((navItem) => (
                    <SidebarItem key={navItem.path} navItem={navItem} />
                  ))}
              </>
            )}
          </Box>
        </Scrollable.Viewport>
      </Scrollable.Root>
      {children}
    </>
  );
};
