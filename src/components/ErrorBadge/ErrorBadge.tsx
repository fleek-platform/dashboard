import { Maybe } from '@/generated/graphqlClient';
import { ChildrenProps } from '@/types/Props';
import { Icon } from '@/ui';

import { BadgeText } from '../BadgeText/BadgeText';
import { CustomTooltip } from '../CustomTooltip/CustomTooltip';

export type ErrorBadgeProps = ChildrenProps<{
  errorMessage?: Maybe<string> | undefined;
}>;

export const ErrorBadge: React.FC<ErrorBadgeProps> = ({ children, errorMessage }) => {
  if (errorMessage) {
    return (
      <CustomTooltip side="top" content={errorMessage}>
        <BadgeText colorScheme="red" hoverable>
          {children} <Icon name="question" />
        </BadgeText>
      </CustomTooltip>
    );
  }

  return <BadgeText colorScheme="red">{children}</BadgeText>;
};
