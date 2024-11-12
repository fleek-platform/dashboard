import { forwardStyledRef } from '@/theme';
import { DisabledProps } from '@/types/Props';
import { Box, IconName, Text } from '@/ui';

import { ActionBoxStyles as S } from './ActionBox.styles';

type ActionBoxProps = DisabledProps<
  {
    title: string;
    description: string;
    icon: IconName;
    isRestricted?: boolean;
  } & React.ComponentPropsWithRef<typeof S.Root>
>;

export const ActionBox = forwardStyledRef<HTMLAnchorElement, ActionBoxProps>(
  S.Root,
  ({ title, description, icon, isDisabled, isRestricted = false, ...props }, ref) => {
    if (isDisabled || isRestricted) {
      props.href = '#';
    }

    return (
      <S.Root {...props} ref={ref} disabled={isDisabled}>
        <S.Icon name={icon} />
        <Box>
          <Text variant="primary" size="lg" weight={700}>
            {title}
          </Text>
          <Text>{description}</Text>
        </Box>
        <S.RightArrow name="arrow-right" />
      </S.Root>
    );
  }
);
