import type { Meta, StoryFn } from '@storybook/react';

import { NavbarProject } from './NavbarProject';
import { NavbarUnauthenticated } from './NavbarUnauthenticated';

const meta: Meta = {
  title: 'Library/Fragments/Navbar',
};

export default meta;

type Story = StoryFn;

export const Unauthenticated: Story = () => {
  return <NavbarUnauthenticated />;
};

export const Project: Story = () => {
  return <NavbarProject />;
};
