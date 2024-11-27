import { afterEach, describe, it, expect, vi, beforeEach } from 'vitest';
import { fileToBase64 } from './fileToBase64';

describe('Utils fileToBase64', () => {
  let realFileReader: typeof FileReader;

  beforeEach(() => {
    vi.clearAllMocks();
    realFileReader = global.FileReader;
  });

  afterEach(() => {
    global.FileReader = realFileReader;
  });

  it('should convert a file to base64 string', async () => {
    const content = 'Hello World from Fleek!';
    const blob = new Blob([content], { type: 'text/plain' });
    const testFile = new File([blob], 'test.txt', { type: 'text/plain' });
    const expectedBase64 =
      'data:text/plain;base64,SGVsbG8gV29ybGQgZnJvbSBGbGVlayE=';
    const result = await fileToBase64({ file: testFile });

    expect(result).toBe(expectedBase64);
  });

  it('should handle empty file content', async () => {
    const content = '';
    const blob = new Blob([content], { type: 'text/plain' });
    const testFile = new File([blob], 'test.txt', { type: 'text/plain' });
    const expectedBase64 = 'data:text/plain;base64,';
    const result = await fileToBase64({ file: testFile });

    expect(result).toBe(expectedBase64);
  });

  it('should handle FileReader errors', async () => {
    FileReader.prototype.readAsDataURL = function () {
      setTimeout(() => {
        const error = new Error('File reading failed');
        this.onerror && this.onerror(error);
      }, 0);
    };

    const testFile = new File(['Lorem ipsum dolor es punoniti'], 'test.txt', {
      type: 'text/plain',
    });
    await expect(fileToBase64({ file: testFile })).rejects.toThrow(
      'File reading failed',
    );
  });
});
