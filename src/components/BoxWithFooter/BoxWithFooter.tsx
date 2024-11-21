import { ChildrenProps, LoadingProps } from '@/types/Props';
import { Box, Icon, IconName, Skeleton, Text } from '@/ui';

import { BoxWithFooterStyles as S } from './BoxWithFooter.styles';

export type BoxWithFooterProps = ChildrenProps<
  LoadingProps<{
    footerIcon: IconName;
    footerIconLabel?: string;
    footer: string;
    iconContainerVariant?: React.ComponentProps<
      typeof S.IconContainer
    >['variant'];
  }>
>;

export const BoxWithFooter: React.FC<BoxWithFooterProps> = ({
  footerIcon,
  footer,
  footerIconLabel,
  children,
  iconContainerVariant,
  isLoading,
}) => {
  if (isLoading) {
    return <BoxWithFooterSkeleton>{children}</BoxWithFooterSkeleton>;
  }

  return (
    <S.Container>
      <S.MainContent>{children}</S.MainContent>
      <S.Footer>
        <Text size="xs">{footer}</Text>
        <Box>
          {footerIconLabel}
          <S.IconContainer variant={iconContainerVariant}>
            <Icon name={footerIcon} />
          </S.IconContainer>
        </Box>
      </S.Footer>
    </S.Container>
  );
};

const BoxWithFooterSkeleton: React.FC<ChildrenProps> = ({ children }) => (
  <S.Container>
    <S.MainContent>{children}</S.MainContent>
    <S.Footer>
      <Skeleton />
      <S.IconContainer variant="loading">
        <Skeleton />
      </S.IconContainer>
    </S.Footer>
  </S.Container>
);
