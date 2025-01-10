import { routes } from '@fleek-platform/utils-routes';

import { FleekLogo, FleekLogoProps, Link } from '@/components';
import { useSessionContext } from '@/providers/SessionProvider';
import { TEST_ID } from '@/test/testId';
import { forwardStyledRef } from '@/theme';
import { ChildrenProps } from '@/types/Props';
import { Box, Button, ButtonProps, Input } from '@/ui';

import { NavbarStyles as S } from './Navbar.styles';

const Search: React.FC = () => {
  const handleSearch = (/* e: React.ChangeEvent<HTMLInputElement> */) => {
    // TODO add search
  };

  return (
    <Input.Root>
      <Input.Icon name="magnify" />
      <Input.Field placeholder="Search or jump to..." onChange={handleSearch} />
      <Input.Tag>ctrl+k</Input.Tag>
    </Input.Root>
  );
};

type LogoProps = ChildrenProps & FleekLogoProps;

const Logo: React.FC<LogoProps> = ({ children, ...props }) => {
  const session = useSessionContext();
  const projectId = session.project.id;

  return (
    <Box className="flex-row gap-3 items-center">
      {projectId ? (
        <Link href={routes.project.home({ projectId })} data-testid={TEST_ID.NAV_LINK_PROJECT}>
          <FleekLogo showTypography={false} {...props} />
        </Link>
      ) : (
        <FleekLogo showTypography={false} {...props} />
      )}
      {children}
    </Box>
  );
};

type ContainerProps = ChildrenProps<React.ComponentPropsWithRef<typeof S.Content>>;

const Container = forwardStyledRef<HTMLDivElement, ContainerProps>(S.Content, ({ children, ...props }, ref) => {
  return (
    <S.Layout>
      <S.Content {...props} ref={ref}>
        {children}
      </S.Content>
    </S.Layout>
  );
});

type LoginButtonProps = {
  title: string;
} & Pick<ButtonProps, 'intent'>;

const LoginButton: React.FC<LoginButtonProps> = ({ title, intent }) => {
  const session = useSessionContext();

  return (
    <Button intent={intent} onClick={() => session.auth.login('dynamic')}>
      {title}
    </Button>
  );
};

export const Navbar = {
  Container,
  Logo,
  Search,
  LoginButton,
};
