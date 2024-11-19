import { Link } from '@/components/Link/Link';
import { useIsActivePage } from '@/hooks/useIsActivePage';
import { ChildrenProps } from '@/types/Props';
import { Box, Scrollable, Skeleton, Text } from '@/ui';
import { cn } from '@/utils/cn';

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
      <Text className="cursor-not-allowed opacity-50 py-2 px-3" weight={500}>
        {navItem.label}
      </Text>
    );
  }

  return (
    <Link
      key={navItem.path}
      href={navItem.path}
      className={cn(
        'flex text-neutral-11 hover:bg-neutral-4 active:bg-neutral-5 items-center gap-3 py-2 px-3 text-sm font-medium rounded-lg select-none ring-0 outline-0 focus-visible:ring-2 ring-neutral-8 whitespace-nowrap',
        {
          'bg-accent-3 hover:bg-accent-3 active:bg-accent-3 text-accent-11':
            isActivePage,
        },
      )}
      role="menuitem"
    >
      {navItem.label}
    </Link>
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
        role="navigation"
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
                    className="w-1/6 h-[2rem] rounded-lg"
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
