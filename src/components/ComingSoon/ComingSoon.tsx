import React from 'react';

import { Box as BoxComponent, BoxProps } from '@/ui';
import { cn } from '@/utils/cn';
import { withProps } from '@/utils/withProps';

import { ComingSoonStyles as S } from './ComingSoon.styles';
import { ComingSoonModal, ComingSoonModalNamespace } from './ComingSoonModal';
import { ComingSoonOverlay, ComingSoonOverlayProps } from './ComingSoonOverlay';

const Container = withProps(BoxComponent, { className: 'gap-6' });

const Row: React.FC<BoxProps & { small?: boolean }> = ({ small, children }) => (
  <BoxComponent className={cn('flex-row gap-6', { 'gap-4': small })}>
    {children}
  </BoxComponent>
);

const Box: React.FC<BoxProps & { width?: 'column' }> = ({
  width,
  children,
}) => (
  <BoxComponent
    variant="container"
    className={cn('gap-4 w-full', { 'w-[13.75rem]': width === 'column' })}
  >
    {children}
  </BoxComponent>
);

export const ComingSoon = {
  Overlay: ComingSoonOverlay,
  Modal: ComingSoonModal,
  Skeleton: {
    Container,
    TextSkeleton: S.Skeleton.TextSkeleton,
    BigSkeleton: S.Skeleton.BigSkeleton,
    Row,
    Box,
  },
};

export namespace ComingSoon {
  export type ModalProps = ComingSoonModalNamespace.ModalProps;
  export type DescriptionProps = ComingSoonModalNamespace.DescriptionProps;
  export type LearnMoreProps = ComingSoonModalNamespace.LearnMoreProps;
  export type CTAProps = ComingSoonModalNamespace.CTAProps;
  export type OverlayProps = ComingSoonOverlayProps;
}
