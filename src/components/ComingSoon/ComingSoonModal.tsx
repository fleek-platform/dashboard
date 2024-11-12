import { ChildrenProps } from '@/types/Props';
import { Button, Text } from '@/ui';

import { ExternalLink } from '../ExternalLink/ExternalLink';
import { LearnMoreMessage } from '../LearnMoreMessage/LearnMoreMessage';
import { ComingSoonStyles as S } from './ComingSoon.styles';

export namespace ComingSoonModalNamespace {
  export type ModalProps = ChildrenProps<{
    imgSrc: string;
    modalContent?: React.ReactNode;
  }>;
  export type DescriptionProps = { children?: React.ReactNode };
  export type LearnMoreProps = { href: string; children?: React.ReactNode };
  export type CTAProps = { href?: string; children?: React.ReactNode };
}

export const ComingSoonModal = ({
  children,
  modalContent,
  imgSrc,
}: ComingSoonModalNamespace.ModalProps) => {
  return (
    <S.Modal.Wrapper>
      <S.Modal.Backdrop />
      <S.Modal.ChildrenWrapper>{children}</S.Modal.ChildrenWrapper>
      <S.Modal.Container variant="container">
        <S.Modal.Image src={imgSrc} alt="Coming Soon Image" />
        {modalContent}
      </S.Modal.Container>
    </S.Modal.Wrapper>
  );
};

ComingSoonModal.Description = ({
  children,
}: ComingSoonModalNamespace.DescriptionProps) => <Text>{children}</Text>;

ComingSoonModal.LearnMore = ({
  href,
  children,
}: ComingSoonModalNamespace.LearnMoreProps) => (
  <LearnMoreMessage href={href}>{children}</LearnMoreMessage>
);

ComingSoonModal.CTA = ({
  href,
  children,
}: ComingSoonModalNamespace.CTAProps) => {
  if (href) {
    return null;
  }

  return (
    <ExternalLink href={href}>
      <Button>{children}</Button>
    </ExternalLink>
  );
};
