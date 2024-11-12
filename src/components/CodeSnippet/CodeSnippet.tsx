import { useToast } from '@/hooks/useToast';
import { forwardStyledRef } from '@/theme';
import { LoadingProps } from '@/types/Props';
import { Box, Button, Skeleton, Text } from '@/ui';
import { copyToClipboard } from '@/utils/copyClipboard';

import { CodeSnippetStyles as S } from './CodeSnippet.styles';

export type CodeSnippetProps = LoadingProps<
  {
    code?: string;
    title: string;
  } & Omit<React.ComponentPropsWithRef<typeof S.Root>, 'children'>
>;

export const CodeSnippet = forwardStyledRef<HTMLDivElement, CodeSnippetProps>(S.Root, ({ code, title, isLoading, ...props }, ref) => {
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
    <S.Root {...props} ref={ref}>
      <S.Header>
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
      </S.Header>
      <S.Body>{isLoading ? <Skeleton /> : code || <i>Not Available</i>}</S.Body>
    </S.Root>
  );
});
