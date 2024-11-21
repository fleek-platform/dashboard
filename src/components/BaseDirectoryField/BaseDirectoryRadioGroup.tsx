import { type MouseEventHandler, useMemo, useState } from 'react';

import { BadgeText, Form } from '@/components';
import { useGitTreeQuery } from '@/generated/graphqlClient';
import type { LoadingProps } from '@/types/Props';
import { Box, Icon, RadioGroup, Scrollable, Text } from '@/ui';

import { BaseDirectoryFieldStyles as S } from './BaseDirectoryField.styles';

export type BaseDirectoryRadioGroupProps = {
  fieldName: string;
  gitProviderId: string;
  sourceRepositoryOwner: string;
  sourceRepositoryName: string;
  sourceBranch: string;
};

export const BaseDirectoryRadioGroup: React.FC<
  BaseDirectoryRadioGroupProps
> = ({
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
    pause:
      !gitProviderId ||
      !sourceRepositoryOwner ||
      !sourceRepositoryName ||
      !sourceBranch,
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
    <RadioGroup.Root
      value={field.value}
      onValueChange={(value) => field.setValue(value, true)}
    >
      <S.RecursiveFolders.Row root>
        <RadioGroup.Item value="" />
        <Text>{sourceRepositoryName}</Text>
        <BadgeText colorScheme="yellow">Root</BadgeText>
      </S.RecursiveFolders.Row>

      <Scrollable.Root>
        <Scrollable.VerticalBar />
        <S.ScrollableViewport>
          <RecursiveFolders
            isLoading={gitTreeQuery.fetching as true}
            folders={folders}
            selected={field.value}
          />
        </S.ScrollableViewport>
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

const RecursiveFolders: React.FC<RecursiveFoldersProps> = ({
  folders,
  selected,
  isLoading,
}) => {
  if (isLoading || !folders) {
    return <RecursiveFoldersSkeleton />;
  }

  return (
    <S.RecursiveFolders.Wrapper>
      {Object.entries(folders).map(([key, value]) => {
        const folderPath = value[PATH];

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [showNested, setShowNested] = useState(
          selected.startsWith(folderPath),
        );

        const hasNested = Object.keys(value).length > 0;

        const handleShowNested = () => {
          setShowNested((prev) => !prev);
        };

        const handleSelect: MouseEventHandler = (event) => {
          event.stopPropagation();
        };

        return (
          <Box key={key}>
            <S.RecursiveFolders.Row onClick={handleShowNested}>
              <S.RecursiveFolders.Indicator
                hasNested={hasNested}
                showNested={showNested && hasNested}
              >
                <Icon name="chevron-right" />
              </S.RecursiveFolders.Indicator>
              <RadioGroup.Item value={folderPath} onClick={handleSelect} />
              <Text>{key}</Text>
            </S.RecursiveFolders.Row>

            {hasNested && showNested && (
              <S.RecursiveFolders.Nested>
                <RecursiveFolders folders={value} selected={selected} />
              </S.RecursiveFolders.Nested>
            )}
          </Box>
        );
      })}
    </S.RecursiveFolders.Wrapper>
  );
};

const RecursiveFoldersSkeleton = () => {
  const Line = () => (
    <S.RecursiveFolders.Row>
      <S.RecursiveFolders.Skeleton variant="radio" />
      <S.RecursiveFolders.Skeleton variant="text" />
    </S.RecursiveFolders.Row>
  );

  return (
    <S.RecursiveFolders.Wrapper>
      <Line />
      <Line />
      <Line />
      <Line />
    </S.RecursiveFolders.Wrapper>
  );
};
