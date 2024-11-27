import { cva, VariantProps } from 'class-variance-authority';
import { createElement, forwardRef } from 'react';

import { ChildrenProps } from '@/types/Props';
import { cn } from '@/utils/cn';

const textVariants = cva([], {
  variants: {
    variant: {
      primary: 'text-neutral-12',
      secondary: 'text-neutral-11',
      tertiary: 'text-neutral-10',
    },
    size: {
      '2xs': 'text-2xs',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    },
    weight: {
      400: 'font-normal',
      500: 'font-medium',
      700: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'secondary',
    size: 'sm',
    weight: 400,
  },
});

export const validTextElement = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

type ValidTextElement = (typeof validTextElement)[number];

type TextProps = ChildrenProps &
  React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof textVariants> & {
    as?: ValidTextElement;
  };

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ children, as = 'p', variant, size, weight, className, ...props }, ref) => {
    return createElement(as, { ref, className: cn(textVariants({ variant, size, weight }), className), ...props }, children);
  }
);
