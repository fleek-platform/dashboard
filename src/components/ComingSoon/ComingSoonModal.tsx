import { ExternalLink } from '@/components';
import { ChildrenProps } from '@/types/Props';
import { Box, Button, Image, Text } from '@/ui';

import { LearnMoreMessage } from '../LearnMoreMessage/LearnMoreMessage';

export namespace ComingSoonModalNamespace {
  export type ModalProps = ChildrenProps<{ imgSrc: string; modalContent?: React.ReactNode }>;
  export type DescriptionProps = { children?: React.ReactNode };
  export type LearnMoreProps = { href: string; children?: React.ReactNode };
  export type CTAProps = { href?: string; children?: React.ReactNode };
}

export const ComingSoonModal = ({ children, modalContent, imgSrc }: ComingSoonModalNamespace.ModalProps) => {
  return (
    <Box className="block relative">
      <Box className="absolute bottom-0 w-full h-[16.125rem] bg-gradient-to-b from-transparent to-monochrome-normal" />
      <Box className="opacity-50">{children}</Box>
      <Box variant="container" className="absolute top-9 left-0 right-0 mx-auto gap-6 w-[26.5rem]">
        <Image src={imgSrc} alt="Coming Soon Image" className="rounded-lg" />
        {modalContent}
      </Box>
    </Box>
  );
};

ComingSoonModal.Description = ({ children }: ComingSoonModalNamespace.DescriptionProps) => <Text>{children}</Text>;

ComingSoonModal.LearnMore = ({ href, children }: ComingSoonModalNamespace.LearnMoreProps) => (
  <LearnMoreMessage href={href}>{children}</LearnMoreMessage>
);

ComingSoonModal.CTA = ({ href, children }: ComingSoonModalNamespace.CTAProps) => {
  if (!href) {
    return null;
  }

  return (
    <ExternalLink href={href}>
      <Button>{children}</Button>
    </ExternalLink>
  );
};
