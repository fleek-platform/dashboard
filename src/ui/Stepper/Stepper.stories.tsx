import { Meta, StoryFn } from '@storybook/react';

import { Step } from '@/components';

import { Box } from '../Box/Box';
import { Button } from '../ftw/Button/Button';
import { Text } from '../ftw/Text/Text';
import { Stepper } from './Stepper';

const meta: Meta = {
  title: 'Library/Components/Stepper',
};

export default meta;

const StepperButton: React.FC = () => {
  const { nextStep, prevStep } = Stepper.useContext();

  return (
    <Box css={{ gap: '$spacing-8' }}>
      <Button onClick={prevStep}>Prev</Button>
      <Button onClick={nextStep}>Next</Button>
    </Box>
  );
};

export const Default: StoryFn = () => {
  return (
    <>
      <Stepper.Root initialStep={1}>
        <Stepper.Container>
          <Stepper.Step>
            <Text>Content step 1</Text>
            <Stepper.Indicator />
          </Stepper.Step>
          <Stepper.Step>
            <Text>Content step 2</Text>
            <Stepper.Indicator />
          </Stepper.Step>
          <Stepper.Step>
            <Text>Content step 3</Text>
            <Stepper.Indicator />
          </Stepper.Step>
          <Stepper.Step>
            <Text>Content step 4</Text>
            <Stepper.Indicator />
          </Stepper.Step>
        </Stepper.Container>

        <StepperButton />
      </Stepper.Root>
    </>
  );
};

export const WithStepComponent: StoryFn = () => {
  return (
    <>
      <Stepper.Root initialStep={1}>
        <Stepper.Container>
          <Stepper.Step>
            <Step header="Step 1">
              <Text>Content step 1</Text>
            </Step>
          </Stepper.Step>
          <Stepper.Step>
            <Step header="Step 2">
              <Text>Content step 2</Text>
            </Step>
          </Stepper.Step>
          <Stepper.Step>
            <Step header="Step 3">
              <Text>Content step 3</Text>
            </Step>
          </Stepper.Step>
        </Stepper.Container>

        <StepperButton />
      </Stepper.Root>
    </>
  );
};
