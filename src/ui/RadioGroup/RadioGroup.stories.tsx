import { Meta, StoryFn } from '@storybook/react';

import { BadgeText } from '@/components';

import { Box } from '../Box/Box';
import { Text } from '../ftw/Text/Text';
import { RadioGroup } from './RadioGroup';

const meta: Meta = {
  title: 'Library/Components/RadioGroup',
};

export default meta;

type Story = StoryFn;

export const Default: Story = () => {
  return (
    <form>
      <RadioGroup.Root defaultValue="item1" css={{ maxWidth: '23.5rem', textSize: '$sm' }}>
        <Box css={{ flexDirection: 'row', gap: '$spacing-2-5' }}>
          <RadioGroup.Item value="item1" />
          IPNS Content Hash
          <BadgeText colorScheme="yellow" css={{ paddingTop: '0', paddingBottom: '0' }}>
            Recommended
          </BadgeText>
        </Box>
        <Text>If you deploy updates to your site frequently, and don&apos;t want to pay gas for every update.</Text>
        <Box css={{ flexDirection: 'row', gap: '$spacing-2-5' }}>
          <RadioGroup.Item value="item2" />
          IPFS Content Hash
        </Box>
        <Text>If you deploy updates to your site less frequently, and want to pay gas for every update.</Text>
      </RadioGroup.Root>
    </form>
  );
};
