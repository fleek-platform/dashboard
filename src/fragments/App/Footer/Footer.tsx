import { routes } from '@fleek-platform/utils-routes';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { ExternalLink, FleekLogo, StatusChip } from '@/components';
import { VersionTags } from '@/components/Version/VersionTags';
import { constants } from '@/constants';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { Icon, Text } from '@/ui';
import { isServerSide } from '@/utils/isServerSide';

import { FooterStyles as S } from './Footer.styles';

type Link = {
  title: string;
  url: string;
};

type SectionType = { title: string; links: Array<Link> };

type SectionsType = Array<SectionType>;

const Sections: SectionsType = [
  {
    title: 'Product',
    links: [
      {
        title: 'Platform',
        url: `${constants.EXTERNAL_LINK.FLEEK_DOCS_PLATFORM}`,
      },
      {
        title: 'Infrastructure',
        url: `${constants.EXTERNAL_LINK.FLEEK_DOCS_INFRASTRUCTURE}`,
      },
      {
        title: 'CLI / SDK',
        url: `${constants.EXTERNAL_LINK.FLEEK_DOCS_CLI}`,
      },
      {
        title: 'Templates',
        url: routes.template.list(),
      },
    ],
  },
  {
    title: 'Developers',
    links: [
      {
        title: 'Fleek Network',
        url: `${constants.EXTERNAL_LINK.FLEEK_NETWORK}`,
      },
      {
        title: 'Changelog',
        url: `${constants.EXTERNAL_LINK.FLEEK_CHANGELOG}`,
      },
      {
        title: 'Github',
        url: `${constants.EXTERNAL_LINK.FLEEK_GITHUB}`,
      },
      {
        title: 'Status',
        url: `${constants.EXTERNAL_LINK.FLEEK_STATUS}`,
      },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        title: 'Documentation',
        url: `${constants.EXTERNAL_LINK.FLEEK_DOCS}`,
      },
      {
        title: 'Media Kit',
        url: `${constants.EXTERNAL_LINK.MEDIA_KIT}`,
      },
      {
        title: 'Guides',
        url: `${constants.EXTERNAL_LINK.FLEEK_GUIDES}`,
      },
      {
        title: 'Support',
        url: `${constants.EXTERNAL_LINK.FLEEK_SUPPORT}`,
      },
      {
        title: 'Report abuse',
        url: `${constants.EXTERNAL_LINK.FLEEK_SUPPORT_ABUSE}`,
      },
    ],
  },
  {
    title: 'Company',
    links: [
      {
        title: 'Blog',
        url: `${constants.EXTERNAL_LINK.FLEEK_BLOG}`,
      },
      {
        title: 'Pricing',
        url: `${constants.EXTERNAL_LINK.FLEEK_PRICING}`,
      },
      {
        title: 'Careers',
        url: `${constants.EXTERNAL_LINK.FLEEK_CAREERS}`,
      },
      {
        title: 'Terms of Service',
        url: `${constants.EXTERNAL_LINK.FLEEK_DOCS_TOS}`,
      },
      {
        title: 'Privacy Policy',
        url: `${constants.EXTERNAL_LINK.FLEEK_DOCS_PRIVACY}`,
      },

      {
        title: 'Contact us',
        url: `${constants.EXTERNAL_LINK.FLEEK_SUPPORT_TICKET}`,
      },
    ],
  },
];

const Section: React.FC<SectionType> = ({ title, links }) => {
  return (
    <S.Section.Container css={{ gridArea: `${title.toLowerCase()}` }}>
      <Text variant="primary" weight={500}>
        {title}
      </Text>
      {links.map((link) => (
        <S.Section.Link key={link.title} href={link.url}>
          {link.title}
        </S.Section.Link>
      ))}
    </S.Section.Container>
  );
};

const SectionsFragment: React.FC = () => {
  return (
    <S.Sections.Container>
      {Sections.map((section) => (
        <Section
          key={section.title}
          title={section.title}
          links={section.links}
        />
      ))}
    </S.Sections.Container>
  );
};

const SocialLinks: React.FC = () => {
  return (
    <S.SocialLinks.Container>
      <ExternalLink href={constants.EXTERNAL_LINK.FLEEK_GITHUB}>
        <Icon name="github" />
      </ExternalLink>
      <ExternalLink href={constants.EXTERNAL_LINK.FLEEK_TWITTER}>
        <Icon name="twitter" />
      </ExternalLink>
      <ExternalLink href={constants.EXTERNAL_LINK.FLEEK_DISCORD}>
        <Icon name="discord" />
      </ExternalLink>
    </S.SocialLinks.Container>
  );
};

const LeftFragment: React.FC = () => {
  const [showVersions, setShowVersion] = useState(false);
  const flags = useFeatureFlags();

  useEffect(() => {
    // on the client side, show versions if not prod or user is internal
    if (
      !isServerSide() &&
      (location.hostname !== 'app.fleek.xyz' || flags.isInternalUser)
    ) {
      setShowVersion(true);
    }
  }, [flags]);

  return (
    <S.LeftFragment.Wrapper>
      <S.LeftFragment.TopBox>
        <S.LeftFragment.Row>
          <S.LeftFragment.LogoWrapper>
            <FleekLogo />
          </S.LeftFragment.LogoWrapper>
          {showVersions && <VersionTags />}
        </S.LeftFragment.Row>

        <Text>The edge-optimized cloud platform</Text>

        <SocialLinks />
      </S.LeftFragment.TopBox>

      <ExternalLink href={constants.EXTERNAL_LINK.FLEEK_STATUS}>
        <StatusChip />
      </ExternalLink>
    </S.LeftFragment.Wrapper>
  );
};

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePositioning = () => {
      const footer = footerRef.current;
      const widget = document.getElementById('upload-widget') as HTMLElement;

      if (footer && widget) {
        const footerTop = footer.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;

        if (footerTop < viewportHeight) {
          widget.style.bottom = `${viewportHeight - footerTop}px`;
        } else {
          widget.style.bottom = '0';
        }
      }
    };

    window.addEventListener('scroll', handlePositioning);
    window.addEventListener('resize', handlePositioning);

    return () => {
      window.removeEventListener('scroll', handlePositioning);
      window.removeEventListener('resize', handlePositioning);
    };
  }, []);

  return (
    <S.Layout ref={footerRef}>
      <S.Content>
        <LeftFragment />
        <SectionsFragment />
      </S.Content>
    </S.Layout>
  );
};
