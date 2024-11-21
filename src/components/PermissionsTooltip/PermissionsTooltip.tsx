import { constants } from '@/constants';
import { ChildrenProps, LoadingProps } from '@/types/Props';

import {
  CustomTooltip,
  CustomTooltipProps,
} from '../CustomTooltip/CustomTooltip';

export type PermissionsTooltipProps = LoadingProps<
  ChildrenProps<
    {
      hasAccess?: boolean;
      content?: string;
      side?: CustomTooltipProps['side'];
    } & Omit<CustomTooltipProps, 'content' | 'side'>
  >
>;

export const PermissionsTooltip: React.FC<PermissionsTooltipProps> = ({
  hasAccess,
  children,
  side = 'top',
  content = constants.NO_PERMISSION_MESSAGE,
  isLoading,
  ...props
}) => {
  if (hasAccess || isLoading) {
    return <>{children}</>;
  }

  return (
    <CustomTooltip content={content} side={side} {...props}>
      {children}
    </CustomTooltip>
  );
};
