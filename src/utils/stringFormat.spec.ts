import { describe, it, expect } from 'vitest';
import { shortStringFormat, firstLetterUpperCase } from './stringFormat';

describe('Utils stringFormat', () => {
  describe('shortStringFormat', () => {
    it('should format string with default index of 4', () => {
      const result = shortStringFormat({
        str: 'abcdefghijklmnop'
      });
      expect(result).toBe('abcd...mnop');
    });

    it('should format string with custom index', () => {
      const result = shortStringFormat({
        str: 'abcdefghijklmnop',
        index: 2
      });
      expect(result).toBe('ab...op');
    });

    it('should handle short strings that are shorter than 2 * index', () => {
      const result = shortStringFormat({
        str: 'abcdef',
        index: 4
      });
      expect(result).toBe('abcd...cdef');
    });

    it('should handle empty string', () => {
      const result = shortStringFormat({
        str: ''
      });
      expect(result).toBe('...');
    });

    it('should handle string shorter than index', () => {
      const result = shortStringFormat({
        str: 'abc',
        index: 4
      });
      expect(result).toBe('abc...abc');
    });
  });

  describe('firstLetterUpperCase', () => {
    it('should capitalize first letter of each word', () => {
      const result = firstLetterUpperCase('hello world');
      expect(result).toBe('Hello World');
    });

    it('should handle already capitalized words', () => {
      const result = firstLetterUpperCase('HELLO WORLD');
      expect(result).toBe('Hello World');
    });

    it('should handle mixed case words', () => {
      const result = firstLetterUpperCase('hELLo WoRLD');
      expect(result).toBe('Hello World');
    });

    it('should handle single word', () => {
      const result = firstLetterUpperCase('javascript');
      expect(result).toBe('Javascript');
    });

    it('should handle empty string', () => {
      const result = firstLetterUpperCase('');
      expect(result).toBe('');
    });

    it('should handle multiple spaces between words', () => {
      const result = firstLetterUpperCase('hello   world   test');
      expect(result).toBe('Hello   World   Test');
    });

    it('should handle string with numbers', () => {
      const result = firstLetterUpperCase('hello world 123');
      expect(result).toBe('Hello World 123');
    });

    it('should handle string with special characters', () => {
      const result = firstLetterUpperCase('hello-world @test');
      expect(result).toBe('Hello-world @test');
    });
  });
});
