import { DateTime } from 'luxon';
import { useEffect, useRef, useState } from 'react';

import { StatusRadioProps } from '@/components';
import { BuildLog, DeploymentStatus } from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { DeploymentBuild, DeploymentStatus as ParsedDeploymentStatus } from '@/types/Deployment';
import { ChildrenProps } from '@/types/Props';
import { Accordion, Box, Button, Text } from '@/ui';
import { copyToClipboard } from '@/utils/copyClipboard';
import { dateFormat } from '@/utils/dateFormats';

import { DeploymentStyles as S } from './DeploymentDetail.styles';

type DeploymentLogsProps = {
  build: DeploymentBuild;
  status: ParsedDeploymentStatus;
  deploymentStatus: DeploymentStatus | undefined;
  isSelfManaged: boolean;
  startedAt?: string;
};

export const DeploymentLogs: React.FC<DeploymentLogsProps> = ({ build, status, deploymentStatus, isSelfManaged, startedAt }) => {
  const toast = useToast();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [initialLog, setInitialLog] = useState<BuildLog[]>([]);
  const [accordionValue, setAccordionValue] = useState<string[]>([]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      // Scroll to the bottom of the div when the component mounts or updates
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [build]);

  useEffect(() => {
    if ((!build || build?.logs?.length === 0) && initialLog.length === 0 && deploymentStatus === DeploymentStatus.BUILD_IN_PROGRESS) {
      setAccordionValue([...accordionValue, 'logs']);
      setInitialLog([
        {
          id: '1',
          createdAt: DateTime.now().toISO(),
          text: 'Build started',
        } as BuildLog,
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [build, deploymentStatus]);

  const logs = initialLog.concat(build?.logs || []);

  const handleCopyLogs = (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const logsString = logs.map((log) => log.text).join('\n');
      copyToClipboard(logsString);
      toast.success({ message: 'Build logs copied to clipboard' });
      event.stopPropagation();
    } catch (error) {
      toast.error({ message: 'Failed to copy Build logs to clipboard' });
    }
  };

  const steps = isSelfManaged ? DeploymentSteps['self-managed'] : DeploymentSteps['managed'];

  return (
    <S.Accordion.Root type="multiple" defaultValue={['logs']} value={accordionValue} onValueChange={setAccordionValue}>
      {steps.map((step, index) => (
        <Accordion.Item value={step.key} key={step.key}>
          <AccordionHeader
            step={step}
            deploymentStatus={deploymentStatus!}
            previousStepComplete={index === 0 ? undefined : steps[index - 1].completedState}
            key={step.key}
            startedAt={startedAt}
            isSelfManaged={isSelfManaged}
          >
            {step.key === 'logs' && (
              <Button size="sm" onClick={handleCopyLogs} disabled={isSelfManaged || logs.length === 0}>
                Copy to clipboard
              </Button>
            )}
          </AccordionHeader>
          {step.key === 'logs' && !isSelfManaged && (
            <S.Accordion.Content ref={scrollContainerRef}>
              <Box>
                {logs.map((log) => (
                  <LogRow key={log.id} log={log} deploymentStatus={status} />
                ))}
              </Box>
            </S.Accordion.Content>
          )}
        </Accordion.Item>
      ))}
    </S.Accordion.Root>
  );
};

type AccordionHeaderProps = ChildrenProps<{
  step: BuildStep;
  deploymentStatus: DeploymentStatus;
  previousStepComplete: DeploymentStatus | undefined;
  startedAt?: string;
  isSelfManaged: boolean;
}>;

const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  children,
  deploymentStatus,
  step,
  previousStepComplete,
  startedAt,
  isSelfManaged,
}) => {
  const status = getStepState({ step, currentStatus: deploymentStatus, previousStepComplete, startedAt, isSelfManaged });

  return (
    <S.Accordion.Header hideChevron={step.hideChevron} key={step.key}>
      <Box>
        <S.StatusRadio state={status} status={status} />{' '}
        <Text variant="primary" size="lg" weight={500}>
          {step.title}
        </Text>
      </Box>
      <S.RightAlignedBox>{children}</S.RightAlignedBox>
    </S.Accordion.Header>
  );
};

type LogRowProps = {
  log: BuildLog;
  deploymentStatus: ParsedDeploymentStatus;
};

const LogRow: React.FC<LogRowProps> = ({ log, deploymentStatus }) => {
  const getRowState = () => {
    switch (deploymentStatus) {
      case 'failed':
        return 'failed';
      case 'loading':
        return 'loading';
      default:
        return undefined;
    }
  };

  return (
    <S.Log.Row status={getRowState()}>
      <Text>{dateFormat({ dateISO: log.createdAt, stringFormat: 'HH:mm:ss.SSS' })}</Text>
      <Box>
        {log.text.split('\n').map((text) => (
          <Text key={text} variant="primary">
            {text}
          </Text>
        ))}
      </Box>
    </S.Log.Row>
  );
};

type BuildStepKey = 'git' | 'checkrun' | 'logs' | 'ipfs' | 'release' | 'availability';

type BuildStep = {
  title: string;
  pendingStates: DeploymentStatus[];
  completedState: DeploymentStatus;
  failedStates: DeploymentStatus[];
  hideChevron?: boolean;
  key: BuildStepKey;
};

type DeploymentType = 'managed' | 'self-managed';

const DeploymentSteps: Record<DeploymentType, BuildStep[]> = {
  managed: [
    {
      title: 'Cloning Git Repository',
      key: 'git',
      pendingStates: [DeploymentStatus.SOURCE_CLONE_IN_PROGRESS],
      completedState: DeploymentStatus.SOURCE_CLONE_COMPLETED,
      failedStates: [DeploymentStatus.SOURCE_CLONE_FAILED],
      hideChevron: true,
    },
    {
      title: 'Creating Check Run',
      key: 'checkrun',
      pendingStates: [],
      completedState: DeploymentStatus.CHECK_RUN_CREATING_COMPLETED,
      failedStates: [DeploymentStatus.CHECK_RUN_CREATING_FAILED],
      hideChevron: true,
    },
    {
      title: 'Build Logs',
      key: 'logs',
      pendingStates: [DeploymentStatus.BUILD_IN_PROGRESS],
      completedState: DeploymentStatus.BUILD_COMPLETED,
      failedStates: [DeploymentStatus.BUILD_CANCELLED, DeploymentStatus.BUILD_CANCELLING, DeploymentStatus.BUILD_FAILED],
    },
    {
      title: 'Upload to IPFS',
      key: 'ipfs',
      pendingStates: [DeploymentStatus.UPLOAD_IN_PROGRESS],
      completedState: DeploymentStatus.UPLOAD_COMPLETED,
      failedStates: [DeploymentStatus.UPLOAD_FAILED],
      hideChevron: true,
    },
    {
      title: 'Availability Check',
      pendingStates: [DeploymentStatus.READY_CHECK_IN_PROGRESS],
      completedState: DeploymentStatus.READY_CHECK_COMPLETED,
      failedStates: [DeploymentStatus.READY_CHECK_FAILED],
      hideChevron: true,
      key: 'availability',
    },
    {
      title: 'Release',
      key: 'release',
      pendingStates: [DeploymentStatus.RELEASE_IN_PROGRESS],
      completedState: DeploymentStatus.RELEASE_COMPLETED,
      failedStates: [DeploymentStatus.RELEASE_FAILED],
      hideChevron: true,
    },
  ],
  'self-managed': [
    {
      title: 'Build',
      pendingStates: [DeploymentStatus.BUILD_IN_PROGRESS],
      completedState: DeploymentStatus.BUILD_COMPLETED,
      failedStates: [DeploymentStatus.BUILD_CANCELLED, DeploymentStatus.BUILD_CANCELLING, DeploymentStatus.BUILD_FAILED],
      hideChevron: true,
      key: 'logs',
    },
    {
      title: 'Upload to IPFS',
      pendingStates: [DeploymentStatus.UPLOAD_IN_PROGRESS],
      completedState: DeploymentStatus.UPLOAD_COMPLETED,
      failedStates: [DeploymentStatus.UPLOAD_FAILED],
      key: 'ipfs',
      hideChevron: true,
    },
    {
      title: 'Availability Check',
      pendingStates: [DeploymentStatus.READY_CHECK_IN_PROGRESS],
      completedState: DeploymentStatus.READY_CHECK_COMPLETED,
      failedStates: [DeploymentStatus.READY_CHECK_FAILED],
      hideChevron: true,
      key: 'availability',
    },
    {
      title: 'Release',
      pendingStates: [DeploymentStatus.RELEASE_IN_PROGRESS],
      completedState: DeploymentStatus.RELEASE_COMPLETED,
      failedStates: [DeploymentStatus.RELEASE_FAILED],
      hideChevron: true,
      key: 'release',
    },
  ],
};

const ORDERED_STEPS: DeploymentStatus[] = [
  DeploymentStatus.CREATED,
  DeploymentStatus.SOURCE_CLONE_IN_PROGRESS,
  DeploymentStatus.SOURCE_CLONE_FAILED,
  DeploymentStatus.SOURCE_CLONE_COMPLETED,
  DeploymentStatus.CHECK_RUN_CREATING_FAILED,
  DeploymentStatus.CHECK_RUN_CREATING_COMPLETED,
  DeploymentStatus.BUILD_IN_PROGRESS,
  DeploymentStatus.BUILD_CANCELLED,
  DeploymentStatus.BUILD_CANCELLING,
  DeploymentStatus.BUILD_FAILED,
  DeploymentStatus.BUILD_COMPLETED,
  DeploymentStatus.UPLOAD_IN_PROGRESS,
  DeploymentStatus.UPLOAD_FAILED,
  DeploymentStatus.UPLOAD_COMPLETED,
  DeploymentStatus.READY_CHECK_IN_PROGRESS,
  DeploymentStatus.READY_CHECK_FAILED,
  DeploymentStatus.READY_CHECK_COMPLETED,
  DeploymentStatus.RELEASE_IN_PROGRESS,
  DeploymentStatus.RELEASE_FAILED,
  DeploymentStatus.RELEASE_COMPLETED,
];

type GetStepStateProps = {
  step: BuildStep;
  currentStatus: DeploymentStatus;
  previousStepComplete: DeploymentStatus | undefined;
  startedAt?: string;
  isSelfManaged: boolean;
};

const getStepState = ({
  step,
  currentStatus,
  previousStepComplete,
  startedAt,
  isSelfManaged,
}: GetStepStateProps): StatusRadioProps['state'] => {
  if (!step || !currentStatus || (!isSelfManaged && !startedAt)) {
    return undefined;
  }

  if (step.pendingStates.includes(currentStatus) || currentStatus === previousStepComplete) {
    return 'spinner';
  }

  if (step.failedStates.includes(currentStatus)) {
    return 'error';
  }

  if (currentStatus === step.completedState || ORDERED_STEPS.indexOf(currentStatus) > ORDERED_STEPS.indexOf(step.completedState)) {
    return 'success';
  }

  return undefined;
};
