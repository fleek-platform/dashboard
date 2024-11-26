import { describe, it, expect } from 'vitest';
import { bytesToSize } from './fileSizeFormat';

describe('Utils bytesToSize', () => {
  it('should handle zero bytes', () => {
    expect(bytesToSize(0)).toBe('0 B');
  });

  it('should convert bytes to KB correctly', () => {
    expect(bytesToSize(1024)).toBe('1 KB');
  });

  it('should convert bytes to MB correctly', () => {
    expect(bytesToSize(1024 * 1024 - 1)).toBe('1 MB');
  });

  it('should convert bytes to GB correctly', () => {
    expect(bytesToSize(1024 * 1024 * 1024 - 1)).toBe('1 GB');
  });

  it('should convert bytes to TB correctly', () => {
    expect(bytesToSize(1024 * 1024 * 1024 * 1024 - 1)).toBe('1 TB');
  });

  it('should handle edge cases correctly', () => {
    expect(bytesToSize(1024 * 1024 + 50000000)).toBe('48.68 MB');
  });
});
