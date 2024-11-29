import type { CodeSnippetProps } from '@/components';
import type { FleekRootConfig, Site } from '@/types/Site';

type GetSelfManagedFileSnippetsArgs = Site;

export const getSelfManagedFileSnippets = (
  args?: GetSelfManagedFileSnippetsArgs,
): CodeSnippetProps[] =>
  args ? [getFleekFileSnippet(args), getGitHubActionSnippet()] : [];

// biome-ignore lint/suspicious/noExplicitAny: Allow any for flexible values
const parseObject = (obj: any) => JSON.stringify(obj, null, 2);

type GetFleekFileSnippetArgs = GetSelfManagedFileSnippetsArgs;

const getFleekFileSnippet = ({
  slug,
  distDirectory,
  buildCommand,
}: GetFleekFileSnippetArgs) => {
  const config: FleekRootConfig = {
    sites: [{ slug, distDir: distDirectory, buildCommand }],
  };

  return {
    title: 'fleek.config.json',
    code: parseObject(config),
  };
};

type GetGitHubActionSnippetArgs = GetSelfManagedFileSnippetsArgs;

// TODO: Why did this declared an empty object
// in the function signature?
const getGitHubActionSnippet = () => ({
  title: '.github/workflows/deploy-to-fleek.yml',
  code: `name: Deploy Site on Fleek.xyz

on:
  push:
    branches:
      - main

jobs:
  deploy-to-fleek:
    environment: production
    runs-on: ubuntu-latest

    env:
      FLEEK_TOKEN: \${{ secrets.FLEEK_TOKEN }}
      FLEEK_PROJECT_ID: \${{ secrets.FLEEK_PROJECT_ID }}
  
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 19.8.1

      - name: Install Fleek CLI globally
        run: npm i -g @fleek-platform/cli

      - name: Install dependencies
        run: npm install
        
      - name: Deploy site via Fleek CLI
        run: fleek sites deploy
`,
});
