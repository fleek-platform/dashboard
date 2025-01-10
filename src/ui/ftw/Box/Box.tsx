/* eslint-disable react/forbid-elements */
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

import { ChildrenProps } from '@/types/Props';
import { cn } from '@/utils/cn';

export const boxVariants = cva('flex flex-col', {
  variants: {
    variant: {
      container: 'bg-surface-content p-4 gap-4 rounded-lg border border-neutral-6 overflow-hidden',
    },
  },
});

export type BoxProps = ChildrenProps & React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof boxVariants>;

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(({ children, variant, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn(boxVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
});
