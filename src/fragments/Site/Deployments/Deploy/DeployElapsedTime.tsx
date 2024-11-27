import { match } from 'ts-pattern';

import { useTimer } from '@/hooks/useTimer';
import { Deployment } from '@/types/Deployment';
import { getDuration } from '@/utils/getDurationUntilNow';
import { parseAPIDeploymentStatus } from '@/utils/parseAPIDeploymentStatus';

type DeployElapsedTimeProps = {
  deployment?: Deployment;
};

export const DeployElapsedTime: React.FC<DeployElapsedTimeProps> = ({ deployment }) => {
  const parsedStatus = parseAPIDeploymentStatus(deployment?.status);

  const isLoading = parsedStatus === 'loading' || parsedStatus === 'cancelling';
  const timer = useTimer({ enabled: isLoading });

  const elapsedTimer = (initialISODate: string) =>
    getDuration({
      initialISODate,
      finalISODate: timer.now,
    });

  const elapsedFinishTime = getDuration({
    initialISODate: deployment?.startedAt ?? deployment?.createdAt,
    finalISODate: deployment?.updatedAt,
  });

  return match(parsedStatus)
    .with('created', () => <i>Pending...</i>)
    .with('loading', () => <>{elapsedTimer(deployment?.startedAt ?? deployment?.createdAt)}</>)
    .with('cancelling', () => {
      if (deployment?.startedAt) {
        return <>{elapsedTimer(deployment?.startedAt)}</>;
      }

      return <>--</>;
    })
    .with('success', () => <>{elapsedFinishTime}</>)
    .with('failed', () => <>{elapsedFinishTime}</>)
    .with('cancelled', () => {
      if (deployment?.startedAt) {
        return (
          <>
            {getDuration({
              initialISODate: deployment?.startedAt,
              finalISODate: deployment?.updatedAt,
            })}
          </>
        );
      }

      return <i>Build never started</i>;
    })
    .exhaustive();
};
