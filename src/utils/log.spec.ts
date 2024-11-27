import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Log } from './log';

describe('Utils Log', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should have the correct identifier', () => {
    expect(Log.IDENTIFIER).toBe('[flk]');
  });

  describe('error', () => {
    it('should log error with identifier and single argument', () => {
      Log.error('Test error');
      expect(console.error).toHaveBeenCalledWith('[flk]', 'Test error');
    });

    it('should log error with identifier and multiple arguments', () => {
      Log.error('Error:', new Error('Test'), { details: 'test' });
      expect(console.error).toHaveBeenCalledWith(
        '[flk]',
        'Error:',
        new Error('Test'),
        { details: 'test' },
      );
    });
  });

  describe('warn', () => {
    it('should log warning with identifier and single argument', () => {
      Log.warn('Test warning');
      expect(console.warn).toHaveBeenCalledWith('[flk]', 'Test warning');
    });

    it('should log warning with identifier and multiple arguments', () => {
      Log.warn('Warning:', { type: 'test' }, 123);
      expect(console.warn).toHaveBeenCalledWith(
        '[flk]',
        'Warning:',
        { type: 'test' },
        123,
      );
    });
  });

  describe('info', () => {
    it('should log info with identifier and single argument', () => {
      Log.info('Test info');
      expect(console.info).toHaveBeenCalledWith('[flk]', 'Test info');
    });

    it('should log info with identifier and multiple arguments', () => {
      Log.info('Info:', { data: 'test' }, [1, 2, 3]);
      expect(console.info).toHaveBeenCalledWith(
        '[flk]',
        'Info:',
        { data: 'test' },
        [1, 2, 3],
      );
    });
  });
});
