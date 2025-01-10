import { LinkButton } from '@/components';
import { useIsActivePage } from '@/hooks/useIsActivePage';
import { forwardStyledRef } from '@/theme';
import { LoadingProps } from '@/types/Props';
import { Box, Button, IconName, Skeleton } from '@/ui';

import { PageNavStyles as S } from './PageNavigation.styles';

type NavigationButtonProps = {
  icon: IconName;
  label: string;
  path: string;
  isExact?: boolean;
  hasAccess?: boolean;
} & Omit<React.ComponentPropsWithoutRef<typeof Button>, 'href'>;

const NavigationButton: React.FC<NavigationButtonProps> = ({ icon, label, path, isExact = false, disabled }) => {
  const isActivePage = useIsActivePage({ path, isExact });

  return (
    <LinkButton href={path} iconLeft={icon} intent={isActivePage ? 'accent' : 'ghost'} disabled={disabled}>
      {label}
    </LinkButton>
  );
};

export type PageNavigationProps = LoadingProps<
  React.ComponentPropsWithRef<typeof S.Wrapper> & {
    items: NavigationButtonProps[];
  }
>;

export const PageNavigation = forwardStyledRef<HTMLDivElement, PageNavigationProps>(
  S.Wrapper,
  ({ children, isLoading, items, ...props }, ref) => {
    if (isLoading) {
      return (
        <Box className="flex-row justify-between items-center" ref={ref} {...props}>
          <S.Content>
            <Skeleton variant="button" />
            <Skeleton variant="button" />
            <Skeleton variant="button" />
            <Skeleton variant="button" />
            <Skeleton variant="button" />
          </S.Content>

          {children && <S.SpacedContent>{children}</S.SpacedContent>}
        </Box>
      );
    }

    return (
      <Box className="flex-row justify-between items-center" ref={ref} {...props}>
        {items
          .filter((item) => item.hasAccess)
          .map((item) => (
            <NavigationButton
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isExact={item.isExact}
              variant={item.variant}
              disabled={item.disabled}
            />
          ))}

        {children && <S.SpacedContent>{children}</S.SpacedContent>}
      </Box>
    );
  }
);
