import { ComingSoonStyles as S } from './ComingSoon.styles';
import { ComingSoonModal, type ComingSoonModalNamespace } from './ComingSoonModal';
import { ComingSoonOverlay, type ComingSoonOverlayProps } from './ComingSoonOverlay';

export const ComingSoon = {
  Overlay: ComingSoonOverlay,
  Modal: ComingSoonModal,
  Skeleton: {
    Container: S.Skeleton.Container,
    TextSkeleton: S.Skeleton.TextSkeleton,
    BigSkeleton: S.Skeleton.BigSkeleton,
    Row: S.Skeleton.Row,
    Box: S.Skeleton.Box,
  },
};

export namespace ComingSoon {
  export type ModalProps = ComingSoonModalNamespace.ModalProps;
  export type DescriptionProps = ComingSoonModalNamespace.DescriptionProps;
  export type LearnMoreProps = ComingSoonModalNamespace.LearnMoreProps;
  export type CTAProps = ComingSoonModalNamespace.CTAProps;
  export type OverlayProps = ComingSoonOverlayProps;
}
