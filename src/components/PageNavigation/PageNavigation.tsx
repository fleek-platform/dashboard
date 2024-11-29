import { Link } from '@/components';
import { useIsActivePage } from '@/hooks/useIsActivePage';
import { forwardStyledRef } from '@/theme';
import type { LoadingProps } from '@/types/Props';
import { Button, type IconName, Skeleton } from '@/ui';

import { PageNavStyles as S } from './PageNavigation.styles';

type NavigationButtonProps = {
  icon: IconName;
  label: string;
  path: string;
  isExact?: boolean;
  hasAccess?: boolean;
} & Omit<React.ComponentPropsWithoutRef<typeof Button>, 'href'>;

const NavigationButton: React.FC<NavigationButtonProps> = ({
  icon,
  label,
  path,
  isExact = false,
  disabled,
}) => {
  const isActivePage = useIsActivePage({ path, isExact });

  const btn = (
    <Button
      iconLeft={icon}
      intent={isActivePage ? 'accent' : 'ghost'}
      disabled={disabled}
    >
      {label}
    </Button>
  );

  if (disabled) {
    return btn;
  }

  return (
    <Link href={path} tabIndex={-1}>
      {btn}
    </Link>
  );
};

export type PageNavigationProps = LoadingProps<
  React.ComponentPropsWithRef<typeof S.Wrapper> & {
    items: NavigationButtonProps[];
  }
>;

export const PageNavigation = forwardStyledRef<
  HTMLDivElement,
  PageNavigationProps
>(S.Wrapper, ({ children, isLoading, items, ...props }, ref) => {
  if (isLoading) {
    return (
      <S.Wrapper ref={ref} {...props}>
        <S.Content>
          <Skeleton variant="button" />
          <Skeleton variant="button" />
          <Skeleton variant="button" />
          <Skeleton variant="button" />
          <Skeleton variant="button" />
        </S.Content>

        {children && <S.SpacedContent>{children}</S.SpacedContent>}
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper ref={ref} {...props}>
      <S.Content>
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
      </S.Content>

      {children && <S.SpacedContent>{children}</S.SpacedContent>}
    </S.Wrapper>
  );
});
