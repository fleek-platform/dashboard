import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

type UseTimerProps = {
  enabled: boolean;
  intervalDuration?: number;
};

export const useTimer = ({ enabled, intervalDuration = 1000 }: UseTimerProps) => {
  const [now, setNow] = useState(DateTime.now().toUTC().toISO());

  useEffect(() => {
    if (enabled) {
      setNow(DateTime.now().toUTC().toISO());
      const interval = setInterval(() => {
        setNow(DateTime.now().toUTC().toISO());
      }, intervalDuration);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, intervalDuration]);

  return { now };
};
