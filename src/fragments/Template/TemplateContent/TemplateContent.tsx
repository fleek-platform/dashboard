import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { ComingSoon, ExternalLink } from '@/components';
import { TemplateNotFoundError, useReadme } from '@/hooks/useReadme';
import { LoadingProps } from '@/types/Props';
import { Template } from '@/types/Template';
import { Icon, Image, Skeleton, Text } from '@/ui';
import { cn } from '@/utils/cn';

import { TemplateContentStyles as S } from './TemplateContent.styles';

type TemplateContentProps = LoadingProps<{ template: Template }>;

export const TemplateContent: React.FC<TemplateContentProps> = ({
  template,
  isLoading,
}) => {
  if (isLoading) {
    return <TemplateContentSkeleton />;
  }

  return (
    <S.Details.Content>
      <Readme template={template} />
      <Screenshot src={template.deployment.previewImageUrl ?? undefined} />
    </S.Details.Content>
  );
};

type ScreenshotProps = LoadingProps<{ src: string | undefined }>;

const Screenshot: React.FC<ScreenshotProps> = ({ src, isLoading }) => {
  return (
    <S.Screenshot.Container>
      <Text as="h2" variant="primary" size="xl" weight={700}>
        Screenshot
      </Text>
      {isLoading ? <Skeleton /> : <Image src={src} alt="Template screenshot" />}
    </S.Screenshot.Container>
  );
};

const Readme: React.FC<TemplateContentProps> = ({ template, isLoading }) => {
  const readme = useReadme(template);

  if (readme.isLoading || isLoading) {
    return (
      <S.Details.ReadmeLoadingContainer>
        {new Array(6).fill(<ComingSoon.Skeleton.TextSkeleton />)}
      </S.Details.ReadmeLoadingContainer>
    );
  }

  if (readme.error || !readme.data) {
    if (readme.error instanceof TemplateNotFoundError) {
      return (
        <S.Details.ReadmeErrorContainer>
          <Icon name="question" />
          <Text as="h2" variant="primary" size="xl" weight={700}>
            No Readme
          </Text>
          <Text>This template does not have a readme.</Text>
        </S.Details.ReadmeErrorContainer>
      );
    }

    return (
      <S.Details.ReadmeErrorContainer>
        <Icon name="question" />
        <Text as="h2" variant="primary" size="xl" weight={700}>
          Issue getting Readme info
        </Text>
        <Text>Try refreshing the page.</Text>
      </S.Details.ReadmeErrorContainer>
    );
  }

  return (
    <S.Details.ReadmeContainer>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          /* eslint-disable @typescript-eslint/no-unused-vars */
          pre: ({ children, className, node, ...rest }) => (
            <pre
              {...rest}
              className={cn(
                className,
                'mb-4 bg-neutral-3 rounded-sm p-3 overflow-auto max-w-full',
              )}
            >
              {children}
            </pre>
          ),
          code: ({ children, className, node, ...rest }) => (
            <code
              {...rest}
              className={cn(
                className,
                'text-natural-12 bg-neutral-3 rounded-sm px-2',
              )}
            >
              {children}
            </code>
          ),
          p: ({ children, className, node, ...rest }) => (
            <Text
              {...rest}
              className={cn(className, 'mb-4 text-neutral-11')}
              as="p"
              variant="secondary"
              size="md"
            >
              {children}
            </Text>
          ),
          h1: ({ children, className, node, ...rest }) => (
            <Text
              {...rest}
              className={cn(
                className,
                'mb-4 pb-2 border-transparent border-b-neutral-4 border-2',
              )}
              as="h1"
              variant="primary"
              weight={700}
              size="3xl"
            >
              {children}
            </Text>
          ),
          h2: ({ children, className, node, ...rest }) => (
            <Text
              {...rest}
              className={cn(
                className,
                'mb-4 pb-2 border-transparent border-b-neutral-4 border-2',
              )}
              as="h2"
              variant="primary"
              weight={700}
              size="2xl"
            >
              {children}
            </Text>
          ),
          h3: ({ children, className, node, ...rest }) => (
            <Text
              {...rest}
              className={cn(className, 'mb-4')}
              as="h3"
              variant="primary"
              weight={700}
              size="xl"
            >
              {children}
            </Text>
          ),
          table: ({ children, className, node, ...rest }) => (
            <table
              {...rest}
              className={cn(
                className,
                'p-2 border-neutral-4 border-collapse mb-4 border-2',
              )}
            >
              {children}
            </table>
          ),
          td: ({ children, className, node, ...rest }) => (
            <td
              {...rest}
              className={cn(
                className,
                'p-2 border-neutral-4 border-collapse text-neutral-11 border-2',
              )}
            >
              {children}
            </td>
          ),
          th: ({ children, className, node, ...rest }) => (
            <th
              {...rest}
              className={cn(
                className,
                'p-2 border-neutral-4 border-collapse text-neutral-11 border-2',
              )}
            >
              {children}
            </th>
          ),
          ul: ({ children, className, node, ...rest }) => (
            <ul
              {...rest}
              className={cn(className, 'mb-4 pl-5 list-disc list-inside')}
            >
              {children}
            </ul>
          ),
          a: ({ children, className, node, href, ...rest }) => (
            <ExternalLink
              {...rest}
              href={href || '#'}
              className={cn(className, 'inline')}
              variant="accent"
            >
              {children}
            </ExternalLink>
          ),
          /* eslint-disable @typescript-eslint/no-unused-vars */
        }}
      >
        {readme.data}
      </ReactMarkdown>
    </S.Details.ReadmeContainer>
  );
};

const TemplateContentSkeleton: React.FC = () => (
  <S.Details.Content>
    <Readme isLoading />
    <Screenshot isLoading />
  </S.Details.Content>
);
