import { useTheme } from '@/providers/ThemeProvider';
import { forwardStyledRef } from '@/theme';

import { HeadingFrameStyles as S } from './HeadingFrame.styles';

export type HeadingFrameProps = Omit<React.ComponentProps<typeof S.Frame>, 'theme'>;

export const HeadingFrame = forwardStyledRef<HTMLSpanElement, HeadingFrameProps>(S.Frame, (props, ref) => {
  const theme = useTheme();

  const resolvedTheme = theme.resolvedTheme === 'light' ? 'light' : 'dark';

  return <S.Frame {...props} ref={ref} theme={resolvedTheme} />;
});
