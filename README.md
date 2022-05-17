# Reactive Analytics

[![TravisCI](https://travis-ci.com/AdaptiveConsulting/ReactiveAnalytics.svg?token=pzX2rmLCXdpByY5gqVfu&branch=develop)](https://travis-ci.com/github/AdaptiveConsulting/ReactiveAnalytics)

- [Reactive Analytics](#reactive-analytics)
  - [Overview](#overview)
  - [Requirements](#requirements)
  - [Getting started](#getting-started)
    - [Data connection](#data-connection)
  - [Access IEX Sandbox token](#access-iex-sandbox-token)
  - [Generate schema and typings](#generate-schema-and-typings)
    - [Server schema](#server-schema)
    - [Client typings](#client-typings)
  - [Core technologies used](#core-technologies-used)
  - [Useful developer add-ons](#useful-developer-add-ons)
    - [Visual Studio Code extensions from the marketplace](#visual-studio-code-extensions-from-the-marketplace)
    - [Google Chrome extensions](#google-chrome-extensions)

## Overview

Reactive Analytics is a monorepo that demonstrate how NodeJS, Apollo GraphQL, React, and Typescript can be used to develop robust data-driven web apps.

Both the server-side and client-side code use strong types which are used to generate the GraphQL schema. This allows developers to detect data and schema errors at design-time and compile-time.

## Requirements

- [NodeJS v10](https://nodejs.org/en/download/)
- [Typescript v3](https://www.npmjs.com/package/typescript)

## Getting started

After downloading or cloning repos open a terminal to the root folder and run `yarn install` to install dependencies.

        [ReactiveAnalytics] $ yarn install

Once the dependencies are install start the client and server using the start command.

        [ReactiveAnalytics] $ yarn start

This will open up a browser window to [http://localhost:3005](http://localhost:3005) for the client interface, and a GraphQL server on port 4000.

### Data connection

By default the server will connect to the [IEX trading system](https://iexcloud.io/) to retrieve realtime market information.

To connect to [IEX](https://iexcloud.io/) during development, copy `server/.env.example` to `server/.env` and set the value of `IEXCLOUD_PUBLIC_KEY` to a valid IEX sandbox token.

### OpenFin

To run ReactiveAnalytics in OpenFin (only supported on Windows), from the root directory, after running `yarn start` per above, in a separate terminal:

        ReactiveAnalytics> yarn openfin

Alternatively, if running the [ReactiveTrader](/AdaptiveConsulting/ReactiveTraderCloud) OpenFin Launcher, after running `yarn start` per above, click the ReactiveAnalytics icon in the Launcher.

Within the OpenFin window, you can right-click to reload and access devtools.

To kill all running OpenFin processes:

        ReactiveAnalytics> yarn openfin:kill

## Access IEX Sandbox token

- If you haven't already done so, create a free personal IEX account at https://iexcloud.io/cloud-login#/register/
- Login to your IEX console https://iexcloud.io/console/
- Make sure the `Sandbox testing` Toggle on the bottom left hand side of the screen is set to on
- Navigate to the `API Tokens` tab on the top left handside of the screen
- Copy the Publishable Token

Note, rate limiting with a free IEX account token can cause failed API calls

## Generate schema and typings

### Server schema

- Ensure the backend is running locally and on port 4000
- Run `npm run generate-server-schema` from root
- A [`graphql-schema.json`](server/graphql-schema.json) file will be generated in the `server` folder

### Client typings

- Run `npm run generate-client-typings` from root
- The relevant typings will be generated in their respective folders
- Global typings are stored in [`global-types`](client/src/containers/global-types)

## Core technologies used

- [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) - Multi-package manager to simplify the codebase in a single repository
- [Apollo GraphQL](https://www.apollographql.com/) - GraphQL framework to allow rapid and reliable development of client-server communication
- [React](https://reactjs.org/) - Interface framework
- [Styled Components](https://www.styled-components.com/) - Interface styling framework

## Useful developer add-ons

When working with the Reactive Analytics repo, there are many add-ons that make development and debugging painless. When using [Visual Studio Code](https://code.visualstudio.com/) and [Google Chrome](https://www.google.com/chrome/) as a developer environment consider trying out some of the following tools.

### Visual Studio Code extensions from the marketplace

- **Apollo GraphQL** - Rich editor support for GraphQL client and server development that seamlessly integrates with the Apollo platform
- **Debugger for Chrome** - Debug your JavaScript code in the Chrome browser, or any other target that supports the Chrome Debugger protocol.
- **ESLint** - Integrates ESLint JavaScript into VS Code.
- **JSON to TS** - Convert JSON object to typescript interfaces
- **markdownlint** - Markdown linting and style checking for Visual Studio Code
- **vscode-styled-components** - Syntax highlighting for styled-components

### Google Chrome extensions

- [**GraphQL Network**](https://github.com/Ghirro/graphql-network) - Chrome Devtool that provides a "network"-style tab for GraphQL requests to allow developers to debug more easily.
- [**Apollo Client Developer Tools**](https://github.com/apollographql/apollo-client-devtools) - GraphQL debugging tools for Apollo Client in the Chrome developer console.
- [**React Developer Tools**](https://github.com/facebook/react-devtools) - Adds React debugging tools to the Chrome Developer Tools.

### Deployment

Deployment is through [Travis CI](https://app.travis-ci.com/github/AdaptiveConsulting/ReactiveAnalytics)

Merging to master will build and deploy to dev: https://dev-reactive-analytics.adaptivecluster.com/

Manually trigger a build with custom config to deploy to uat/prod.

```
env:
  global:
    ENV: uat
    SKIP_BUILD: true
```
