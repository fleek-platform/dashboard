import { forwardStyledRef } from '@/theme';

import { IconStyles } from './Icon.styles';
import { IconLibrary, IconName, IconType } from './IconLibrary';

export type IconProps = {
  name: IconName;
} & React.ComponentPropsWithRef<typeof IconStyles.Container>;

export const Icon = forwardStyledRef<HTMLSpanElement, IconProps>(IconStyles.Container, (props, ref) => {
  const { name, ...rest } = props;
  const IconElement: IconType<typeof name> = IconLibrary[name];

  return (
    <IconStyles.Container {...rest} ref={ref}>
      <IconElement />
    </IconStyles.Container>
  );
});
