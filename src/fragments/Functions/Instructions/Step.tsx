import { LearnMoreMessage } from '@/components';
import { constants } from '@/constants';
import { ChildrenProps } from '@/types/Props';
import { Button, Stepper, Text } from '@/ui';

import { InstructionsStyles as S } from './Instructions.styles';

type StepProps = ChildrenProps<{
  title: string;
  description?: string;
}>;

export const Step: React.FC<StepProps> = ({ title, description, children }) => (
  <S.StepContainer>
    <Stepper.Indicator />
    <Text as="h2" variant="primary" size="xl" weight={700}>
      {title}
    </Text>
    {description && <Text>{description}</Text>}
    {children}
    <FooterRow />
  </S.StepContainer>
);

const FooterRow = () => {
  const { nextStep, currentStep, prevStep, setStep } = Stepper.useContext();

  const handleNextStep = () => {
    if (currentStep === 3) {
      setStep(1);

      return;
    }

    nextStep();
  };

  return (
    <S.LearnMoreRow>
      <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_DOCS_FUNCTIONS_LEARN_MORE}>functions</LearnMoreMessage>
      <S.ButtonContainer>
        {currentStep !== 0 && (
          <Button intent="neutral" onClick={prevStep}>
            Previous step
          </Button>
        )}
        <Button onClick={handleNextStep}>{currentStep === 3 ? 'Start over' : 'Next step'}</Button>
      </S.ButtonContainer>
    </S.LearnMoreRow>
  );
};
