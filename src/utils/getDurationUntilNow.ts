import { DateTime, Duration } from 'luxon';

import { constants } from '@/constants';

type GetDurationUntilNowArgs = {
  isoDateString: string;
  shortFormat?: boolean;
} & FallbackArgs;

// shortFormat = true -> 1m ago
// shortFormat = false -> 1 minute ago
export const getDurationUntilNow = ({
  isoDateString,
  shortFormat = false,
  fallback = constants.DEFAULT_DATE_FORMAT_FALLBACK,
}: GetDurationUntilNowArgs) => {
  const targetTime = DateTime.fromISO(isoDateString);

  if (!targetTime.isValid) {
    return fallback;
  }

  const currentTime = DateTime.now();
  const diff = currentTime.diff(targetTime);

  if (diff.as('seconds') < 60) {
    return 'just now';
  } else if (diff.as('minutes') < 60) {
    return `${Math.floor(diff.as('minutes'))}${shortFormat ? 'm' : `minute${Math.floor(diff.as('minutes')) > 1 ? 's' : ''}`} ago`;
  } else if (diff.as('hours') < 24) {
    return `${Math.floor(diff.as('hours'))}${shortFormat ? 'h' : `hour${Math.floor(diff.as('hours')) > 1 ? 's' : ''}`} ago`;
  } else if (diff.as('days') < 365) {
    return `${Math.floor(diff.as('days'))}${shortFormat ? 'd' : `day${Math.floor(diff.as('days')) > 1 ? 's' : ''}`} ago`;
  } else {
    return `more than ${Math.floor(diff.as('years'))}${shortFormat ? 'y' : `year${Math.floor(diff.as('years')) > 1 ? 's' : ''}`} ago`;
  }
};

type GetDurationArgs = {
  initialISODate: string;
  finalISODate: string;
} & FallbackArgs;

export const getDuration = ({
  initialISODate,
  finalISODate,
  fallback = constants.DEFAULT_DATE_FORMAT_FALLBACK,
}: GetDurationArgs) => {
  try {
    const targetTime = DateTime.fromISO(initialISODate);
    const finalTime = DateTime.fromISO(finalISODate);

    if (!targetTime.isValid || !finalTime.isValid) {
      return fallback;
    }

    const diff = finalTime.diff(targetTime);

    if (diff.as('seconds') < 60) {
      return `${Math.floor(diff.as('seconds'))}s`;
    } else if (diff.as('minutes') < 60) {
      return `${Math.floor(diff.as('minutes'))}m ${Math.floor(diff.as('seconds') % 60)}s`;
    } else if (diff.as('hours') < 24) {
      return `${Math.floor(diff.as('hours'))}h ${Math.floor(diff.as('minutes') % 60)}m`;
    } else if (diff.as('days') < 30) {
      return `${Math.floor(diff.as('days'))}d`;
    } else if (diff.as('months') < 12) {
      return `${Math.floor(diff.as('months'))}month${Math.floor(diff.as('months')) > 1 ? 's' : ''}`;
    } else {
      return `more than ${Math.floor(diff.as('years'))}${`year${Math.floor(diff.as('years')) > 1 ? 's' : ''}`}`;
    }
  } catch {
    return '-';
  }
};

type FallbackArgs = {
  fallback?: string;
};

// eslint-disable-next-line fleek-custom/valid-argument-types
export const convertToReadableTime = (timeInMilliseconds: number) => {
  const seconds = Math.floor(
    Duration.fromMillis(timeInMilliseconds).as('seconds'),
  );
  const minutes = Math.floor(
    Duration.fromMillis(timeInMilliseconds).as('minutes'),
  );
  const hours = Math.floor(Duration.fromMillis(timeInMilliseconds).as('hours'));

  if (seconds <= 60) {
    return `${seconds} second${seconds > 1 ? 's' : ''}`;
  } else if (minutes <= 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }
};
