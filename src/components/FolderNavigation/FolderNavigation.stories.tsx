import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { Box, Button } from '@/ui';

import { FolderNavigation, FolderNavigationProps } from './FolderNavigation';

const meta: Meta = {
  title: 'Library/Components/Folder Navigation',
  component: FolderNavigation,
};

export default meta;

export const Default: StoryFn<FolderNavigationProps> = (args) => {
  const FolderElement = (): JSX.Element => {
    const [absolutePath, setAbsolutePath] = useState('');

    const handleFolderClick = (folderPath: string | undefined) => {
      if (folderPath) {
        setAbsolutePath(folderPath);
      }
    };

    return (
      <Box>
        <FolderNavigation
          {...args}
          absolutePath={absolutePath}
          onFolderClick={handleFolderClick}
        />
        <Box className="flex-row gap-1">
          <Button onClick={() => setAbsolutePath('')}>Storage</Button>
          <Button
            onClick={() => setAbsolutePath('fleek-xyz')}
            iconLeft="archive"
          >
            fleek-xyz
          </Button>
          <Button
            onClick={() => setAbsolutePath('fleek-xyz/Testing')}
            iconLeft="archive"
          >
            Testing
          </Button>
          <Button
            onClick={() => setAbsolutePath('fleek-xyz/Testing/Assets')}
            iconLeft="archive"
          >
            Assets
          </Button>
          <Button
            onClick={() => setAbsolutePath('fleek-xyz/Testing/Assets/Images')}
            iconLeft="archive"
          >
            Images
          </Button>
          <Button
            onClick={() =>
              setAbsolutePath('fleek-xyz/Testing/Assets/Images/Canvas')
            }
            iconLeft="archive"
          >
            Canvas
          </Button>
          <Button
            onClick={() =>
              setAbsolutePath('fleek-xyz/Testing/Assets/Images/Canvas/Cami')
            }
            iconLeft="archive"
          >
            Cami
          </Button>
          <Button
            onClick={() =>
              setAbsolutePath(
                'fleek-xyz/Testing/Assets/Images/Canvas/Cami/fleek-xyz',
              )
            }
            iconLeft="archive"
          >
            fleek-xyz
          </Button>
        </Box>
      </Box>
    );
  };

  return <FolderElement />;
};
