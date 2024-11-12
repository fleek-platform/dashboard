import { Meta, StoryFn } from '@storybook/react';

import { HandleLogoUploadProps } from '@/types/Logo';
import { Button } from '@/ui';

import { LearnMoreMessage } from '../LearnMoreMessage/LearnMoreMessage';
import { LogoUpload } from '../LogoUpload/LogoUpload';
import { SettingsBox } from './SettingsBox';

const meta: Meta = {
  title: 'Library/Components/Settings Box',
};

export default meta;

type Story = StoryFn<SettingsBox.ContainerProps>;

export const Default: Story = (args) => {
  return (
    <SettingsBox.Container {...args}>
      <SettingsBox.Title>Title</SettingsBox.Title>
      <SettingsBox.Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua
      </SettingsBox.Text>

      <SettingsBox.ActionRow>
        <LearnMoreMessage href="https://fleek.xyz">Learn More</LearnMoreMessage>
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};

Default.args = {
  css: {
    maxWidth: '41.625rem',
  },
};

export const WithActionButton: Story = (args) => {
  return (
    <SettingsBox.Container {...args}>
      <SettingsBox.Title>Title</SettingsBox.Title>
      <SettingsBox.Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua
      </SettingsBox.Text>

      <SettingsBox.ActionRow>
        <LearnMoreMessage href="https://fleek.xyz">Learn More</LearnMoreMessage>
        <Button>Action</Button>
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};

WithActionButton.args = {
  css: {
    maxWidth: '41.625rem',
  },
};

export const WitLogoUpload: Story = (args) => {
  const handleLogoUpload = async ({ image }: HandleLogoUploadProps) => {
    console.log(image);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  };

  return (
    <SettingsBox.Container {...args}>
      <SettingsBox.ActionRow>
        <SettingsBox.Column>
          <SettingsBox.Title>Title</SettingsBox.Title>
          <SettingsBox.Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </SettingsBox.Text>
        </SettingsBox.Column>

        <LogoUpload onSubmit={handleLogoUpload} />
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};

WitLogoUpload.args = {
  css: {
    maxWidth: '41.625rem',
  },
};

export const WithInputLoading: Story = (args) => {
  return (
    <SettingsBox.Container {...args}>
      <SettingsBox.Title>Title</SettingsBox.Title>
      <SettingsBox.Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua
      </SettingsBox.Text>

      <SettingsBox.Skeleton variant="input" />

      <SettingsBox.ActionRow>
        <SettingsBox.Skeleton variant="message" />
        <SettingsBox.Skeleton variant="button" />
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};

WithInputLoading.args = {
  css: {
    maxWidth: '41.625rem',
  },
};

export const WithLogoLoading: Story = (args) => {
  return (
    <SettingsBox.Container {...args}>
      <SettingsBox.ActionRow>
        <SettingsBox.Column>
          <SettingsBox.Title>Title</SettingsBox.Title>
          <SettingsBox.Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </SettingsBox.Text>
        </SettingsBox.Column>

        <SettingsBox.Skeleton variant="logo" />
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};

WithLogoLoading.args = {
  css: {
    maxWidth: '41.625rem',
  },
};
