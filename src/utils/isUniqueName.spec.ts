import { describe, it, expect } from 'vitest';
import { isUniqueName } from './isUniqueName';

describe('Utils isUniqueName', () => {
  it('should return true when name is unique in list', () => {
    const list = [
      { name: 'File1' },
      { name: 'File2' },
      { name: 'File3' }
    ];
    
    expect(isUniqueName({ name: 'NewFile', list })).toBe(true);
  });

  it('should return false when name exists in list', () => {
    const list = [
      { name: 'File1' },
      { name: 'File2' },
      { name: 'File3' }
    ];
    
    expect(isUniqueName({ name: 'File2', list })).toBe(false);
  });

  it('should be case insensitive', () => {
    const list = [
      { name: 'File1' },
      { name: 'FILE2' },
      { name: 'file3' }
    ];
    
    expect(isUniqueName({ name: 'file2', list })).toBe(false);
    expect(isUniqueName({ name: 'FILE3', list })).toBe(false);
  });

  it('should handle empty list', () => {
    expect(isUniqueName({ name: 'File1', list: [] })).toBe(true);
  });

  it('should handle items with undefined name', () => {
    const list = [
      { name: 'File1' },
      { },
      { name: undefined },
      { name: null }
    ];
    
    expect(isUniqueName({ name: 'File2', list })).toBe(true);
  });

  it('should handle items without name property', () => {
    const list = [
      { name: 'File1' },
      { otherProp: 'value' },
      123,
      null,
      undefined
    ];
    
    expect(isUniqueName({ name: 'File2', list })).toBe(true);
  });

  it('should handle special characters in names', () => {
    const list = [
      { name: 'File-1' },
      { name: 'File@2' },
      { name: 'File#3' }
    ];
    
    expect(isUniqueName({ name: 'File-1', list })).toBe(false);
    expect(isUniqueName({ name: 'File$4', list })).toBe(true);
  });

  it('should handle whitespace in names', () => {
    const list = [
      { name: 'File 1' },
      { name: ' File2' },
      { name: 'File3 ' }
    ];
    
    expect(isUniqueName({ name: 'File 1', list })).toBe(false);
    expect(isUniqueName({ name: ' File2', list })).toBe(false);
    expect(isUniqueName({ name: 'File3 ', list })).toBe(false);
  });
});
