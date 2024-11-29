import type { ChildrenProps } from '@/types/Props';
import { Text } from '@/ui';

import { EnsNameStyles as S } from './EnsName.styles';

export const EnsName: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <S.Container variant="container">
      <Text>ENS:</Text>
      <S.EnsName>{children}</S.EnsName>
    </S.Container>
  );
};
