import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import '@testing-library/jest-dom/vitest';
import * as stories from './Text.stories';

const { Primary, Secondary } = composeStories(stories);

describe('Component Text', () => {
  afterEach(() => {
    cleanup();
  });

  describe('Primary Story', () => {
    it('renders with correct element, content and styling', () => {
      render(<Primary />);
      
      const textElement = screen.getByText('Get on Fleek!');
      
      expect(textElement.tagName.toLowerCase()).toBe('p');
      
      expect(textElement).toHaveClass(
        'text-neutral-12',
        'text-md',
        'font-medium'
      );
    });
  });

  describe('Secondary Story', () => {
    it('renders with correct element, content and styling', () => {
      render(<Secondary />);
      
      const textElement = screen.getByText('Connect your Git Provider or use the Fleek CLI.');
      
      expect(textElement.tagName.toLowerCase()).toBe('p');
      
      expect(textElement).toHaveClass(
        'text-neutral-11',
        'text-sm',
        'font-normal'
      );
    });
  });

  describe('Custom Props', () => {
    it('renders with custom className', () => {
      render(<Primary className="custom-class" />);
      
      const textElement = screen.getByText('Get on Fleek!');
      expect(textElement).toHaveClass('custom-class');
    });

    it('renders with different HTML element', () => {
      render(<Primary as="h1" />);
      
      const textElement = screen.getByText('Get on Fleek!');
      expect(textElement.tagName.toLowerCase()).toBe('h1');
    });
  });
});
