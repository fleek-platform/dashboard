import darkBolt from '@/images/fleek-bolt-dark.png';
import lightBolt from '@/images/fleek-bolt-light.png';
import { useTheme } from '@/providers/ThemeProvider';
import { Box } from '@/ui';
import { cn } from '@/utils/cn';

import { FleekLogoStyles as S } from './FleekLogo.styles';

export type FleekLogoProps = {
  showBolt?: boolean;
  showTypography?: boolean;
  className?: string;
};

export const FleekLogo: React.FC<FleekLogoProps> = ({ showBolt = true, showTypography = true, className }) => {
  const { theme } = useTheme();
  const logoSrc = theme === 'light' ? lightBolt : darkBolt;

  return (
    <Box className={cn('flex-row gap-[8%] text-neutral-12', className)}>
      {showBolt && <S.Bolt src={logoSrc} alt="fleek-logo" />}
      {showTypography && <S.Typography name="fleek-name" />}
    </Box>
  );
};
