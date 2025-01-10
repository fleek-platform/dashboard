import { constants } from '@/constants';
import { TAB, useFeedbackModal } from '@/providers/FeedbackModalProvider';
import { Box, Icon, LinkBox, Text } from '@/ui';

type OutsideLink = {
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
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

export const OutsideLinks: React.FC = () => {
  const { openModalWithTab } = useFeedbackModal();

  return (
    <Box className="[grid-area:outside-links] gap-5">
      <Text as="h2" size="xl" weight={500}>
        Become a Fleek power user
      </Text>
      <Box className="grid grid-cols-2 gap-4 h-full">
        {generateOutsideLinks(openModalWithTab).map(
          ({ title, href, description, onClick }) => (
            <LinkBox
              key={title}
              href={href || '#'}
              onClick={onClick}
              isExternalLink={Boolean(href)}
              className="justify-between gap-2.5"
            >
              <Box className="flex-row justify-between">
                <Text as="h3" size="md" variant="primary" weight={700}>
                  {title}
                </Text>
                <Icon name="arrow-right" className="text-neutral-11" />
              </Box>
              <Text>{description}</Text>
            </LinkBox>
          ),
        )}
      </Box>
    </Box>
  );
};
