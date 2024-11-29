![](.repo/images/repo/banner.png?202411121019)

# ⚡️Fleek-Platform Dashboard ⚡️

Here's a change

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![💍 Tester runner](https://github.com/fleek-platform/dashboard/actions/workflows/test-runner.yml/badge.svg)](https://github.com/fleek-platform/dashboard/actions/workflows/test-runner.yml)
[![🔧 Build (dry-run)](https://github.com/fleek-platform/dashboard/actions/workflows/build-dry-run.yml/badge.svg)](https://github.com/fleek-platform/dashboard/actions/workflows/build-dry-run.yml)
[![⚡️ Deploy Storybook (Staging)](https://github.com/fleek-platform/dashboard/actions/workflows/fleek-deploy-storybook.yml/badge.svg)](https://github.com/fleek-platform/dashboard/actions/workflows/fleek-deploy-storybook.yml)
[![⚡️ Deploy Dashboard (Staging)](https://github.com/fleek-platform/dashboard/actions/workflows/fleek-deploy-staging.yml/badge.svg)](https://github.com/fleek-platform/dashboard/actions/workflows/fleek-deploy-staging.yml)
[![⚡️ Deploy Dashboard (Production)](https://github.com/fleek-platform/dashboard/actions/workflows/fleek-deploy-production.yml/badge.svg)](https://github.com/fleek-platform/dashboard/actions/workflows/fleek-deploy-production.yml)

The Dashboard is the interface for managing all Fleek platform services, which includes site deployments, functions and storage.

## Overview

* [🎮 Environment Setup](#environment-setup)
* [🤖 Install](#install)
* [👷‍♀️Development](#development)
  - [Code format](#code-format)
  - [Changeset](#changeset)
  - [Regression Suite](#regression-suite)
  - [Branch Deployment Matrix](#branch-deployment-matrix)
* [💍 Tests](#Tests)
  - [End-to-End](#end-to-end-e2e)
  - [Unit tests](#unit-tests)
  - [Component Functional Tests](#component-functional-tests)
  - [CI/CD Runner](#cicd-runner)
* [🛠️Generators](#Generators)
  - [Sitemap](#sitemapxml)
* [🖍️Component Library](#component-library)
  - [Storybook](#storybook)
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

For developers looking to contribute to the User Dashboard, [clone](https://github.com/fleek-platform/dashboard) the repository and follow the [contribution guide](#contributing).

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

> [!WARNING]
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

### Regression Suite

Regression in software testing refers to when a previously working feature stops working after new changes are made. When contributing make sure that changes are healthy and cause issues.

Learn how to run and write tests [here](#tests).

### Branch Deployment Matrix

This table shows the corresponding deployment URLs for each branch. Note that the availability and state of each URL depends on successful CI/CD build and deployment.

⚠️ The URLs below may be temporarily unavailable during deployments or if a build fails.

```
Branch              |  URL
----------------------------------
develop (latest)    |  https://fleek-dashboard-staging.on-fleek.app
develop (storybook) |  https://fleek-dashboard-storybook.on-fleek.app
main                |  https://fleek-dashboard-production.on-fleek.app
```

## Tests

The project has two category of tests:

- End-to-End (e2e) built on playwright to facility testing the UI/UX interface. The network calls are mocked to facilitate rapid development and focus on the interface;
- Unit tests, which assert pure functions, e.g. data transformations, calculations, etc, a separate concern over the presentation;

You can run all tests by executing the command:

```sh
pnpm run test
```

Alternatively, you can inspect the available tests in the package.json scripts section.

For example, you can launch end-to-end tests, on a chrome browser:

```sh
pnpm run test:ui
```

Run the E2E test suite

```sh
pnpm run test:e2e
```

Run the unit tests

```sh
pnpm run test:unit
```

Run the component function tests

```sh
pnpm run test:component
```

### Good practices

Here are some recommendations when writing tests.

#### End-to-end (E2E)

- Block any unnecessary network requests, e.g., third-party services, such as analytics, etc
- Use headless mode for fast feedback
- Prepare and clean data or state for each test
- Prioritize user flows, e.g. prefer role selection instead of specifying implementation details such as ID, Class, or element names (DOM locators)
- Prefer tools provided by Playwright
- Tests should be independent and isolated, e.g. avoid sharing state across test cases depending on others
- Use the mode `Browser/UI` to see the tests in actions to see how the application render, inspect network logs, etc
- Tests should have the ability to run concurrently, e.g., you'd rather have 5 workers computing instead of waiting sequentially to save you time
- Mock API calls providing the expected data structure in the response, to prioritize testing the interface, e.g., you're testing that the user-interface corresponds to the user-journey goals NOT the service-side availability
- Handle exceptions gracefully, e.g., test cases where the API response fails, etc
- Use the HAR file from your browser session
- Avoid writing tests for static elements that's useless to the end-user
- Avoid placing timeouts in the test

#### Unit tests

Unit tests should be small tests that check individual parts of code for correctness. Ideally, functions tested with unit tests should be:

- Pure, meaning their output depends only on their inputs, with no side effects. This makes them predictable and easier to test
- Each test should run independently, without relying on other tests
- Test One Thing Per Test: Focus each test on verifying a single behavior or functionality
- Replace external dependencies (e.g., databases) with mock objects
- Write simple, concise tests for easier debugging and maintenance, e.g. prefere storytelling


#### Component Functional tests

The terminology "Component Function tests" is used to describe unit tests for components. You can refer to it as unit-tests, but when communicating component functionality, it's our preference to refer to it as "Component Functional tests". It avoids confusion.

> [!WARNING]
> Do not confuse it with [Component testing](https://storybook.js.org/blog/component-testing/) as promoted by Storybook's team. The Component Function tests at Fleek's Frontend has a very particular meaning in the context's they're used and serves to communicate efficiently.

Ideally, components should be tested in isolation (unit). Events or inputs should reproduce expected behaviour and output. Here's a break-down:

- Focus on Component Behavior
- Tests must be user-oriented, e.g. validate a component feature from a user's perspective
- Ensure a component work as intended before integration with other components or the application
- Avoid testing internal implementation details like state or private functions
- Identify and prioritize testing the most common and critical component behaviors
- Ensure all major user interactions and outcomes are tested
- Props should be as realistic as possible to reflect how the component will be used in production
- Test interactions (clicks, typing, form submissions) as closely as possible to real user actions
- Simulate user actions or lifecycle changes
- Ensure visual changes like showing/hiding elements are validated
- Test only one behavior or aspect per test case, e.g. avoid long tests that cover multiple, unrelated scenarios
- Do not rely on snapshots for dynamic or interactive components
- Ensure tests are fast enough for regular execution
- Update tests when refactoring or introducing new features

#### CI/CD Runner

On CI/CD runners, low specs cause inconsistent runs to mitigate any inconsistency playwright's team recommends running in a single worker [CI/Workers](https:playwright.dev/docs/ciworkers).

Note that launching a [large](https://docs.github.com/en/actions/using-github-hosted-runners/using-larger-runners/about-larger-runners), e.g. `macos-latest-xlarge` runner is more efficient but increases cost dramatically.

## Generators

### Sitemap.xml

Generate a sitemap by executing the command:

```sh
pnpm run generate:sitemap
```

## Component Library

The component library provides a collection of ready-to-use components. We use [Storybook](#storybook) to showcase and document our components.

### Storybook

Start the storybook development server:

```sh
pnpm storybook
```

To build a static version:

```sh
pnpm storybook:build
```

When committing to develop branch, a new build is deployed to [https://fleek-dashboard-storybook.on-app.xyz](https://fleek-dashboard-storybook.on-app.xyz).

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
