import { routes } from '@fleek-platform/utils-routes';

import { useRouter } from '@/hooks/useRouter';
import { forwardStyledRef } from '@/theme';

import { NavbarStyles as S } from './Navbar.styles';

const Paths = [
  { path: routes.features(), name: 'Features', activeRegex: /\/$|\/features/ },
  { path: routes.template.list(), name: 'Templates', activeRegex: /\/templates/ },
  { path: routes.plugins(), name: 'Plugins', activeRegex: /\/plugins/ },
  { path: routes.pricing(), name: 'Pricing', activeRegex: /\/pricing/ },
];

export const Navigation = forwardStyledRef<HTMLDivElement, React.ComponentPropsWithRef<typeof S.Navigation.Container>>(
  S.Navigation.Container,
  (props, ref) => {
    const router = useRouter();

    return (
      <S.Navigation.Container {...props} ref={ref}>
        {Paths.map((item) => (
          <S.Navigation.Link key={item.path} active={item.activeRegex.test(router.pathname)} href={item.path}>
            {item.name}
          </S.Navigation.Link>
        ))}
      </S.Navigation.Container>
    );
  }
);
