import { Meta, StoryObj } from '@storybook/react';

import { Box, Button, Text } from '@/ui';

import { ComingSoon } from './ComingSoon';

const meta: Meta = {
  title: 'Library/Components/Comming Soon/Modal',
  component: ComingSoon.Modal,
};

export default meta;

type Story = StoryObj<ComingSoon.ModalProps>;

const DisabledComponent: React.FC = () => (
  <Box
    css={{ width: '200px', height: '200px', alignItems: 'center', gap: '10px' }}
  >
    <Text>Text Content</Text>
    <Button onClick={() => console.log('Can click me')}>Can click me</Button>
  </Box>
);

export const CTAModal: Story = {
  render: (args) => <ComingSoon.Modal {...args} />,
  args: {
    children: <DisabledComponent />,
    modalContent: (
      <>
        <ComingSoon.Modal.Description>
          Minting your frontend app hosted on Fleek as a Non-Fungible
          application is an experimental feature to further the decentralization
          of your site. Users of your app will be able to mint a print of the
          app and access it privately, while retaining updates you make to the
          frontend.
        </ComingSoon.Modal.Description>
        <ComingSoon.Modal.LearnMore href={'#'}>
          Non-Fungible Applications
        </ComingSoon.Modal.LearnMore>
      </>
    ),
  },
};
