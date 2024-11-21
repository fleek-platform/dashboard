import {
  CodeSnippet,
  type CodeSnippetProps,
  LearnMoreMessage,
} from '@/components';
import { constants } from '@/constants';
import { Button, Divider, Stepper, Text } from '@/ui';

import { SelfManagedSetupStyles as S } from './SelfManagedSetup.styles';

export type SelfManagedSetupProps = {
  title: string;
  description: string;
  codeSnippets: CodeSnippetProps[];
  projectId: string;
  flagSelfManagedSetedUp: () => void;
};

type CodeSnippetStep = {
  codeSnippet: CodeSnippetProps;
};

export const SelfManagedSetup: React.FC<SelfManagedSetupProps> = ({
  projectId,
  codeSnippets,
  flagSelfManagedSetedUp,
}) => {
  return (
    <S.Container>
      <Stepper.Root>
        <Stepper.Indicator />
        <Stepper.Container>
          <Stepper.Step>
            <Step1 />
          </Stepper.Step>
          <Stepper.Step>
            <Step2 projectId={projectId} />
          </Stepper.Step>
          <Stepper.Step>
            <Step3 codeSnippet={codeSnippets[0]} />
          </Stepper.Step>
          <Stepper.Step>
            <Step4 />
          </Stepper.Step>
          <Stepper.Step>
            <Step5 flagSelfManagedSetedUp={flagSelfManagedSetedUp} />
          </Stepper.Step>
        </Stepper.Container>
      </Stepper.Root>
    </S.Container>
  );
};

const Step1: React.FC = () => {
  return (
    <>
      <S.Header>
        <Text as="h2" variant="primary" size="xl" weight={700}>
          Install or Login to Fleek CLI
        </Text>
        <Text>
          If you do not have the Fleek CLI installed, copy the command below to
          install, once that is done you can login.
        </Text>
      </S.Header>
      <CodeSnippet title="Install" code={constants.CLI_COMMANDS.INSTALL} />
      <S.DividerContainer>
        <Divider />
        <span>OR</span>
        <Divider />
      </S.DividerContainer>
      <CodeSnippet title="Login" code={constants.CLI_COMMANDS.LOGIN} />
      <S.Row>
        <LearnMoreMessage
          href={constants.EXTERNAL_LINK.FLEEK_DOCS_SELF_MANAGED_SITE}
        >
          Self Deployed Sites
        </LearnMoreMessage>
        <ButtonContainer />
      </S.Row>
    </>
  );
};

const Step2: React.FC<{ projectId: string }> = ({ projectId }) => {
  return (
    <>
      <S.Header>
        <Text as="h2" variant="primary" size="xl" weight={700}>
          Select Project & Site
        </Text>
        <Text>
          Start off by selecting the Fleek project your site is located, after
          that select the site you want to host.
        </Text>
      </S.Header>
      <CodeSnippet
        title="Project"
        code={`${constants.CLI_COMMANDS.PROJECT_SWITCH} --id=${projectId}`}
      />
      <S.DividerContainer>
        <Divider />
        <span>AND</span>
        <Divider />
      </S.DividerContainer>
      <CodeSnippet title="Select Site" code={constants.CLI_COMMANDS.CD_SITE} />
      <S.Row>
        <LearnMoreMessage
          href={constants.EXTERNAL_LINK.FLEEK_DOCS_SELF_MANAGED_SITE}
        >
          Self Deployed Sites
        </LearnMoreMessage>
        <ButtonContainer backButton />
      </S.Row>
    </>
  );
};

const Step3: React.FC<CodeSnippetStep> = ({ codeSnippet }) => {
  return (
    <>
      <S.Header>
        <Text as="h2" variant="primary" size="xl" weight={700}>
          Configure Fleek
        </Text>
        <Text>
          Create a fleek.config.json in the site directory with the following
          configuration
        </Text>
      </S.Header>
      <CodeSnippet {...codeSnippet} />
      <S.Row>
        <LearnMoreMessage
          href={constants.EXTERNAL_LINK.FLEEK_DOCS_SELF_MANAGED_SITE}
        >
          Self Deployed Sites
        </LearnMoreMessage>
        <ButtonContainer backButton />
      </S.Row>
    </>
  );
};

const Step4: React.FC = () => {
  return (
    <>
      <S.Header>
        <Text as="h2" variant="primary" size="xl" weight={700}>
          Add GitHub CI (Optional)
        </Text>
        <Text>
          If you want automatic updates on your site from GitHub pull requests
          you can add the GitHub CI.
        </Text>
      </S.Header>
      <CodeSnippet title="Github CI" code={constants.CLI_COMMANDS.CI} />
      <S.Row>
        <LearnMoreMessage
          href={constants.EXTERNAL_LINK.FLEEK_DOCS_SELF_MANAGED_SITE}
        >
          Self Deployed Sites
        </LearnMoreMessage>
        <ButtonContainer backButton />
      </S.Row>
    </>
  );
};

const Step5: React.FC<
  Pick<SelfManagedSetupProps, 'flagSelfManagedSetedUp'>
> = ({ flagSelfManagedSetedUp }) => {
  return (
    <>
      <S.Header>
        <Text as="h2" variant="primary" size="xl" weight={700}>
          Deploy Site
        </Text>
        <Text>
          After all the previous steps are complete, you can deploy the site and
          it will begin to build on Fleek.
        </Text>
      </S.Header>
      <CodeSnippet title="Deploy" code={constants.CLI_COMMANDS.SITE_DEPLOY} />
      <S.Row>
        <LearnMoreMessage
          href={constants.EXTERNAL_LINK.FLEEK_DOCS_SELF_MANAGED_SITE}
        >
          Self Deployed Sites
        </LearnMoreMessage>
        <ButtonContainer
          backButton
          lastStep
          onContinue={flagSelfManagedSetedUp}
        />
      </S.Row>
    </>
  );
};

const ButtonContainer: React.FC<{
  backButton?: boolean;
  lastStep?: boolean;
  onContinue?: () => void;
}> = ({ onContinue, backButton = false, lastStep = false }) => {
  const stepper = Stepper.useContext();

  const handleNextStep = () => {
    if (onContinue) {
      onContinue();

      return;
    }

    stepper.nextStep();
  };

  const handlePrevStep = () => {
    stepper.prevStep();
  };

  return (
    <S.ButtonContainer>
      {backButton && (
        <Button intent="neutral" onClick={handlePrevStep}>
          Go back
        </Button>
      )}
      <Button onClick={handleNextStep}>
        {lastStep ? 'Ok, I have deployed' : 'Next step'}
      </Button>
    </S.ButtonContainer>
  );
};
