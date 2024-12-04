import { DateTime, DateTimeFormatOptions } from 'luxon';

type DateFormatArgs = {
  dateISO: string;
  format?: DateTimeFormatOptions;
  stringFormat?: string; // i.e 'HH:mm:ss.SSS' to show 15:30:45.123
  locale?: string;
};

export const dateFormat = ({
  dateISO,
  format,
  stringFormat,
  locale = 'en-US',
}: DateFormatArgs) => {
  if (stringFormat) {
    return DateTime.fromISO(dateISO).toFormat(stringFormat);
  }

  return DateTime.fromISO(dateISO).toLocaleString(format, { locale });
};

export const LOCALIZED_DATE_AND_TIME = 'fff';
