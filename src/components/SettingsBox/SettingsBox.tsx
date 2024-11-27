import { routes } from '@fleek-platform/utils-routes';

import { Link } from '@/components';
import { useSessionContext } from '@/providers/SessionProvider';
import { Box, Button, Icon, IconName, Text } from '@/ui';
import { withProps } from '@/utils/withProps';

import { SettingsBoxStyles as S } from './SettingsBox.styles';

const Title = withProps(Text, {
  as: 'h2',
  variant: 'primary',
  size: 'lg',
  weight: 700,
});

const EmptyContent: React.FC<SettingsBox.EmptyContentProps> = ({
  title,
  description,
  icon = 'question',
  showIcon = true,
}) => (
  <S.EmptyContent.Container>
    {showIcon && <Icon name={icon} />}
    <Title>{title}</Title>
    <Text>{description}</Text>
  </S.EmptyContent.Container>
);

export const Container: React.FC<SettingsBox.ContainerProps> = ({
  children,
  isBillingDisabled = false,
  disabledText,
  ...props
}) => {
  const session = useSessionContext();

  if (isBillingDisabled) {
    return (
      <S.Container className="relative">
        {children}
        <Box className="text-center gap-3 justify-center items-center absolute top-0 left-0 h-full w-full z-[2] bg-[#191919] rounded-lg p-9">
          <Box className="gap-1">
            <Text variant="primary" weight={700}>
              Upgrade plan
            </Text>
            <Text>{disabledText}</Text>
          </Box>
          <Link
            href={routes.project.billing({ projectId: session.project.id })}
          >
            <Button size="sm" className="py-0 px-2-5 text-sm h-[2rem]">
              Upgrade plan
            </Button>
          </Link>
        </Box>
      </S.Container>
    );
  }

  return <S.Container {...props}>{children}</S.Container>;
};

export const SettingsBox = {
  Container,
  Column: S.Column,
  Title,
  TitleRow: S.TitleRow,
  Text,
  ActionRow: S.ActionRow,
  FieldsRow: S.FieldsRow,
  Skeleton: S.Skeleton,
  EmptyContent,
};

export namespace SettingsBox {
  export type ContainerProps = React.ComponentPropsWithRef<typeof Box> & {
    disabledText?: string;
    isBillingDisabled?: boolean;
  };
  export type ColumnProps = React.ComponentPropsWithRef<typeof S.Column>;
  export type TitleProps = React.ComponentPropsWithRef<typeof Title>;
  export type TextProps = React.ComponentPropsWithRef<typeof Text>;
  export type ActionRowProps = React.ComponentPropsWithRef<typeof S.ActionRow>;
  export type FieldsRowProps = React.ComponentPropsWithRef<typeof S.FieldsRow>;
  export type SkeletonProps = React.ComponentPropsWithRef<typeof S.Skeleton>;
  export type EmptyContentProps = {
    title: string;
    description: string;
    icon?: IconName;
    showIcon?: boolean;
  };
}
