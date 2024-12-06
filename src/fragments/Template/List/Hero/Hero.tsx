import { routes } from '@fleek-platform/utils-routes';

import { ExternalLink } from '@/components';
import { constants } from '@/constants';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { useRouter } from '@/hooks/useRouter';
import { useSessionContext } from '@/providers/SessionProvider';
import { Button, Text } from '@/ui';

import { TemplateStyles as S } from '../../Template.styles';

export const Hero: React.FC = () => {
  const flags = useFeatureFlags();

  return (
    <S.List.Hero.Container>
      <Text size="md" weight={500}>
        TEMPLATES
      </Text>
      <Text as="h1" variant="primary" size="3xl" weight={700}>
        Begin with a template
      </Text>
      <Text size="lg" className="max-w-[40rem] text-center">
        Use a template to kick start your application. Pick from just a
        framework or a full web3 starter kit, the possibilities are limitless.
      </Text>
      <S.List.Hero.ButtonContainer>
        <ExternalLink href={constants.EXTERNAL_LINK.FLEEK_DOCS_TEMPLATES}>
          <Button>Learn more</Button>
        </ExternalLink>

        {flags.enableTemplateCreation && <SubmitTemplateButton />}
      </S.List.Hero.ButtonContainer>
    </S.List.Hero.Container>
  );
};

const SubmitTemplateButton: React.FC = () => {
  const { auth: { accessToken, login } } = useSessionContext();
  const router = useRouter();

  const handleSubmitTemplate = () => {
    if (!accessToken) {
      return login('dynamic', routes.profile.settings.templates());
    }

    return router.push(routes.profile.settings.templates());
  };

  return (
    <Button intent="neutral" onClick={handleSubmitTemplate}>
      Submit template
    </Button>
  );
};
