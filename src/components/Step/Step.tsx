import { Stepper, Text } from '@/ui';

import { StepStyles as S } from './Step.styles';

type StepProps = {
  children: React.ReactNode;
  header: string;
};

export const Step: React.FC<StepProps> = ({ children, header }: StepProps) => {
  return (
    <S.Container>
      <S.Indicator>
        <Stepper.Indicator />
        <Text as="h1" variant="primary" size="md">
          {header}
        </Text>
      </S.Indicator>
      {children}
    </S.Container>
  );
};
