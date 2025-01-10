import { ChildrenProps } from '@/types/Props';
import { Box, Icon, Menu, Skeleton, Text } from '@/ui';

export type FolderNavigationProps = {
  absolutePath?: string;
  isLoading?: boolean;
  onFolderClick: (pathToFolder: string | undefined) => void;
};

type FolderItem = {
  pathToFolder: string;
  label: string;
};

const getFoldersObject = (absolutePath: string): FolderItem[] => {
  let pathToFolder = '';
  const folderItems = absolutePath.split('/');

  return folderItems.map((folder, index) => {
    if (index === 0) {
      pathToFolder += folder;
    } else {
      pathToFolder += `/${folder}`;
    }

    return {
      pathToFolder,
      label: folder,
    };
  });
};

export const FolderNavigation: React.FC<FolderNavigationProps> = ({ absolutePath, isLoading = false, onFolderClick }) => {
  const getFoldersToDisplay = () => {
    if (!absolutePath) {
      return null;
    }

    const folderItems: FolderItem[] = getFoldersObject(absolutePath);

    if (folderItems.length > 6) {
      const firstFolder = folderItems.slice(0, 1);
      const theeDotsFolders = folderItems.slice(1, folderItems.length - 2);
      const lastTwoFolders = folderItems.slice(-2);

      return (
        <>
          <FolderItem onClickFolder={() => onFolderClick(firstFolder[0].pathToFolder)}>{firstFolder[0].label}</FolderItem>
          <ThreeDotsMenu folders={theeDotsFolders} onClickFolder={onFolderClick} />
          {lastTwoFolders.map((folder, index) => (
            <FolderItem key={index} onClickFolder={() => onFolderClick(folder.pathToFolder)}>
              {folder.label}
            </FolderItem>
          ))}
        </>
      );
    }

    return folderItems.map((folder, index) => (
      <FolderItem key={index} onClickFolder={() => onFolderClick(folder.pathToFolder)}>
        {folder.label}
      </FolderItem>
    ));
  };

  return (
    <Box className="flex-row">
      <Box onClick={() => onFolderClick(undefined)} className="cursor-pointer">
        <FolderLabel>Files</FolderLabel>
      </Box>
      {isLoading ? <FolderNavigationSkeleton /> : getFoldersToDisplay()}
    </Box>
  );
};

const FolderNavigationSkeleton: React.FC = () => (
  <Box className="flex-row gap-2.5">
    <Icon name="chevron-right" />
    <Box className="flex-row gap-2.5 items-center">
      <Skeleton variant="text" className="w-[4rem]" />
    </Box>
  </Box>
);

type ThreeDotsMenuProps = {
  folders: FolderItem[];
  onClickFolder: (pathToFolder: string) => void;
};

const ThreeDotsMenu: React.FC<ThreeDotsMenuProps> = ({ folders, onClickFolder }) => (
  <>
    <Icon name="chevron-right" />
    <Menu.Root>
      <Menu.Trigger asChild>
        <Icon name="ellipsis-circle" className="text-xl" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content align="start">
          {folders.map((folder, index) => (
            <Menu.Item key={index} className="justify-start gap-2.5" onClick={() => onClickFolder(folder.pathToFolder)}>
              <Icon name="archive" css={{ color: '$icon-slate-actionable' }} />
              {folder.label}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  </>
);

type FolderItemProps = ChildrenProps<{
  onClickFolder: () => void;
}>;

const FolderItem: React.FC<FolderItemProps> = ({ children, onClickFolder }) => {
  return (
    <Box className="flex-row gap-2.5">
      <Icon name="chevron-right" />
      <Box className="flex-row gap-2.5 cursor-pointer" onClick={onClickFolder}>
        <Icon name="archive" />
        <FolderLabel>{children}</FolderLabel>
      </Box>
    </Box>
  );
};

const FolderLabel: React.FC<ChildrenProps> = ({ children }) => (
  <Text size="md" variant="primary" weight={700}>
    {children}
  </Text>
);
