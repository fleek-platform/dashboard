![](.repo/images/repo/banner.png?202411121019)

# ⚡️Fleek-Platform Client Dashboard ⚡️

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Tests](https://github.com/fleek-platform/cli/actions/workflows/test-runner.yml/badge.svg)

The Client's Dashboard the interface for managing all Fleek platform services, which includes site deployments, functions and storage.

## Overview

* [🎮 Environment Setup](#environment-setup)
* [🤖 Install](#install)
* [👷‍♀️Development](#development)
  - [Code format](#code-format)
  - [Changeset](#changeset)
  - [Test Runner](#test-runner)
* [📖 Docs](https://fleek.xyz/docs)
* [🙏 Contributing](#contributing)
  - [Branching strategy](#branching-strategy)
  - [Contributing](#conventional-commits)
* [⏱️ Changelog](./CHANGELOG.md)

## Requirements

- Nodejs as runtime
- NPM, Yarn to install the CLI as a client, or PNPM for development
- Familiarity with text-based user interfaces, command-line interface (CLI)
- Ports: UI (declared as NEXT_DEV_SERVER_PORT), Storybook (6006).

You'll also need to [setup](#environment-setup) the development environment.

## Environment Setup

For developers looking to contribute to the User Dashboard, [clone](https://github.com/fleek-platform/user-dashboard) the repository and follow the [contribution guide](#contributing).

Once cloned, you'll have to set up the local development environment, e.g. to have access to the source-code, iterate, run tests and much more.

For runtime we utilize [Nodejs](https://nodejs.org/en/download) and [PNPM](https://pnpm.io/installation) as the package manager.

Create a new file named .env in the root directory of your project. This file will store environment variables needed for local development.

```sh
touch .env.development
```

Open the .env.development file in a text editor and add the following:

```sh
NEXT_DEV_SERVER_PORT=3001
NEXT_PUBLIC_SDK__AUTHENTICATION_URL="https://graphql.service.fleek.xyz/graphql"
NEXT_PUBLIC_UI_FLEEK_REST_API_URL="https://api.fleek.xyz"
NEXT_PUBLIC_UI__DYNAMIC_ENVIRONMENT_ID="de23a5f0-aaa5-412e-8212-4fb056a3b30d"
NEXT_PUBLIC_UI__FEEDBACK_FISH_PROJECT_ID="ece374513b4e20"
NEXT_PUBLIC_UI__GTM_ID="GTM-5RC2N5H"
NEXT_PUBLIC_UI__LAUNCH_DARKLY_CLIENT_ID="65ba18a1430ffb0f5052c488"
NEXT_PUBLIC_UI__LOG_ROCKET_ID="0pggxb/prd-fjqao"
NEXT_PUBLIC_UI__POSTHOG_HOST="https://us.i.posthog.com"
NEXT_PUBLIC_UI__POSTHOG_KEY="phc_RJhBMFHIZxwd361q6q9LZxDvSAta0F56mXQo3An307y"
NEXT_PUBLIC_UI__SITE_SLUG_DOMAIN="on-fleek.app"
NEXT_PUBLIC_UI__STRIPE_PUBLIC_KEY="dummy"
NEXT_PUBLIC_UI__WEB3AUTH_CLIENT_ID="BKqrNFQNjQpRlWBgt7OA3S6P1MTP3ispI1lXR48cl6xW6bwFBNRH0Smuw83hp_cT_rUFo1OJvgQD0R8ZQD85ybQ"
NEXT_PUBLIC_UI__ZENDESK_PROXY_API="https://support-prod-eu-lon-1-01.flkservices.io"
NEXT_PUBLIC_ZENDESK_PROXY_HOSTNAME="support-prod-eu-lon-1-01.flkservices.io"
NEXT_PUBLIC_UI__UPLOAD_PROXY_API_URL="https://uploads.service.fleek.xyz",
NEXT_PUBLIC_UI__INTERNAL_IPFS_STORAGE_HOSTNAME="storage-ipfs.internal.fleek.xyz"
```

💡 The variables above point to our production environment, the same you interact with as an end-user. Internal development team have access to private environments. Because the environment most users have access to is production which mismatches the filename .env.development this can be replaced by `.env` if that's sounder to you.

![WARNING]
> Set the NODE_ENV variable to select the corresponding environment file (.env*), e.g. NODE_ENV="production" would read the file .env.production
> Keep it simple, name the file to the corresponding environment like .env.<NODE_ENV>
> The test runner ignores .env.local.*

Next, you can proceed to [install](#install) the project dependencies.

## Install

Start by installing the project dependencies:

```sh
pnpm i
```

## Development

Run a local development server by executing the command:

```sh
pnpm dev
```

> [!NOTE]  
> The project's built with Nextjs, that might be familiar to you.

It'll try to start the development server. Once ready, you should get a local address in the output.

For example, let's say it was bound to the default port 3000, you'd get:

```sh
- Local:        http://localhost:3000
```

> [!WARNING]
> Consider the configured port declared as NEXT_DEV_SERVER_PORT
> If the port 3000 is not free on execution a different port's utilized. Check the output for the correct address, please!

Open the address [http://localhost:3000](http://localhost:3000) in your favourite development browser.

### Code Format

Formatting and linting are facilitated by [BiomeJS](https://biomejs.dev). Configuration details can be found in:

```
biome.json
```

To format source code and apply changes directly in the file:

```sh
pnpm format
```

For checking source code formatting only:

```sh
pnpm format:check
```

To lint and apply changes directly in the file:

```sh
pnpm lint
```

For lint checks only:

```sh
pnpm lint:check
```

To both format and lint source code (with writes):

```sh
pnpm format:unsafe
```

### Changeset

Manage the versioning of changelog entries.

Declare an intent to release by executing the command and answering the wizard's questions:

```sh
pnpm changeset:add
```

### Test Runner

The project has two category of tests:

- End-to-End (e2e) built on playwright to facility testing the UI/UX interface. The network calls are mocked to facilitate rapid development and focus on the interface;
- Functional (Unit tests), which assert pure functions, e.g. data transformations, calculations, etc, a separate concern over the presentation;

Run all tests can be executed by:

```sh
pnpm run test
```

Alternatively, you can inspect the available tests in the package.json scripts section.

For example, you can launch end-to-end tests, on a chrome browser:

```sh
pnpm run test:ui
```

## Contributing

This section guides you through the process of contributing to our open-source project. From creating a feature branch to submitting a pull request, get started by:

1. Fork the project [here](https://github.com/fleekxyz/cli)
2. Create your feature branch using our [branching strategy](#branching-strategy), e.g. `git checkout -b feat/my-new-feature`
3. Run the tests: `pnpm test`
4. Commit your changes by following our [commit conventions](#conventional-commits), e.g. `git commit -m 'chore: 🤖 my contribution description'`
5. Push to the branch, e.g. `git push origin feat/my-new-feature`
6. Create new Pull Request following the corresponding template guidelines

### Branching strategy

The develop branch serves as the main integration branch for features, enhancements, and fixes. It is always in a deployable state and represents the latest development version of the application.

Feature branches are created from the develop branch and are used to develop new features or enhancements. They should be named according to the type of work being done and the scope of the feature and in accordance with conventional commits [here](#conventional-commits).

### Conventional commits

We prefer to commit our work following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0) conventions. Conventional Commits are a simple way to write commit messages that both people and computers can understand. It help us keep track fo changes in a consistent manner, making it easier to see what was added, changed, or fixed in each commit or update.

The commit messages are formatted as **[type]/[scope]**
The **type** is a short descriptor indicating the nature of the work (e.g., feat, fix, docs, style, refactor, test, chore). This follows the conventional commit types.

The **scope** is a more detailed description of the feature or fix. This could be the component or part of the codebase affected by the change.

Here's an example of different conventional commits messages that you should follow:

```txt
test: 💍 Adding missing tests
feat: 🎸 A new feature
fix: 🐛 A bug fix
chore: 🤖 Build process or auxiliary tool changes
docs: 📝 Documentation only changes
refactor: 💡 A code change that neither fixes a bug or adds a feature
style: 💄 Markup, white-space, formatting, missing semi-colons...
```
