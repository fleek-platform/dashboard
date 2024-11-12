import * as ScrollArea from '@radix-ui/react-scroll-area';

import { styled } from '@/theme';

const Viewport = styled(ScrollArea.Viewport, {
  width: '$full',
  height: '$full',
  borderRadius: 'inherit',
});

const Root = styled(ScrollArea.Root);

const Scrollbar = styled(ScrollArea.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: '$spacing-1 calc($spacing-1 * 0.5)',
  margin: 'calc($spacing-1 * 0.5)',
  borderRadius: '$full',
  background: '$button-slate-secondary',
  transition: 'background 160ms ease-out',
  '&:hover': { background: '$button-slate-secondary-hover' },
  '&[data-orientation="vertical"]': {
    width: 'calc($space$spacing-2-5 + $space$spacing-1 * 0.5)',
  },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: 'calc($space$spacing-2-5 + $space$spacing-1 * 0.5)',
  },
});

const Thumb = styled(ScrollArea.Thumb, {
  flex: 1,
  backgroundColor: '$button-slate-primary',
  borderRadius: '$full',
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '$full',
    height: '$full',
    minWidth: '$space$spacing-5',
    minHeight: '$space$spacing-5',
  },
});

const Corner = styled(ScrollArea.Corner);

export const ScrollableStyles = {
  Root,
  Viewport,
  Scrollbar,
  Thumb,
  Corner,
};
