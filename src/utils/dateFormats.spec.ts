import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { dateFormat } from './dateFormats';
import { DateTime, Settings } from 'luxon';

// TODO: The dateFormat is used accross components
// and there are multiple formats. It'd be easier
// to test based on expected formats provided by
// an utility function that has a strict number
// of known formats. At the moment, these are decided
// at the component level (hard-typed)
// Once that's done replace the tests with arguments
// by the utility fn
describe('Utils dateFormats', () => {
  const testDate = '2024-12-25T15:30:45.123Z';

  beforeAll(() => {
    vi.useFakeTimers();
    Settings.defaultZone = 'UTC';
    process.env.TZ = 'UTC';
  });

  afterAll(() => {
    vi.useRealTimers();
    Settings.defaultZone = undefined;
    process.env.TZ = undefined;
  });

  it('should be UTC timezone', () => {
    const date = new Date();
    expect(date.getTimezoneOffset()).toBe(0);
  });

  it.todo('should format date using DateTime.DATE_MED', () => {
    const result = dateFormat({
      dateISO: testDate,
      format: DateTime.DATE_MED,
    });
    expect(result).toBe('Dec 25, 2024');
  });

  it('should format date using "LLLL, dd, y" format', () => {
    const result = dateFormat({
      dateISO: testDate,
      stringFormat: 'LLLL, dd, y',
    });
    expect(result).toBe('December, 25, 2024');
  });

  it('should format date using "MMM dd, yyyy" format', () => {
    const result = dateFormat({
      dateISO: testDate,
      stringFormat: 'MMM dd, yyyy',
    });
    expect(result).toBe('Dec 25, 2024');
  });

  it.todo('should format date using DateTime.DATE_FULL', () => {
    const result = dateFormat({
      dateISO: testDate,
      format: DateTime.DATE_FULL,
    });
    expect(result).toBe('December 25, 2024');
  });

  it('should format time using "HH:mm:ss.SSS" format', () => {
    const result = dateFormat({
      dateISO: testDate,
      stringFormat: 'HH:mm:ss.SSS',
    });
    expect(result).toBe('15:30:45.123');
  });
});
