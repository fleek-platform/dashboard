import type { ChildrenProps } from '@/types/Props';

import {
  CustomTooltip,
  type CustomTooltipProps,
} from '../CustomTooltip/CustomTooltip';

export type SiteQuotaTooltipProps = ChildrenProps<
  {
    canDeploy: boolean;
    side?: CustomTooltipProps['side'];
    isLoading: boolean;
  } & Omit<CustomTooltipProps, 'content' | 'side'>
>;

export const SiteQuotaTooltip: React.FC<SiteQuotaTooltipProps> = ({
  canDeploy,
  side = 'bottom',
  children,
  isLoading,
  ...props
}) => {
  if (canDeploy || isLoading) {
    return <>{children}</>;
  }

  return (
    <CustomTooltip
      content={
        'Maximum deployment queue reached, re-deployment is disabled. Please try again later'
      }
      side={side}
      {...props}
    >
      {children}
    </CustomTooltip>
  );
};
