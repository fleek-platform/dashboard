import type React from 'react';

import type { ChildrenProps } from '@/types/Props';
import { cn } from '@/utils/cn';

type CodeBlock = ChildrenProps & React.HTMLAttributes<HTMLElement>;

export const CodeBlock: React.FC<CodeBlock> = ({
  children,
  className,
  ...props
}) => {
  return (
    <code
      className={cn(
        'bg-neutral-4 border text-[0.825em] border-neutral-6 py-[1px] px-[2px] rounded-sm',
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
};
