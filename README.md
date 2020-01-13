# Reactive Analytics

[![CircleCI](https://circleci.com/gh/AdaptiveConsulting/ReactiveAnalytics.svg?style=svg&circle-token=8dfbb24676c7e9d51bc4668cacec12d31104b0f6)](https://circleci.com/gh/AdaptiveConsulting/ReactiveAnalytics)

- [Overview](#overview)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Core technologies used](#core-technologies-used)
- [Useful tips and tricks](#useful-tips-and-tricks)

## Overview

Reactive Analytics is a monorepo, powered by [Lerna](https://github.com/lerna/lerna), to demonstrate how NodeJS, Apollo GraphQL, React, and Typescript can be used to develop robust data-driven web apps.

Both the server-side and client-side code use strong types which are used to generate the GraphQL schema. This allows developers to detect data and schema errors at design-time and compile-time.

## Requirements

- [NodeJS v10](https://nodejs.org/en/download/)
- [Typescript v3](https://www.npmjs.com/package/typescript)
- [Yarn](https://yarnpkg.com/en/docs/install)

## Getting started

After downloading or cloning repos open a terminal to the root folder and run `yarn` to install dependencies.

        [ReactiveAnalytics] $ yarn install

Once the dependencies are install start the client and server using the start command.

        [ReactiveAnalytics] $ yarn start

This will open up a browser window to [http://localhost:3000](http://localhost:3000) for the client interface, and a GraphQL server on port 4000.

### Data connection

By default the server will connect to the [IEX trading system](https://iexcloud.io/) to retrieve realtime market information.

To connect to [IEX](https://iexcloud.io/) during development, copy `server/.env.example` to `server/.env` and set the value of `IEXCLOUD_PUBLIC_KEY` to a valid IEX key.

To simulate this in an offline environment set the `INSIGHT_OFFLINE=true` before starting the server.

```cmd
REM Windows Command Prompt
set INSIGHTS_OFFLINE=true
```

```ps
#Windows Powershell
$env:INSIGHTS_OFFLINE="true"
```

```sh
#!/bin/bash
export INSIGHTS_OFFLINE=true
```

By default, the server is preloaded with data for Apple(AAPL), Google(GOOG), and Microsoft(MSFT). The data can be updated from the [IEX trading system](https://iexcloud.io/) by running an npm script from the `PROJECT_ROOT/server` directory.

```console
cd adaptive-insights/server && yarn generate-mock-data
```

An optional parameter can be used to fetch data for more companies by passing in a space delineated list of symbols.

```console
yarn generate-mock-data bac ge amd
```

## Core technologies used

- [Lerna](https://github.com/lerna/lerna) - Multi-package manager to simplify the codebase in a single repository
- [Apollo GraphQL](https://www.apollographql.com/) - GraphQL framework to allow rapid and reliable development of client-server communication
- [Express](https://expressjs.com/) - Web server for hosting the GraphQL HTTP endpoints
- [subscriptions-transport-ws](https://github.com/apollographql/subscriptions-transport-ws) - WebSocket communication for GraphQL
- [TypeGraphQL](https://typegraphql.ml/) - Generate GraphQL schemas from TypeScript classes
- [React](https://reactjs.org/) - Interface framework
- [Styled-components](https://www.styled-components.com/) - Interface styling framework

## Useful developer add-ons

When working with the Adaptive Insight repo, there are many add-ons that make development and debugging painless. When using [Visual Studio Code](https://code.visualstudio.com/) and [Google Chrome](https://www.google.com/chrome/) as a developer environment consider trying out some of the following tools.

### Visual Studio Code extensions from the marketplace

- **Apollo GraphQL** - Rich editor support for GraphQL client and server development that seamlessly integrates with the Apollo platform
- **Debugger for Chrome** - Debug your JavaScript code in the Chrome browser, or any other target that supports the Chrome Debugger protocol.
- **ESLine** - Integrates ESLint JavaScript into VS Code.
- **jshint** - Integrates JSHint into VS Code. JSHint is a linter for JavaScript
- **JSON to TS** - Convert JSON object to typescript interfaces
- **markdownlint** - Markdown linting and style checking for Visual Studio Code
- **vscode-styled-components** - Syntax highlighting for styled-components

### Google Chrome extensions

- [**GraphQL Network**](https://github.com/Ghirro/graphql-network) - Chrome Devtool that provides a "network"-style tab for GraphQL requests to allow developers to debug more easily.
- [**Apollo Client Developer Tools**](https://github.com/apollographql/apollo-client-devtools) - GraphQL debugging tools for Apollo Client in the Chrome developer console.
- [**React Developer Tools**](https://github.com/facebook/react-devtools) - Adds React debugging tools to the Chrome Developer Tools.
