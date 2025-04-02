import React, { ComponentProps } from 'react';

import { useTheme } from '@/providers/ThemeProvider';
import { secrets } from '@/secrets';
import { Box, Image as ImageComponent } from '@/ui';
import { cn } from '@/utils/cn';

import { CodeBlock } from '../CodeBlock/CodeBlock';
import { Text } from '../Text/Text';
import { emptyStateIllustrations, Section } from './emptyStateIllustrations';

type ImageProps = ComponentProps<typeof ImageComponent> & {
  section: Section;
};

const Image: React.FC<ImageProps> = ({ section, ...props }) => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
  const src = secrets.NEXT_PUBLIC_DASHBOARD_BASE_PATH
    ? `${secrets.NEXT_PUBLIC_DASHBOARD_BASE_PATH}/${emptyStateIllustrations[theme][section]}`
    : emptyStateIllustrations[theme][section];

  return (
    <Box className="min-h-[120px] justify-center">
      <ImageComponent src={src} width={120} height="auto" {...props} />
    </Box>
  );
};

type DescriptionProps = {
  description: React.ReactNode;
};

const Description: React.FC<DescriptionProps> = ({ description }) => {
  if (typeof description === 'string') {
    const isOdd = (idx: number) => idx % 2 !== 0;
    const parsedDescription = description.split('`');

    return (
      <Text size="md" className="text-balance">
        {parsedDescription.map((textBlock, idx) =>
          isOdd(idx) ? (
            <CodeBlock key={textBlock}>{textBlock}</CodeBlock>
          ) : (
            <React.Fragment key={textBlock}>{textBlock}</React.Fragment>
          ),
        )}
      </Text>
    );
  }

  return (
    <Text size="md" className="text-balance">
      {description}
    </Text>
  );
};

type EmptyStateProps = ComponentProps<typeof Box> & {
  title: string;
  description: React.ReactNode;
  section: Section;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  section,
  className,
  ...props
}) => {
  return (
    <Box
      className={cn(
        'flex-1 justify-center items-center self-center text-center gap-3 max-w-lg',
        className,
      )}
      {...props}
    >
      <Image section={section} alt={title} />
      <Text as="h2" variant="primary" size="2xl" weight={700}>
        {title}
      </Text>
      <Description description={description} />
    </Box>
  );
};
