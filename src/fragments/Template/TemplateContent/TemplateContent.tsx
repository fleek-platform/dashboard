import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { ComingSoon } from '@/components';
import { TemplateNotFoundError, useReadme } from '@/hooks/useReadme';
import { LoadingProps } from '@/types/Props';
import { Template } from '@/types/Template';
import { Icon, Image, Skeleton, Text } from '@/ui';

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
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme.data}</ReactMarkdown>
    </S.Details.ReadmeContainer>
  );
};

const TemplateContentSkeleton: React.FC = () => (
  <S.Details.Content>
    <Readme isLoading />
    <Screenshot isLoading />
  </S.Details.Content>
);
