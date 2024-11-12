import { Meta, StoryObj } from '@storybook/react';

import { SelfManagedSetup, SelfManagedSetupProps } from './SelfManagedSetup';

const meta: Meta = {
  title: 'Library/Fragments/Site/Self Managed/File Setup',
  component: SelfManagedSetup,
};

export default meta;

export const Default: StoryObj<SelfManagedSetupProps> = {
  args: {
    title: 'Copy Config Files',
    description: 'In order to deploy your site, you will need to copy the below code snippets and add them to your project.',
    projectId: 'mocked-project-id',
    codeSnippets: [
      {
        title: 'cache-advance.config.js',
        code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  trailingSlash: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          fallback: {
            ...config.resolve.fallback,
            fs: false,
            tls: false,
            net: false,
          },
        },
      };
    }
    return config;
  },
};
module.exports = nextConfig;
      `,
      },
    ],
  },
};
