import React from 'react';

import { constants } from '@/constants';
import { Box, Button, Icon, Text } from '@/ui';

import { useIpfsPropagationContext } from '../../Context'; // Import the context hook

export const ExampleHashes: React.FC = () => {
  const { setTestingHash } = useIpfsPropagationContext(); // Use the context hook

  return (
    <Box className="flex justify-center items-center h-full py-10">
      <Text variant="primary" size="md" weight={500}>
        Enter an IPFS hash above to continue
      </Text>
      <Box className="grid pt-2 gap-2.5">
        <Text className="pb-5 text-center">
          or test with one of our examples below
        </Text>
        {constants.IPFS_PROPAGATION_TOOL.DEFAULT_IPFS_HASHES.map((hash) => (
          <Button
            key={hash}
            intent="neutral"
            className="w-full justify-between gap-2"
            onClick={() => setTestingHash(hash)} // Use setTestingHash directly
          >
            {hash}
            <Icon name="arrow-right" className="opacity-70" />
          </Button>
        ))}
      </Box>
    </Box>
  );
};
