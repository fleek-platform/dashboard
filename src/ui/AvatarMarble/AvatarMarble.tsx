import React from 'react';

import { constants } from '@/constants';
import { forwardStyledRef } from '@/theme';
import { generateColors } from '@/utils/avatarColor';

import { AvatarMarbleStyles as S } from './AvatarMarble.styles';

export type AvatarMarbleProps = React.ComponentPropsWithRef<typeof S.Container> & {
  name?: string;
};

const colors = ['#FFFF57', '#7B7B7B', '#5ADBFF', '#FE9000', '#FFCAE9'];

export const AvatarMarble = forwardStyledRef<SVGSVGElement, AvatarMarbleProps>(S.Container, ({ name = '', ...props }, ref) => {
  const properties = generateColors({ name, colors });
  const maskID = React.useId();

  return (
    <S.Container
      viewBox={`0 0 ${constants.AVATAR.SIZE} ${constants.AVATAR.SIZE}`}
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <mask id={maskID} maskUnits="userSpaceOnUse" x={0} y={0} width={constants.AVATAR.SIZE} height={constants.AVATAR.SIZE}>
        <rect width={constants.AVATAR.SIZE} height={constants.AVATAR.SIZE} className="fill-white/95" />
      </mask>
      <g mask={`url(#${maskID})`}>
        <rect width={constants.AVATAR.SIZE} height={constants.AVATAR.SIZE} fill={properties[0].color} className="bg-monochrome-normal" />
        {Array.from({ length: 3 }).map((_, idx) => {
          const id = idx + 1;
          const isOverlay = id !== 1;
          const basePath = 'M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z';
          const overlayPath = 'M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z';

          return (
            <path
              key={idx}
              filter="url(#prefix__filter0_f)"
              fill={properties[id].color}
              d={isOverlay ? overlayPath : basePath}
              transform={`translate(${properties[id].translateX} ${properties[id].translateY}) rotate(${properties[id].rotate} ${
                constants.AVATAR.SIZE / 2
              } ${constants.AVATAR.SIZE / 2}) scale(${properties[id].scale})
              `}
            />
          );
        })}
      </g>
      <defs>
        <filter id="prefix__filter0_f" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={12} result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </S.Container>
  );
});
