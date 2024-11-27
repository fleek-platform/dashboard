import { AlertBox, CodeSnippet, ExternalLink } from '@/components';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { useSessionContext } from '@/providers/SessionProvider';
import { Divider, Stepper, Text } from '@/ui';

import { InstructionsStyles as S } from './Instructions.styles';
import { Step } from './Step';

type InstructionsProps = {
  initialStep?: 1 | 2 | 3 | 4;
  functionName?: string;
};

type StepProps = {
  functionName: string;
};
type Step3Props = StepProps;
type Step4Props = StepProps;

export const Instructions = ({ initialStep, functionName = '<fleek_function_name>' }: InstructionsProps) => {
  const hasDeployFunctionPermission = usePermissions({ action: [constants.PERMISSION.FUNCTIONS.DEPLOY] });

  if (hasDeployFunctionPermission) {
    return (
      <S.MainContainer variant="container">
        <Stepper.Root initialStep={initialStep}>
          <Stepper.Container>
            <Stepper.Step>
              <Step1 />
            </Stepper.Step>
            <Stepper.Step>
              <Step2 />
            </Stepper.Step>
            <Stepper.Step>
              <Step3 functionName={functionName} />
            </Stepper.Step>
            <Stepper.Step>
              <Step4 functionName={functionName} />
            </Stepper.Step>
          </Stepper.Container>
        </Stepper.Root>
      </S.MainContainer>
    );
  }

  return null;
};

const DividerContainer = ({ divider = 'OR' }: { divider?: string }) => (
  <S.DividerContainer>
    <Divider />
    <span>{divider}</span>
    <Divider />
  </S.DividerContainer>
);

const Step1 = () => {
  return (
    <Step
      title="Install or Login to Fleek CLI"
      description="If you do not have the Fleek CLI installed, copy the command below to install, once that is done you can login."
    >
      <CodeSnippet title="Install" code="npm install -g @fleek-platform/cli" />
      <DividerContainer />
      <CodeSnippet title="Login" code="fleek login" />
    </Step>
  );
};

const Step2 = () => {
  const session = useSessionContext();

  return (
    <Step title="Select Project" description="Start off by selecting the Fleek project you want your function to be located.">
      <CodeSnippet title="Select Project" code={`fleek projects switch --id=${session.project.id}`} />
    </Step>
  );
};

const Step3 = ({ functionName }: Step3Props) => (
  <Step title="Create Function">
    <Text>
      Write the code which the function will run, start by creating a file called{' '}
      <Text as="span" className="text-accent-11">
        function.js
      </Text>{' '}
      and input the following code. After this, you can create the function running the command below.
    </Text>
    <CodeSnippet
      title="function.js"
      code={`export const main = (params) => {
  return "hello world"
}`}
    />
    <AlertBox size="sm" variant="bulb">
      <S.DocsText>
        <Text weight={500}>For more details on how to structure your code and get ready for deployment.</Text>
        <ExternalLink href={constants.EXTERNAL_LINK.FLEEK_DOCS_FUNCTIONS_LEARN_MORE}>Go to Docs</ExternalLink>
      </S.DocsText>
    </AlertBox>
    <DividerContainer divider="AND" />
    <CodeSnippet title="Create Function" code={`fleek functions create  --name ${functionName}`} />
  </Step>
);

const Step4 = ({ functionName }: Step4Props) => (
  <Step
    title="Deploy Function"
    description="To create a new function deployment, run the following command. After this, you will be given the URL of your function within the CLI output where you can make a request to the function."
  >
    <CodeSnippet title="Deploy Function" code={`fleek functions deploy --name ${functionName} --path <code_path>`} />
  </Step>
);
