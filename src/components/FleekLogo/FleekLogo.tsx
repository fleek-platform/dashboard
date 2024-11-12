import darkBolt from '@/images/fleek-bolt-dark.png';
import lightBolt from '@/images/fleek-bolt-light.png';
import { useTheme } from '@/providers/ThemeProvider';
import { typography } from '@/theme/foundations';

import { FleekLogoStyles as S } from './FleekLogo.styles';

export type FleekLogoProps = {
  showBolt?: boolean;
  showTypography?: boolean;
  size?: keyof typeof typography.fontSizes;
};

export const FleekLogo: React.FC<FleekLogoProps> = ({ showBolt = true, showTypography = true, size = 'md' }) => {
  const { theme } = useTheme();
  const logoSrc = theme === 'light' ? lightBolt : darkBolt;

  return (
    <S.Container size={size}>
      {showBolt && <S.Bolt src={logoSrc} alt="fleek-logo" />}
      {showTypography && <S.Typography name="fleek-name" />}
    </S.Container>
  );
};
