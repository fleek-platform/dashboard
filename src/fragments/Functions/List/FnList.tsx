import { useEffect, useState } from 'react';

import { AlertBox } from '@/components';
import { Functions as F } from '@/fragments';
import {
  useFunctionsList,
  type UseFunctionsListArgs,
} from '@/hooks/useFunctionsList';
import { useProjectContext } from '@/providers/ProjectProvider';
import { useSessionContext } from '@/providers/SessionProvider';
import { Box, Button, CodeBlock, Input, Pagination, Text } from '@/ui';

import { FnItem, FnItemSkeleton } from './FnItem';

type FnListProps = {
  source?: UseFunctionsListArgs;
};

export const FnList: React.FC<FnListProps> = ({ source = 'project' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const session = useSessionContext();

  const {
    project: { id: projectId },
  } = useProjectContext();

  const { page, handlePageChange, fleekFunctionsQuery } =
    useFunctionsList(source);

  useEffect(() => {
    setSearchTerm('');
  }, [page]);

  const { fetching, error } = fleekFunctionsQuery;

  if (fetching || session.loading) {
    return (
      <Box className="gap-4 pt-[1px]">
        <F.Sections.ExternalLinks />
        <Box className="bg-neutral-2 rounded-lg border border-neutral-6 overflow-hidden">
          <FnItemSkeleton />
          <FnItemSkeleton />
          <FnItemSkeleton />
        </Box>
      </Box>
    );
  }

  if (error) {
    return <AlertBox variant="warning">{error.message}</AlertBox>;
  }

  const {
    fleekFunctions: { data, pageCount },
  } = fleekFunctionsQuery.data!;

  if (data.length === 0) {
    return (
      <>
        <F.Sections.ExternalLinks />
        <Box variant="container" className="items-center justify-center py-10">
          <Text as="h2" variant="primary" size="2xl" weight={700}>
            No functions yet
          </Text>
          <Text size="md">
            Use the CLI or click the <CodeBlock>Add new function</CodeBlock>{' '}
            button above to create one.
          </Text>
        </Box>
      </>
    );
  }

  const filteredData = data.filter((fleekFn) => {
    const term = searchTerm.toLowerCase();

    return (
      fleekFn.name.toLowerCase().includes(term) ||
      fleekFn.slug.toLowerCase().includes(term)
    );
  });

  return (
    <Box className="gap-4 pt-[1px]">
      <Input.Root>
        <Input.Icon name="magnify" />
        <Input.Field
          placeholder="Search by function name, slug, or site..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </Input.Root>

      <Box className="bg-neutral-2 rounded-lg border border-neutral-6 overflow-hidden">
        {filteredData.length > 0 ? (
          filteredData.map((fn) => (
            <FnItem key={fn.id} fn={fn} projectId={projectId} source={source} />
          ))
        ) : (
          <Box className="items-center justify-center flex-1 py-10 gap-4">
            <Box className="flex-row gap-1">
              <Text>No results for</Text>
              <Text variant="primary">{searchTerm}</Text>
            </Box>
            <Button
              variant="outline"
              intent="neutral"
              iconLeft="close-circle"
              onClick={() => setSearchTerm('')}
            >
              Clear search
            </Button>
          </Box>
        )}
      </Box>

      {pageCount > 1 && (
        <Pagination
          totalPages={pageCount}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </Box>
  );
};
