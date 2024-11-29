import * as Dialog from '@radix-ui/react-dialog';
import type React from 'react';

import type { ChildrenProps } from '@/types/Props';
import { cn } from '@/utils/cn';

const Content: React.FC<ChildrenProps & Dialog.DialogContentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/20 fixed inset-0 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out z-10" />
      <Dialog.Content
        {...props}
        aria-describedby="Mobile menu sidebar"
        className={cn(
          'fixed top-0 left-0 bottom-0 data-[state=open]:animate-slide-in-left data-[state=closed]:animate-slide-out-left bg-neutral-2 z-10',
          className,
        )}
      >
        <Dialog.Title />
        <Dialog.Description />
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export const SidebarSidepanel = () => {
  throw new SidebarSidepanelError(
    'SidebarSidepanel cannot be used as a standalone component. Please use one of the subcomponents instead.',
  );
};

SidebarSidepanel.Root = Dialog.Root;
SidebarSidepanel.Trigger = Dialog.Trigger;
SidebarSidepanel.Content = Content;

class SidebarSidepanelError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SidebarSidepanelError';
  }
}
