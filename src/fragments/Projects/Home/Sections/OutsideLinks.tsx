import { constants } from '@/constants';
import { type TAB, useFeedbackModal } from '@/providers/FeedbackModalProvider';
import { Text } from '@/ui';

import { SectionsStyles as S } from './Sections.styles';

type OutsideLink = {
  title: string;
  description: string;
  href?: string;
  onClick?: () => void; // onClick handler takes in an optional callback, for example passing a hook
};

const generateOutsideLinks = (
  openModalWithTab: (tab: TAB) => void,
): OutsideLink[] => [
  {
    title: 'Read the docs',
    description: 'Explore our guides, API references and code examples.',
    href: constants.EXTERNAL_LINK.FLEEK_DOCS,
  },
  {
    title: 'Request a feature',
    description: 'Let us know your feedback and what feature you want next.',
    onClick: () => {
      openModalWithTab('FEEDBACK');
    },
  },
  {
    title: 'Join the Discord',
    description: 'Collaborate with other Fleek users or ask anything you want.',
    href: constants.EXTERNAL_LINK.FLEEK_DISCORD,
  },
  {
    title: 'Get support',
    description: 'View frequently asked questions and submit support tickets.',
    href: constants.EXTERNAL_LINK.FLEEK_SUPPORT,
  },
];

type ConditionalLinkProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

// Support for Non-Link components - ie triggering a modal
export const BoxOrLink: React.FC<ConditionalLinkProps> = ({
  href,
  onClick,
  children,
}) => {
  if (href) {
    return (
      <S.OutsideLinks.BoxLink href={href}>{children}</S.OutsideLinks.BoxLink>
    );
  }

  return <S.OutsideLinks.Box onClick={onClick}>{children}</S.OutsideLinks.Box>;
};

export const OutsideLinks: React.FC = () => {
  const { openModalWithTab } = useFeedbackModal();

  return (
    <S.OutsideLinks.GridArea>
      <Text as="h2" size="xl" weight={500}>
        Become a Fleek power user
      </Text>
      <S.OutsideLinks.Grid>
        {generateOutsideLinks(openModalWithTab).map(
          ({ title, href, description, onClick }) => (
            <BoxOrLink key={title} href={href} onClick={onClick}>
              <S.OutsideLinks.Header>
                <Text as="h3" size="lg" variant="primary" weight={700}>
                  {title}
                </Text>
                <S.RightArrow name="arrow-right" />
              </S.OutsideLinks.Header>
              <Text>{description}</Text>
            </BoxOrLink>
          ),
        )}
      </S.OutsideLinks.Grid>
    </S.OutsideLinks.GridArea>
  );
};
