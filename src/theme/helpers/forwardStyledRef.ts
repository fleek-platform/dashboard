import type { StyledComponent } from '@stitches/react/types/styled-component';
import { forwardRef } from 'react';
import type { ForwardRefRenderFunction } from 'react';

import { styled } from '../themes';

type ForwardStyledRefArgs<T, P = {}> = ForwardRefRenderFunction<T, P>;

const StitchesInternal = Symbol.for('sxs.internal');

/**
 * Forwards style properties with the ref of the given component.
 * Follows the code of stitches on https://github.com/stitchesjs/stitches/blob/canary/packages/react/src/features/styled.js#L40-L44
 */
export const forwardStyledRef = <T, P = {}>(
  Component: StyledComponent<any, any, any, any>,
  args: ForwardStyledRefArgs<T, P>,
) => {
  const Element = styled(forwardRef(args));

  return Object.assign(Element, {
    className: Component.className,
    displayName: Component.displayName,
    selector: Component.selector,
    toString: Component.toString,
    [StitchesInternal]: {
      ...(Component as any)[StitchesInternal],
      type: (Element as any)[StitchesInternal].type,
    },
    defaultProps: Component.defaultProps,
  });
};
