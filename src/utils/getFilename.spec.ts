import { describe, it, expect } from 'vitest';
import { getFilename } from './getFilename';

describe('Utils getFilename', () => {
  it('should correctly split a simple filename with extension', () => {
    const result = getFilename('document.pdf');
    expect(result).toEqual({
      filename: 'document',
      extension: 'pdf'
    });
  });

  it('should handle filenames with multiple dots', () => {
    const result = getFilename('my.special.test.file.txt');
    expect(result).toEqual({
      filename: 'my.special.test.file',
      extension: 'txt'
    });
  });

  it('should handle filenames without extension', () => {
    const result = getFilename('README');
    expect(result).toEqual({
      filename: 'README',
      extension: ''
    });
  });

  it('should handle hidden files (starting with dot)', () => {
    const result = getFilename('.gitignore');
    expect(result).toEqual({
      filename: '',
      extension: 'gitignore'
    });
  });

  it('should handle empty string input', () => {
    const result = getFilename('');
    expect(result).toEqual({
      filename: '',
      extension: ''
    });
  });
});
