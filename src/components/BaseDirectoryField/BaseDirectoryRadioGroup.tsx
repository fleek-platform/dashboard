import { MouseEventHandler, useMemo, useState } from 'react';

import { BadgeText, Form } from '@/components';
import { useGitTreeQuery } from '@/generated/graphqlClient';
import { ChildrenProps, LoadingProps } from '@/types/Props';
import { Box, Icon, RadioGroup, Scrollable, Skeleton, Text } from '@/ui';
import { cn } from '@/utils/cn';

export type BaseDirectoryRadioGroupProps = {
  fieldName: string;
  gitProviderId: string;
  sourceRepositoryOwner: string;
  sourceRepositoryName: string;
  sourceBranch: string;
};

export const BaseDirectoryRadioGroup: React.FC<BaseDirectoryRadioGroupProps> = ({
  gitProviderId,
  sourceRepositoryOwner,
  sourceRepositoryName,
  sourceBranch,
  fieldName,
}) => {
  const field = Form.useField<string>(fieldName);
  const [gitTreeQuery] = useGitTreeQuery({
    variables: {
      where: {
        gitProviderId: gitProviderId!,
        sourceRepositoryOwner: sourceRepositoryOwner!,
        sourceRepositoryName: sourceRepositoryName!,
        sourceBranch: sourceBranch!,
      },
    },
    pause: !gitProviderId || !sourceRepositoryOwner || !sourceRepositoryName || !sourceBranch,
  });

  const folders = useMemo<Folders | undefined>(() => {
    const data = gitTreeQuery.data?.gitApiTree;

    if (data && Array.isArray(data)) {
      const newPaths = data.reduce((acc, cur) => {
        if (cur.type === 'tree') {
          const segments: string[] = cur.path?.split('/') as string[];

          let inner = acc as { [key: string]: Folders };

          for (let i = 0; i < segments.length; i++) {
            if (!inner[segments[i]] || typeof inner[segments[i]] !== 'object') {
              inner[segments[i]] = {} as Folders;
            }

            if (i === segments.length - 1) {
              inner[segments[i]] = { [PATH]: cur.path! };
            }

            inner = inner[segments[i]];
          }
        }

        return acc;
      }, {} as Folders);

      return newPaths;
    }
  }, [gitTreeQuery]);

  return (
    <RadioGroup.Root value={field.value} onValueChange={(value) => field.setValue(value, true)}>
      <RecursiveFoldersRow className="border-y border-y-neutral-7 py-3 px-0">
        <RadioGroup.Item value="" />
        <Text>{sourceRepositoryName}</Text>
        <BadgeText colorScheme="yellow">Root</BadgeText>
      </RecursiveFoldersRow>

      <Scrollable.Root>
        <Scrollable.VerticalBar />
        <Scrollable.Viewport className="max-h-[30vh]">
          <RecursiveFolders isLoading={gitTreeQuery.fetching as true} folders={folders} selected={field.value} />
        </Scrollable.Viewport>
      </Scrollable.Root>
    </RadioGroup.Root>
  );
};

const PATH = Symbol('path');

type Folders = { [PATH]: string } | { [PATH]: string; [key: string]: Folders };

type RecursiveFoldersProps = LoadingProps<{
  folders: Folders;
  selected: string;
}>;

const RecursiveFolders: React.FC<RecursiveFoldersProps> = ({ folders, selected, isLoading }) => {
  if (isLoading || !folders) {
    return <RecursiveFoldersSkeleton />;
  }

  return (
    <Box className="gap-3">
      {Object.entries(folders).map(([key, value]) => {
        const folderPath = value[PATH];

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [showNested, setShowNested] = useState(selected.startsWith(folderPath));

        const hasNested = Object.keys(value).length > 0;

        const handleShowNested = () => {
          setShowNested((prev) => !prev);
        };

        const handleSelect: MouseEventHandler = (event) => {
          event.stopPropagation();
        };

        return (
          <Box key={key}>
            <RecursiveFoldersRow onClick={handleShowNested}>
              <Box className={cn('transition-all duration-75', { 'opacity-0': !hasNested, 'rotate-90': showNested && hasNested })}>
                <Icon name="chevron-right" />
              </Box>
              <RadioGroup.Item value={folderPath} onClick={handleSelect} />
              <Text>{key}</Text>
            </RecursiveFoldersRow>

            {hasNested && showNested && (
              <Box className="py-3 pl-6">
                <RecursiveFolders folders={value} selected={selected} />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export const RecursiveFoldersRow: React.FC<ChildrenProps<React.ComponentPropsWithRef<typeof Box>>> = ({
  children,
  className,
  ...props
}) => (
  <Box className={cn('flex-row gap-2.5 items-center cursor-pointer', className)} {...props}>
    {children}
  </Box>
);

export const RecursiveFoldersSkeleton = () => {
  const Line = () => (
    <RecursiveFoldersRow>
      <Skeleton variant="avatar" />
      <Skeleton variant="text" />
    </RecursiveFoldersRow>
  );

  return (
    <Box className="gap-3">
      <Line />
      <Line />
      <Line />
      <Line />
    </Box>
  );
};
