import React, { useState } from 'react';

import { IconTooltip } from '@/components';
import { ChildrenProps } from '@/types/Props';
import { Box, Text } from '@/ui';

type SortingHeaderProps = {
  name: string;
  onClick: () => void;
};

const SortingHeader: React.FC<SortingHeaderProps> = ({ name, onClick }) => {
  const [sort, setSort] = useState(false); // TODO remove when context is added

  const handleClick = () => {
    // TODO add sorting once the query supports it

    onClick();
    setSort(!sort);
  };

  return (
    <Text onClick={handleClick} className="cursor-pointer">
      {name}
    </Text>
  );
};

const StorageSubheaderCell: React.FC<ChildrenProps> = ({ children }) => {
  return <th className="px-6 h-8 text-left">{children}</th>;
};

export const StorageSubheader: React.FC = () => {
  return (
    <tr>
      <StorageSubheaderCell>
        <Text>Name</Text>
      </StorageSubheaderCell>
      <StorageSubheaderCell>
        <SortingHeader name="Size" onClick={() => {}} />
      </StorageSubheaderCell>
      <StorageSubheaderCell>
        <SortingHeader name="Uploaded" onClick={() => {}} />
      </StorageSubheaderCell>
      <StorageSubheaderCell>
        <Text>Hash</Text>
      </StorageSubheaderCell>
      <StorageSubheaderCell>
        <Box className="flex-row gap-2">
          <Text>Storage</Text>
          <IconTooltip side="bottom" className="text-neutral-11 text-sm">
            Adjust your storage settings in project settings
          </IconTooltip>
        </Box>
      </StorageSubheaderCell>
      <StorageSubheaderCell />
    </tr>
  );
};
