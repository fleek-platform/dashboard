import { routes } from '@fleek-platform/utils-routes';
import { useEffect, useState } from 'react';
import { useClient } from 'urql';

import { BadgeText, Form, Link } from '@/components';
import {
  GitAccessTokenQuery,
  GitProviderDocument,
  GitProviderQuery,
  GitProviderQueryVariables,
  GitProviderTags,
  useCreateGithubAppAuthorizationUrlMutation,
} from '@/generated/graphqlClient';
import { GitAccessTokenQueryVariables } from '@/generated/graphqlClient';
import { GitAccessTokenDocument } from '@/generated/graphqlClient';
import { usePollAccessTokens } from '@/hooks/usePollAccessTokens';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { GitHub, GitProvider } from '@/integrations/git';
import { useSessionContext } from '@/providers/SessionProvider';
import { LoadingProps } from '@/types/Props';
import { Button, Icon, Stepper, Text } from '@/ui';
import { openPopUpWindow } from '@/utils/openPopUpWindow';

import { useDeploySiteContext, useStepSetup } from '../../DeploySite.context';
import { GitHubAuthentication } from './GitHubAuthentication';
import { GitProviderStyles as S } from './GitProvider.styles';

export const GitProviderStep: React.FC = () => {
  const { nextStep } = Stepper.useContext();
  const {
    setSourceProvider,
    mode,
    sourceProvider,
    setGitUser,
    setGitRepository,
    setGitBranch,
    setGitProviderId,
  } = useDeploySiteContext();
  const session = useSessionContext();
  const router = useRouter();
  const form = Form.useContext();

  useStepSetup({
    title: 'Connect the Git Provider you want to use.',
    handleBackClick: () =>
      router.replace(
        routes.project.site.list({ projectId: session.project.id }),
      ),
  });

  useEffect(() => {
    if (mode === 'self') {
      setSourceProvider('self');
      nextStep();
    }
  }, [mode, nextStep, setSourceProvider]);

  useEffect(() => {
    // clean up git states
    setGitProviderId(undefined);
    setSourceProvider(undefined);
    setGitUser(undefined);
    setGitRepository(undefined);
    setGitBranch(undefined);
    form.resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (sourceProvider === 'github') {
    return <GitHubAuthentication />;
  }

  return (
    <>
      <S.Container>
        <Text
          as="h2"
          variant="primary"
          size="xl"
          weight={700}
          className="self-start"
        >
          Select Code Location
        </Text>
        <GitHubButton />
        <ProviderButton provider="gitlab" text="GitLab" disabled />
        <ProviderButton provider="bitbucket" text="Bitbucket" disabled />
      </S.Container>
      <S.Message>
        <Text variant="primary" size="md">
          Do you want to manage your own site deployment using the Fleek
          CLI?&nbsp;
          <Link
            className="text-accent-11 hover:underline"
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
          .
        </Text>
      </S.Message>
    </>
  );
};

const GitHubButton: React.FC = () => {
  const client = useClient();
  const {
    mode,
    setSourceProvider,
    setGitProviderId,
    gitProviderId,
    setAccessToken,
  } = useDeploySiteContext();
  const [, createGithubAppAuthorizationUrl] =
    useCreateGithubAppAuthorizationUrlMutation();
  const [shouldPollAccessTokens, setShouldPollAccessTokens] =
    useState<boolean>(false);
  usePollAccessTokens({
    gitProviderId,
    pause: !shouldPollAccessTokens || !gitProviderId,
    onFinishedCallback: (data) => {
      handleFinishedPolling(data);
    },
  });

  const toast = useToast();
  const [isSelected, setIsSelected] = useState(false);

  const onPopUpClose = async () => {
    setShouldPollAccessTokens(true);
  };

  const fetchRequiredData = async () => {
    try {
      const gitAccessTokensResult = await client.query<
        GitAccessTokenQuery,
        GitAccessTokenQueryVariables
      >(GitAccessTokenDocument, {}, { requestPolicy: 'network-only' });

      const gitUserAccessTokens =
        gitAccessTokensResult.data?.user.gitUserAccessTokens;

      if (gitAccessTokensResult.error || !gitUserAccessTokens) {
        throw (
          gitAccessTokensResult.error ||
          new Error('Failed to get Git Access tokens')
        );
      }

      const tag =
        mode === 'template' ? GitProviderTags.templates : GitProviderTags.sites;

      const gitProviderQueryResult = await client.query<
        GitProviderQuery,
        GitProviderQueryVariables
      >(
        GitProviderDocument,
        { where: { tag } },
        { requestPolicy: 'network-only' },
      );

      const gitProvider = gitProviderQueryResult.data?.gitProvider;

      if (gitProviderQueryResult.error || !gitProvider) {
        throw gitProviderQueryResult.error;
      }

      return {
        gitProviderId: gitProvider?.id,
        accessTokens: gitUserAccessTokens,
      };
    } catch (error) {
      toast.error({
        error,
        log: 'Unexpected error checking if should authenticate',
      });
      setIsSelected(false);
    }
  };

  const handleGithubAuth = async ({
    authorizationGitProviderId,
  }: { authorizationGitProviderId: string }) => {
    try {
      if (!authorizationGitProviderId) {
        // eslint-disable-next-line fleek-custom/no-default-error
        throw new Error('Unexpected auth without authenticationGitProviderId');
      }

      const result = await createGithubAppAuthorizationUrl({
        where: { gitProviderId: authorizationGitProviderId },
      });

      if (result.error || !result.data?.createGithubAppAuthorizationUrl) {
        setIsSelected(false);

        throw result.error || new Error('Failed to create authorization url');
      }

      return openPopUpWindow({
        url: result.data.createGithubAppAuthorizationUrl,
        onClose: onPopUpClose,
      });
    } catch (error) {
      return toast.error({ error, log: 'Failed to create authorization url' });
    }
  };

  const checkIfShouldAuthenticate = async ({
    accessToken,
  }: { accessToken?: string }) => {
    if (!accessToken) {
      return true;
    }

    try {
      await GitHub.testAuth(accessToken);

      return false;
    } catch {
      return true;
    }
  };

  const handleFinishedPolling = async (accessToken?: string | null) => {
    if (!accessToken) {
      return;
    }

    const shouldAuthenticate = await checkIfShouldAuthenticate({ accessToken });

    if (shouldAuthenticate) {
      handleSelect();
    } else {
      setAccessToken(accessToken);
      setSourceProvider('github');
    }
  };

  const handleSelect = async () => {
    setIsSelected(true);

    const data = await fetchRequiredData();

    if (!data || !data.gitProviderId) {
      setIsSelected(false);

      return;
    }

    setGitProviderId(data.gitProviderId);

    const authorizationAccessToken = data.accessTokens.find(
      (gitAccessToken) => gitAccessToken.gitProviderId === data.gitProviderId,
    )?.token;

    if (!authorizationAccessToken) {
      return handleGithubAuth({
        authorizationGitProviderId: data.gitProviderId,
      });
    }

    const shouldAuthenticate = await checkIfShouldAuthenticate({
      accessToken: authorizationAccessToken,
    });

    if (shouldAuthenticate) {
      return handleGithubAuth({
        authorizationGitProviderId: data.gitProviderId,
      });
    }

    setAccessToken(authorizationAccessToken);
    setSourceProvider('github');
  };

  return (
    <ProviderButton
      text="GitHub"
      provider="github"
      isLoading={isSelected}
      onClick={handleSelect}
    />
  );
};

type ProviderButtonProps = {
  provider: GitProvider.Name;
  text: string;
} & Omit<React.ComponentProps<typeof Button>, 'children'> &
  LoadingProps;

const ProviderButton: React.FC<ProviderButtonProps> = ({
  provider,
  text,
  isLoading,
  ...props
}) => {
  return (
    <Button
      {...props}
      loading={isLoading}
      intent="ghost"
      size="lg"
      className="w-full group disabled:hover:bg-neutral-4 disabled:opacity-40 disabled:hover:opacity-100"
    >
      <section className="flex justify-between w-full">
        {text}
        <Icon name={provider} />
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
