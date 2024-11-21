import React, { type ComponentPropsWithRef, useMemo } from 'react';

import { forwardStyledRef } from '@/theme';

import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/IconLibrary';
import type { ImageProps } from '../Image/Image';
import { Text } from '../ftw/Text/Text';
import { AvatarStyles as S } from './Avatar.styles';

export type AvatarProps = {
  title?: string;
  src?: ImageProps['src'];
  icon?: IconName;
  enableIcon?: boolean;
} & Omit<
  ComponentPropsWithRef<typeof S.Wrapper>,
  'children' | 'withIcon' | 'src'
>;

export const Avatar = forwardStyledRef<HTMLImageElement, AvatarProps>(
  S.Wrapper,
  ({ title = '', src, icon = 'person', enableIcon, ...props }, ref) => {
    const text = useMemo(() => {
      if (src) {
        return '';
      }

      if (enableIcon) {
        return <Icon name={icon} />;
      }

      const words = title.split(' ');
      const first = words[0].charAt(0);
      const last = words[words.length - 1].charAt(0);

      return (
        <Text>
          {first}
          {last}
        </Text>
      );
    }, [src, enableIcon, title, icon]);

    return (
      <S.Wrapper ref={ref} {...props} src={src} withIcon={enableIcon}>
        {text}
      </S.Wrapper>
    );
  },
);
