import React from 'react';

import { ChildrenProps } from '@/types/Props';
import { Box } from '@/ui';

const Wrapper: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <Box className="flex-1 relative grid md:grid-cols-2 [grid-template-areas:'aside_content'] justify-between pt-9 px-6 xl:px-7 md:pt-0 gap-[2rem] xl:gap-[5rem]">
      {children}
    </Box>
  );
};

const Aside: React.FC<ChildrenProps> = ({ children }) => {
  return <Box className="[grid-area:aside] md:sticky items-strech justify-center gap-7 top-[4.5rem]">{children}</Box>;
};

const Content: React.FC<ChildrenProps> = ({ children }) => {
  return <Box className="[grid-area:content] gap-4 items-stretch justify-center">{children}</Box>;
};

export const Grid = {
  Wrapper,
  Aside,
  Content,
};
