import { DateTime, DateTimeFormatOptions } from 'luxon';

type DateFormatArgs = {
  dateISO?: string;
  dateTimestamp?: number;
  format?: DateTimeFormatOptions;
  stringFormat?: string; // i.e 'HH:mm:ss.SSS' to show 15:30:45.123
};

export const dateFormat = ({ dateISO, dateTimestamp, format, stringFormat }: DateFormatArgs) => {
  let dateTime: DateTime | null = null;

  if (dateTimestamp) {
    dateTime = DateTime.fromSeconds(dateTimestamp);
  } else if (dateISO) {
    dateTime = DateTime.fromISO(dateISO);
  }

  if (!dateTime) {
    return 'Invalid date';
  }

  if (stringFormat) {
    return dateTime.toFormat(stringFormat);
  }

  return dateTime.toLocaleString(format);
};

export const LOCALIZED_DATE_AND_TIME = 'fff';
