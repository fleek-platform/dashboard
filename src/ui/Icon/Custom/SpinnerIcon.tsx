import { keyframes, styled } from '@/theme';

import { IconStyles as S } from '../Icon.styles';

const spin = keyframes({
  '100%': { transform: 'rotate(360deg)' },
});

const resize = keyframes({
  '0%': { strokeDasharray: '0 150', strokeDashoffset: 0 },
  '47.5%': { strokeDasharray: '42 150', strokeDashoffset: '-16' },
  '95%,100%': { strokeDasharray: '42 150', strokeDashoffset: '-59' },
});

const ResizingCircle = styled('circle', {
  transformOrigin: 'center',
  animation: `${resize} 1.5s linear infinite`,
  strokeLinecap: 'round',
});

const SpinningGroup = styled('g', {
  transformOrigin: 'center',
  animation: `${spin} 1.5s linear infinite`,
});

export const SpinnerIcon: React.FC<S.CustomProps> = (props) => (
  <S.Custom {...props} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <SpinningGroup>
      <ResizingCircle stroke="currentColor" cx="12" cy="12" r="9.5" fill="none" strokeWidth="3" />
      <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" />
    </SpinningGroup>
  </S.Custom>
);
