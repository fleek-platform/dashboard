import { forwardRef } from 'react';

import { ChildrenProps } from '@/types/Props';
import { Text } from '@/ui';

import { LearnMoreMessageStyles as S } from './LearnMoreMessage.styles';

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
      <S.ExternalLink href={href}>{children}</S.ExternalLink>.
    </Text>
  );
});
