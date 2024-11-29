import { routes } from '@fleek-platform/utils-routes';
import React, { useEffect, useState } from 'react';

import { ExternalLink, Link, LinkButton } from '@/components';
import { VersionTags } from '@/components/Version/VersionTags';
import { constants } from '@/constants';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { useIsActivePage } from '@/hooks/useIsActivePage';
import { useMediaQueryWindow } from '@/hooks/useMediaQueryWindow';
import { usePaymentExpiration } from '@/hooks/usePaymentExpiration';
import { useRouter } from '@/hooks/useRouter';
import { useUserHasScrolled } from '@/hooks/useUserHasScrolled';
import { useBillingContext } from '@/providers/BillingProvider';
import { useFeedbackModal } from '@/providers/FeedbackModalProvider';
import { useSessionContext } from '@/providers/SessionProvider';
import { ChildrenProps } from '@/types/Props';
import {
  Box,
  Button,
  Icon,
  IconName,
  Scrollable,
  SidebarSidepanel,
  Skeleton,
  Text,
} from '@/ui';
import { cn } from '@/utils/cn';
import { isServerSide } from '@/utils/isServerSide';

import { BadgeText } from '../../BadgeText/BadgeText';
import { FleekLogo } from '../../FleekLogo/FleekLogo';
import { LayoutHead } from '../../LayoutHead/LayoutHead';
import { AccountDropdown } from '../AccountDropdown/AccountDropdown';
import { Announcement } from '../Announcement/Announcement';
import { BreadcrumbItem, Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { secrets } from '@/secrets';

export type NavigationItem = {
  icon: IconName;
  label: string;
  path: string;
  hasAccess: boolean;
  isExact?: boolean;
  showNewTag?: boolean;
};

const Container: React.FC<ChildrenProps> = ({ children }) => {
  const session = useSessionContext();
  const paymentMethodExpired = usePaymentExpiration();
  const { subscription } = useBillingContext();

  const shouldShowBanner =
    !session.loading &&
    (paymentMethodExpired.hasExpired || paymentMethodExpired.isAboutToExpire) &&
    !subscription.data?.endDate;

  return (
    <Box className="bg-surface-app min-h-dvh">
      {shouldShowBanner && (
        <Box className="bg-danger-3 py-1 flex items-center">
          <Text className="text-danger-11">
            Your billing method{' '}
            {paymentMethodExpired.isAboutToExpire && 'is expiring soon.'}
            {paymentMethodExpired.hasExpired && 'has expired.'} You can update
            it&nbsp;
            <Link
              href={routes.project.billing({ projectId: session.project.id })}
            >
              <u>here.</u>
            </Link>
          </Text>
        </Box>
      )}
      {children}
    </Box>
  );
};

type SidebarItemProps = {
  navItem: NavigationItem;
  isExact?: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  navItem,
  isExact = false,
}) => {
  const isActivePage = useIsActivePage({ path: navItem.path, isExact });

  const colorScheme = isActivePage ? 'yellow' : 'slate';

  return (
    <LinkButton
      key={navItem.path}
      href={navItem.path}
      intent={isActivePage ? 'accent' : 'ghost'}
      className="w-full justify-between px-3"
      role="menuitem"
      aria-label={navItem.label}
    >
      <Box className="flex flex-row gap-3 items-center">
        <Icon name={navItem.icon} className="size-4" />
        {navItem.label}
      </Box>
      {navItem.showNewTag && (
        <BadgeText colorScheme={colorScheme} className="pointer-events-none">
          ✨ New
        </BadgeText>
      )}
    </LinkButton>
  );
};

const ExternalLinkWrapper: React.FC<
  ChildrenProps & { href?: string; onClick?: () => void }
> = ({ children, href, onClick }) => {
  if (href) {
    return (
      <ExternalLink
        href={href}
        className="group flex px-3 justify-between items-center rounded-sm ring-0 outline-0 focus-visible:ring-2 ring-neutral-8"
      >
        <Text className="group-hover:text-neutral-12">{children}</Text>
        <Box className="group-hover:bg-neutral-3 items-center justify-center size-[1.75rem] rounded shrink-0">
          <Icon
            name="arrow-up-right"
            className="text-neutral-8 group-hover:text-neutral-11 size-[0.875rem]"
          />
        </Box>
      </ExternalLink>
    );
  }

  return (
    <button
      onClick={onClick}
      className="group px-3 flex justify-between items-center rounded-sm ring-0 outline-0 focus-visible:ring-2 ring-neutral-8"
    >
      <Text className="group-hover:text-neutral-12">{children}</Text>
      <Box className="group-hover:bg-neutral-3 items-center justify-center size-[1.75rem] rounded shrink-0">
        <Icon
          name="arrow-up-right"
          className="text-neutral-8 group-hover:text-neutral-11 size-[0.875rem]"
        />
      </Box>
    </button>
  );
};

type SidebarProps = {
  slotSidebar: React.ReactNode;
  navigation: NavigationItem[];
  isNavigationLoading: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({
  slotSidebar,
  navigation,
  isNavigationLoading,
}) => {
  const { openModalWithTab } = useFeedbackModal();
  const version = `Beta v${constants.VERSION}`;

  const [showVersions, setShowVersion] = useState(false);
  const flags = useFeatureFlags();

  useEffect(() => {
    // on the client side, show versions if not prod or user is internal
    if (
      !isServerSide() &&
      (location.hostname !== secrets.NEXT_DASHBOARD_WEBSITE_URL ||
        flags.isInternalUser)
    ) {
      setShowVersion(true);
    }
  }, [flags]);

  return (
    <Box
      className="w-[15.938rem] pt-4 pb-2.5 px-3 gap-2 justify-between shrink-0 h-full"
      role="menu"
      aria-label="main menu"
    >
      <Box className="gap-3">
        <Box className="gap-4">
          <Box className="flex-row justify-between">
            <Link href="/">
              <FleekLogo size="sm" />
            </Link>
            <BadgeText colorScheme="slate">{version}</BadgeText>
          </Box>
          {slotSidebar}
        </Box>

        <Box className="gap-2">
          {isNavigationLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <Box
                  key={i}
                  variant="container"
                  className="border-0 flex-row gap-3 py-2 px-3 h-[2rem] items-center"
                >
                  <Skeleton variant="text" className="size-4 shrink-0" />
                  <Skeleton variant="text" className="w-1/2 h-2.5" />
                </Box>
              ))}
            </>
          ) : (
            <>
              {navigation
                .filter((navItem) => navItem.hasAccess)
                .map((navItem) => (
                  <SidebarItem
                    key={navItem.path}
                    navItem={navItem}
                    isExact={navItem.isExact}
                  />
                ))}
            </>
          )}
        </Box>
      </Box>

      <Box className="gap-2.5">
        {showVersions && <VersionTags />}
        <Announcement />
        <Box className="border border-neutral-6 py-2 pt-2.5 rounded-lg">
          <ExternalLinkWrapper onClick={() => openModalWithTab('FEEDBACK')}>
            Help & Feedback
          </ExternalLinkWrapper>
          <ExternalLinkWrapper href={constants.EXTERNAL_LINK.FLEEK_DOCS}>
            Documentation
          </ExternalLinkWrapper>
          <ExternalLinkWrapper href={constants.EXTERNAL_LINK.FLEEK_SUPPORT}>
            Support
          </ExternalLinkWrapper>
          <Box className="h-[1px] my-2.5 mx-3 bg-neutral-6" />
          <AccountDropdown />
        </Box>
      </Box>
    </Box>
  );
};

const SidebarWrapper: React.FC<SidebarProps> = ({
  slotSidebar,
  navigation,
  isNavigationLoading,
}) => {
  const isMobile = useMediaQueryWindow('(max-width: 1024px)');

  if (isMobile) {
    return (
      <Box className="p-4 pb-0">
        <SidebarSidepanel.Root>
          <SidebarSidepanel.Trigger asChild>
            <Button iconLeft="menu" intent="neutral" className="pr-4">
              <FleekLogo size="xs" />
            </Button>
          </SidebarSidepanel.Trigger>
          <SidebarSidepanel.Content>
            <Sidebar
              slotSidebar={slotSidebar}
              navigation={navigation}
              isNavigationLoading={isNavigationLoading}
            />
          </SidebarSidepanel.Content>
        </SidebarSidepanel.Root>
      </Box>
    );
  }

  return (
    <Box className="hidden lg:block">
      <Sidebar
        slotSidebar={slotSidebar}
        navigation={navigation}
        isNavigationLoading={isNavigationLoading}
      />
    </Box>
  );
};

const Content: React.FC<ChildrenProps> = ({ children }) => {
  const { hasScrolled, handleScroll } = useUserHasScrolled();

  return (
    <Scrollable.Root className="lg:h-[calc(100vh-5.938rem)] overflow-hidden">
      <Box
        className={cn('lg:h-[1px] bg-transparent', {
          'lg:bg-neutral-6': hasScrolled,
        })}
      />
      <Scrollable.VerticalBar />
      <Scrollable.Viewport className="w-full h-full" onScroll={handleScroll}>
        <Box className="flex flex-col gap-6 p-4 pt-0 max-w-[82rem] min-h-[calc(100vh-5.938rem)] mx-auto">
          {children}
        </Box>
      </Scrollable.Viewport>
    </Scrollable.Root>
  );
};

const HeaderSkeleton: React.FC = () => (
  <Box className="flex-row items-center justify-between px-4 md:p-4 h-10 max-w-[82rem] w-full self-center">
    <Box className="flex-row gap-2 items-center h-[2rem] w-1/6">
      <Skeleton className="size-4 rounded-sm shrink-0" />
      <Skeleton variant="text" className="shrink-0" />
    </Box>
    <Skeleton variant="button" className="w-1/6 h-[2rem] shrink-0" />
  </Box>
);

type HeaderProps = {
  navigation: NavigationItem[];
  isNavigationLoading: boolean;
  slotPage?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
};

const Header: React.FC<HeaderProps> = ({
  navigation,
  isNavigationLoading,
  slotPage,
  breadcrumbs,
}) => {
  const router = useRouter();
  const [route] = navigation.filter((navItem) =>
    router.asPath.includes(navItem.path),
  );
  const isLoading = isNavigationLoading || (!route && !breadcrumbs);

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return (
    <Box className="flex-row items-center flex-wrap justify-between gap-2 p-4 md:gap-0 md:h-10 max-w-[82rem] w-full self-center">
      <Breadcrumbs
        breadcrumbs={
          breadcrumbs || [
            { name: route.label, icon: route.icon, url: route.path },
          ]
        }
      />
      {slotPage && slotPage}
    </Box>
  );
};

type PageProps = ChildrenProps & {
  slotSidebar: React.ReactNode;
  slotPage?: React.ReactNode;
  navigation: NavigationItem[];
  isNavigationLoading: boolean;
  breadcrumbs?: BreadcrumbItem[];
};

const Page: React.FC<PageProps> = ({
  slotSidebar,
  slotPage,
  navigation,
  isNavigationLoading,
  breadcrumbs,
  children,
}) => (
  <Box className="relative lg:flex-row">
    <SidebarWrapper
      slotSidebar={slotSidebar}
      navigation={navigation}
      isNavigationLoading={isNavigationLoading}
    />
    <Box className="flex-1 p-2.5 pl-0">
      <Box className="lg:rounded-lg lg:bg-neutral-1 lg:border lg:border-neutral-6">
        <Header
          navigation={navigation}
          isNavigationLoading={isNavigationLoading}
          slotPage={slotPage}
          breadcrumbs={breadcrumbs}
        />
        <Content>{children}</Content>
      </Box>
    </Box>
  </Box>
);

class RootLayoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RootLayoutError';
  }
}

export const RootLayout = () => {
  throw new RootLayoutError(
    'RootLayout cannot be used as a standalone component. Please use one of the subcomponents instead.',
  );
};

RootLayout.Container = Container;
RootLayout.Head = LayoutHead;
RootLayout.Page = Page;
