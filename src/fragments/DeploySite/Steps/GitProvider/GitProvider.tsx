import { routes } from '@fleek-platform/utils-routes';
import { useEffect, useState } from 'react';

import { BadgeText, RestrictionModal } from '@/components';
import { Link } from '@/components/ftw/Link/Link';
import { constants } from '@/constants';
import { SourceProvider } from '@/generated/graphqlClient';
import { useSiteRestriction } from '@/hooks/useBillingRestriction';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useSessionContext } from '@/providers/SessionProvider';
import { Box, Button, Icon, type IconName, Stepper, Text } from '@/ui';

import { useDeploySiteContext, useStepSetup } from '../../DeploySite.context';

export const GitProviderStep: React.FC = () => {
  const session = useSessionContext();
  const router = useRouter();
  const { nextStep } = Stepper.useContext();
  const { providerState, mode, handleInstallation, isPopUpOpen } =
    useDeploySiteContext();
  const hasBillingPermissions = usePermissions({
    action: [constants.PERMISSION.BILLING.MANAGE],
  });
  const hasReachedSitesLimit = useSiteRestriction().hasReachedLimit;

  const [isModalOpen, setIsModalOpen] = useState(false);

  useStepSetup({
    title: 'Connect the Git provider you want to use.',
    handleBackClick: () =>
      router.replace(
        routes.project.site.list({ projectId: session.project.id }),
      ),
  });

  useEffect(() => {
    if (hasReachedSitesLimit) {
      setIsModalOpen(true);
    }
  }, [hasReachedSitesLimit]);

  useEffect(() => {
    if (mode === 'self') {
      nextStep();
    }
  }, [mode, nextStep]);

  if (
    providerState?.requirements?.shouldInstall &&
    !providerState.requirements.shouldAuthenticate
  ) {
    const textMessage =
      mode === 'template'
        ? 'In order to deploy a Fleek Template, you will need to have installed the Fleek Templates App on GitHub. This app requests admin permissions in order to enable Fleek to create the repository for your template. Use the button below to begin the installation.'
        : 'In order to surface your GitHub repositories, you will need to have installed the Fleek App on GitHub. Use the button below to begin the installation.';

    return (
      <>
        <Box
          variant="container"
          className="relative items-center justify-center gap-9 rounded-xl"
        >
          <Text as="h2" variant="primary" size="xl" weight={700}>
            GitHub Installation
          </Text>

          <Box className="text-center gap-3">
            <Icon name="github" />
            <Text as="h3" variant="primary" weight={500}>
              Connect GitHub Account or Org
            </Text>
            <Text>{textMessage}</Text>
          </Box>

          <Button
            loading={isPopUpOpen || providerState.requirementsFetching}
            onClick={handleInstallation}
          >
            Install Fleek {mode === 'template' ? 'Templates' : ''} app on GitHub
          </Button>
        </Box>
      </>
    );
  }

  return (
    <>
      <RestrictionModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        shouldShowUpgradePlan={hasBillingPermissions}
      />
      <Box variant="container" className="relative gap-6 rounded-xl">
        <Text
          as="h2"
          variant="primary"
          size="xl"
          weight={700}
          className="self-start"
        >
          Select code location
        </Text>

        <ProviderButton
          provider={SourceProvider.GITHUB}
          isRestricted={hasReachedSitesLimit || session.loading}
        />
        <ProviderButton provider={SourceProvider.GITLAB} disabled />
        <ProviderButton provider={SourceProvider.BITBUCKET} disabled />
      </Box>

      <Box variant="container" className="inline">
        Do you want to manage your own site deployment using the Fleek
        CLI?&nbsp;
        {hasReachedSitesLimit ? (
          <Text className="text-accent-11 cursor-not-allowed inline" size="md">
            Click here
          </Text>
        ) : (
          <Link
            variant="accent"
            href={{
              pathname: routes.project.site.new({
                projectId: session.project.id,
              }),
              query: { mode: 'self' },
            }}
            replace
          >
            Click here
          </Link>
        )}
        .
      </Box>
    </>
  );
};

const GitProviderMap: Record<
  SourceProvider,
  {
    icon: IconName;
    text: string;
  }
> = {
  GITHUB: {
    icon: 'github',
    text: 'GitHub',
  },
  BITBUCKET: {
    icon: 'bitbucket',
    text: 'Bitbucket',
  },
  GITLAB: {
    icon: 'gitlab',
    text: 'Gitlab',
  },
};

type ProviderButtonProps = {
  provider: SourceProvider;
  isRestricted?: boolean;
} & Omit<React.ComponentProps<typeof Button>, 'children'>;

const ProviderButton: React.FC<ProviderButtonProps> = ({
  provider,
  isRestricted = false,
  ...props
}) => {
  const {
    handleGitProviderSelection,
    isCurrentProviderLoading,
    sourceProvider,
  } = useDeploySiteContext();

  return (
    <Button
      {...props}
      disabled={props.disabled || isRestricted}
      onClick={() => handleGitProviderSelection(provider)}
      loading={sourceProvider === provider && isCurrentProviderLoading}
      intent="ghost"
      size="lg"
      className="w-full group disabled:hover:bg-neutral-4 disabled:opacity-40 disabled:hover:opacity-100"
    >
      <section className="flex justify-between w-full">
        {GitProviderMap[provider].text}
        <Icon name={GitProviderMap[provider].icon} />
      </section>
      {props.disabled && (
        <BadgeText
          colorScheme="slate"
          className="absolute hidden left-1/2 self-center -translate-x-1/2 group-hover:block border border-neutral-6"
        >
          Coming Soon!
        </BadgeText>
      )}
    </Button>
  );
};
