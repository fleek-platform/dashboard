import { ChildrenProps, LoadingProps } from '@/types/Props';
import { Text } from '@/ui';

import { ComingSoonStyles as S } from './ComingSoon.styles';

export type ComingSoonOverlayProps = ChildrenProps<
  LoadingProps<{ title?: string; description: string; className?: string }>
>;

export const ComingSoonOverlay: React.FC<ComingSoonOverlayProps> = ({
  children,
  isLoading,
  title = 'Coming Soon',
  description,
  className,
}) => {
  if (isLoading) {
    return <>{children}</>;
  }

  return (
    <S.Overlay.Wrapper
      onClick={(event) => event.stopPropagation()}
      className={className}
    >
      {children}
      <S.Overlay.Overlay>
        <Text as="h2" variant="primary" size="md" weight={700}>
          {title}
        </Text>
        <Text className="max-w-[13rem]">{description}</Text>
      </S.Overlay.Overlay>
    </S.Overlay.Wrapper>
  );
};
