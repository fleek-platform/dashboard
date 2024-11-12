import React from 'react';

import { Text } from '@/ui';

import { ExternalLinkProps } from '../ExternalLink/ExternalLink';
import { BoxStyles as S } from './ResourcesBox.styles';

export type ResourcesBoxProps = {
  title?: string;
  description: string;
  externalLinkProps?: ExternalLinkProps;
  children: React.ReactElement<ExternalLinkProps>[];
};

export const ResourcesBox: React.FC<ResourcesBoxProps> = ({ title = 'Resources', description, externalLinkProps, children, ...props }) => {
  return (
    <S.Container {...props}>
      <Text as="h3" variant="primary" size="lg" weight={700}>
        {title}
      </Text>
      <Text>{description}</Text>
      <S.Links.Container>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            ...externalLinkProps,
            ...child.props,
          })
        )}
      </S.Links.Container>
    </S.Container>
  );
};
