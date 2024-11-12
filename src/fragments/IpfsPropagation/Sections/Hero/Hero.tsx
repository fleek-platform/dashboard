import { useTheme } from '@/providers/ThemeProvider';
import { Box, Text } from '@/ui';
import { IpfsIcon } from '@/ui/Icon/Custom/IpfsIcon';
import { cn } from '@/utils/cn';

import { SearchForm } from './SearchForm';

export const Hero: React.FC = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Box className="flex flex-row items-center">
      <Box className="flex-1 items-start gap-3">
        <IpfsIcon
          className={cn('w-8 h-8 text-white', {
            'text-black': resolvedTheme === 'light',
          })}
        />
        <Text as="h1" size="2xl" weight={700} variant="primary">
          Browse IPFS gateways
        </Text>
        <Text as="p" size="lg" weight={400} variant="secondary">
          Check a specific IPFS hash for availability on public gateways.
        </Text>
        <SearchForm />
      </Box>
    </Box>
  );
};
