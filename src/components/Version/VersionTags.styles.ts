import { styled } from '@/theme';
import { Text } from '@/ui';

export const VersionTagsStyles = {
  Text: styled(Text, {
    cursor: 'auto',
    padding: '0 $spacing-2',
    background: '$surface-tertiary',
    textSize: '$sm',
    color: '$text-secondary',
    borderRadius: '$full',
    textWrap: 'nowrap',
    width: 'fit-content',
  }),
};
