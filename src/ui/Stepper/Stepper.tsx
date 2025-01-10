/* eslint-disable fleek-custom/no-default-error */
import React, { forwardRef, useMemo, useState } from 'react';

import { cn } from '@/utils/cn';
import { createContext } from '@/utils/createContext';

import { Box, BoxProps } from '../ftw/Box/Box';

export type SelectContext = {
  totalSteps: number;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
};

const [Provider, useContext] = createContext<SelectContext>({
  name: 'Stepper.Context',
  hookName: 'Stepper.useContext',
  providerName: 'Stepper.Provider',
});

const getStepsLength = (node: React.ReactNode): number => {
  let length = 0;

  React.Children.forEach(node, (child) => {
    if (React.isValidElement(child)) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (child.type === Stepper.Step) {
        length += 1;
      } else {
        length += getStepsLength(child.props.children);
      }
    }
  });

  return length;
};

const Root: React.FC<Stepper.RootProps> = ({ children, initialStep = 1 }) => {
  const [currentStep, setCurrentStep] = useState(initialStep - 1);
  const totalSteps = useMemo(() => getStepsLength(children), [children]);

  const nextStep = (): void => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = (): void => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const setStep = (step: number): void => {
    if (step > 0 && step <= totalSteps) {
      setCurrentStep(step - 1);
    }
  };

  return <Provider value={{ totalSteps, currentStep, nextStep, prevStep, setStep }}>{children}</Provider>;
};

const Container = (props: Stepper.ContainerProps): JSX.Element => {
  const { children } = props;
  const { currentStep } = useContext();

  const filteredChildren = useMemo(
    () =>
      React.Children.toArray(children).map((child, index) => {
        if (!React.isValidElement(child)) {
          throw new Error('Stepper.Container children must be a valid React element');
        }

        if (child.type !== Stepper.Step) {
          throw new Error('Stepper.Container children must be a Stepper.Step component');
        }

        if (index === currentStep) {
          return child;
        }

        return null;
      }),
    [children, currentStep]
  );

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{filteredChildren}</>;
};

const Step = ({
  children,
}: // eslint-disable-next-line react/jsx-no-useless-fragment
Stepper.StepProps): JSX.Element => <>{children}</>;

const Indicator = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { currentStep, totalSteps } = useContext();
  const steps = Array.from(Array(totalSteps).keys());

  return (
    <Box className="gap-3" ref={ref} {...props}>
      <Box className="relative flex-row items-center gap-3 w-full">
        {steps.map((step) => (
          <Box
            key={step}
            className={cn('bg-neutral-4 w-8 h-2.5 rounded-full', {
              'bg-accent-11': step <= currentStep,
            })}
          />
        ))}
      </Box>
      <span className="text-accent-11">Step {currentStep + 1}</span>
    </Box>
  );
});

export const Stepper = {
  useContext,
  Root,
  Container,
  Step,
  Indicator,
};

export namespace Stepper {
  export type RootProps = {
    children: React.ReactNode;
    initialStep?: number;
  };

  export type StepIndex = string | number;

  export type ContainerProps = {
    children: React.ReactNode | React.ReactNode[];
  };

  export type StepProps = {
    children: React.ReactNode;
  };

  export type IndicatorProps = React.ComponentProps<typeof Box>;
}
