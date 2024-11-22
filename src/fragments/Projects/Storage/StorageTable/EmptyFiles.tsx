import { CodeBlock, Text } from '@/ui';

import { StorageTableStyles as S } from './StorageTable.styles';

export const EmptyFiles: React.FC = () => {
  return (
    <S.EmptyFiles.Container>
      <>
        <Text as="h2" variant="primary" size="2xl" weight={700}>
          No files yet
        </Text>
        <Text size="md">
          Click the <CodeBlock>Upload</CodeBlock> button to store your first
          file or folder on Fleek
        </Text>
      </>
    </S.EmptyFiles.Container>
  );
};
