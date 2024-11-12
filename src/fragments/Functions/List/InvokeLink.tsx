import { useMemo } from 'react';

import { ExternalLink } from '@/components';
import { styled } from '@/theme';
import { Text } from '@/ui';

type InvokeLinkProps = {
  href: string;
};

export const InvokeLink = styled(({ href }: InvokeLinkProps) => {
  const display = useMemo(() => {
    if (href) {
      const url = new URL(href);

      return url.hostname;
    }
  }, [href]);

  return (
    <ExternalLink href={href}>
      <Text variant="primary">{display}</Text>
    </ExternalLink>
  );
});
