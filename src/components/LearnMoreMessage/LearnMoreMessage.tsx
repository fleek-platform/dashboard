import { forwardRef } from 'react';

import { ExternalLink } from '@/components';
import { ChildrenProps } from '@/types/Props';
import { Text } from '@/ui';

export type LearnMoreMessageProps = ChildrenProps<
  {
    prefix?: string;
    href: string;
  } & React.ComponentPropsWithRef<typeof Text>
>;

export const LearnMoreMessage = forwardRef<
  HTMLParagraphElement,
  LearnMoreMessageProps
>(({ prefix = 'Learn more about', href, children, ...props }, ref) => {
  return (
    <Text ref={ref} {...props} className="flex items-center">
      {prefix}&nbsp;
      <ExternalLink href={href} variant="accent" className="hover:underline">
        {children}
      </ExternalLink>
      .
    </Text>
  );
});
