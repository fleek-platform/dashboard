import { forwardRef } from 'react';

import { useToast } from '@/hooks/useToast';
import { LoadingProps } from '@/types/Props';
import { Box, Button, Skeleton, Text } from '@/ui';
import { copyToClipboard } from '@/utils/copyClipboard';

import { CodeSnippetStyles as S } from './CodeSnippet.styles';

export type CodeSnippetProps = LoadingProps<
  {
    code?: string;
    title: string;
  } & Omit<React.ComponentPropsWithRef<typeof Box>, 'children'>
>;

export const CodeSnippet = forwardRef<HTMLDivElement, CodeSnippetProps>(
  ({ code, title, isLoading, ...props }, ref) => {
    const toast = useToast();

    const handleCopyClick = () => {
      if (code) {
        try {
          copyToClipboard(code);
          toast.success({ message: 'Copied to clipboard' });
        } catch (error) {
          toast.error({ message: 'Failed to copy to clipboard' });
        }
      }
    };

    return (
      <Box {...props} ref={ref} variant="container" className="p-0 gap-0">
        <Box className="flex-row justify-between items-center border-b border-neutral-6 px-4 py-2.5">
          <Text variant="primary" weight={500}>
            {title}
          </Text>
          <Box className="h-[2rem]">
            {code && (
              <Button size="sm" onClick={handleCopyClick} disabled={isLoading}>
                Copy
              </Button>
            )}
          </Box>
        </Box>
        <S.Body>
          {isLoading ? <Skeleton /> : code || <i>Not Available</i>}
        </S.Body>
      </Box>
    );
  },
);
