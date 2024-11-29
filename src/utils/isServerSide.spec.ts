import { describe, it, expect, afterEach } from 'vitest';
import { isServerSide } from './isServerSide';

describe('Utils isServerSide', () => {
  const originalWindow = global.window;

  afterEach(() => {
    global.window = originalWindow;
  });

  it('should return true when window is undefined', () => {
    global.window = undefined;
    expect(isServerSide()).toBe(true);
  });

  it('should return false when window is defined', () => {
    global.window = {} as Window & typeof globalThis;
    expect(isServerSide()).toBe(false);
  });

  it('should handle window being null', () => {
    global.window = null;
    expect(isServerSide()).toBe(true);
  });
});
