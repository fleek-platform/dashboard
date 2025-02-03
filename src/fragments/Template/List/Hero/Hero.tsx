import { routes } from '@fleek-platform/utils-routes';

import { LinkButton } from '@/components';
import { constants } from '@/constants';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { useRouter } from '@/hooks/useRouter';
import { useSessionContext } from '@/providers/SessionProvider';
import { Box, Button, Text } from '@/ui';

export const Hero: React.FC = () => {
  const flags = useFeatureFlags();

  return (
    <Box className="[grid-area:hero] items-center gap-2.5">
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
      <Box className="flex-row gap-3 pt-5">
        <LinkButton
          href={constants.EXTERNAL_LINK.FLEEK_DOCS_TEMPLATES}
          isExternalLink
        >
          Learn more
        </LinkButton>

        {flags.enableTemplateCreation && <SubmitTemplateButton />}
      </Box>
    </Box>
  );
};

const SubmitTemplateButton: React.FC = () => {
  const session = useSessionContext();
  const router = useRouter();

  const handleSubmitTemplate = () => {
    if (!session.auth.accessToken) {
      return session.auth.login('dynamic', routes.profile.settings.templates());
    }

    return router.push(routes.profile.settings.templates());
  };

  return (
    <Button intent="neutral" onClick={handleSubmitTemplate}>
      Submit template
    </Button>
  );
};
