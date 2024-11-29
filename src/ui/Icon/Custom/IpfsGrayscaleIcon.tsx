import { cn } from '@/utils/cn';

import type { IconStyles as S } from '../Icon.styles';
import { IpfsColoredIcon } from './IpfsColoredIcon';

export const IpfsGrayscaleIcon: React.FC<S.CustomProps> = (props) => (
  <IpfsColoredIcon {...props} className={cn(props.className, 'grayscale')} />
);
