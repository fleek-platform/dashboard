import { describe, it, expect } from 'vitest';
import { dateFormat } from './dateFormats';
import { DateTime } from 'luxon';

// TODO: The dateFormat is used accross components
// and there are multiple formats. It'd be easier
// to test based on expected formats provided by
// an utility function that has a strict number
// of known formats. At the moment, these are decided
// at the component level (hard-typed)
// Once that's done replace the tests with arguments
// by the utility fn
describe('Utils dateFormats', () => {
  const testDate = '2023-12-25T15:30:45.123Z';

  it('should format date using DateTime.DATE_MED', () => {
    const result = dateFormat({
      dateISO: testDate,
      format: DateTime.DATE_MED,
    });
    expect(result).toBe('25 Dec 2023');
  });

  it('should format date using "LLLL, dd, y" format', () => {
    const result = dateFormat({
      dateISO: testDate,
      stringFormat: 'LLLL, dd, y',
    });
    expect(result).toBe('December, 25, 2023');
  });

  it('should format date using "MMM dd, yyyy" format', () => {
    const result = dateFormat({
      dateISO: testDate,
      stringFormat: 'MMM dd, yyyy',
    });
    expect(result).toBe('Dec 25, 2023');
  });

  it('should format date using DateTime.DATE_FULL', () => {
    const result = dateFormat({
      dateISO: testDate,
      format: DateTime.DATE_FULL,
    });
    expect(result).toBe('25 December 2023');
  });

  it('should format time using "HH:mm:ss.SSS" format', () => {
    const result = dateFormat({
      dateISO: testDate,
      stringFormat: 'HH:mm:ss.SSS',
    });
    expect(result).toBe('15:30:45.123');
  });
});
