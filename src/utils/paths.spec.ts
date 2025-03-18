import { describe, it, expect, beforeEach, vi } from 'vitest';
import { joinBase } from './paths';

vi.mock('@/secrets', () => ({
  secrets: {
    NEXT_PUBLIC_BASE_PATH: '',
  },
}));

import { secrets } from '@/secrets';

describe('joinBase with assets directory', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  it('should correctly join base path with assets directory', () => {
    secrets.NEXT_PUBLIC_BASE_PATH = '/dashboard';
    
    expect(joinBase('/assets/images/logo.png')).toBe('/dashboard/assets/images/logo.png');
    expect(joinBase('assets/images/logo.png')).toBe('/dashboard/assets/images/logo.png');
  });
  
  it('should handle image paths with query parameters', () => {
    secrets.NEXT_PUBLIC_BASE_PATH = '/dashboard/';
    
    expect(joinBase('/assets/images/banner.jpg?width=1200')).toBe('/dashboard/assets/images/banner.jpg?width=1200');
    expect(joinBase('assets/images/profile.png?v=2')).toBe('/dashboard/assets/images/profile.png?v=2');
  });
  
  it('should normalize paths with double slashes in asset paths', () => {
    secrets.NEXT_PUBLIC_BASE_PATH = '';
    
    expect(joinBase('//assets//images/icon.svg')).toBe('/assets/images/icon.svg');
    expect(joinBase('/assets//images//logo.png')).toBe('/assets/images/logo.png');
  });
  
  it('should work with nested image directories', () => {
    secrets.NEXT_PUBLIC_BASE_PATH = '///dashboard/';
    
    expect(joinBase('/assets/images/products/item1.jpg')).toBe('/dashboard/assets/images/products/item1.jpg');
    expect(joinBase('assets/images/users/avatars/default.png')).toBe('/dashboard/assets/images/users/avatars/default.png');
  });
  
  it('should handle different image formats correctly', () => {
    secrets.NEXT_PUBLIC_BASE_PATH = '/dashboard';
    
    expect(joinBase('/assets/images/hero.jpg')).toBe('/dashboard/assets/images/hero.jpg');
    expect(joinBase('/assets/images/logo.png')).toBe('/dashboard/assets/images/logo.png');
    expect(joinBase('/assets/images/icon.svg')).toBe('/dashboard/assets/images/icon.svg');
    expect(joinBase('/assets/images/banner.webp')).toBe('/dashboard/assets/images/banner.webp');
  });
  
  it('should work when base path includes an environment indicator', () => {
    secrets.NEXT_PUBLIC_BASE_PATH = '/dashboard';
    
    expect(joinBase('/assets/images/logo.png')).toBe('/dashboard/assets/images/logo.png');
  });
  
  it('should handle empty base path with asset directories', () => {
    secrets.NEXT_PUBLIC_BASE_PATH = '';
    
    expect(joinBase('/assets/images/logo.png')).toBe('/assets/images/logo.png');
    expect(joinBase('assets/images/logo.png')).toBe('assets/images/logo.png');
  });
  
  it('should handle base path with trailing slash and asset paths', () => {
    secrets.NEXT_PUBLIC_BASE_PATH = '/dashboard/';
    
    expect(joinBase('/assets/images/logo.png')).toBe('/dashboard/assets/images/logo.png');
  });
  
  it('should handle complex cases with assets directory', () => {
    secrets.NEXT_PUBLIC_BASE_PATH = '/dashboard/';
    
    expect(joinBase('//assets///images/products/featured//item.jpg')).toBe('/dashboard/assets/images/products/featured/item.jpg');
  });
});
